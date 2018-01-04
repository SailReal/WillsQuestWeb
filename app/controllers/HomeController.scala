package controllers

import java.util.concurrent.CompletionStage
import javax.inject._

import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.api.{LogoutEvent, Silhouette}
import de.htwg.se.learn_duel.controller.Controller
import de.htwg.se.learn_duel.model.Question
import de.htwg.se.learn_duel.model.impl.Game
import de.htwg.se.learn_duel.{Observer, UpdateData}
import play.api.libs.json.{JsValue, Json}
import play.api.libs.ws.WSClient
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.{ExecutionContext, Future}
import scala.io.Source

@Singleton
class HomeController @Inject()(
  cc: ControllerComponents,
  silhouette: Silhouette[DefaultEnv],
  ws: WSClient
)(
  implicit
  assets: AssetsFinder
) extends AbstractController(cc) with Observer {

    val jsonString:String = Source.fromResource("questions.json").getLines.mkString("\n")
    val json:JsValue = Json.parse(jsonString)
    val questions:List[Question] = Json.fromJson[List[Question]](json).getOrElse(List())

    val gameState = Game(questions = questions)
    val serverCtrl:Controller = Controller.create(gameState)

    serverCtrl.addObserver(this)

    def index:Action[AnyContent] = silhouette.SecuredAction.async {
      implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        Future.successful(Ok(views.html.index()))
    }

    def addPlayer(name: String):Action[AnyContent] = silhouette.SecuredAction.async {
      implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        serverCtrl.addPlayer(Some(name))
        Future.successful(NoContent)
    }

    def removePlayer(name: String):Action[AnyContent] = silhouette.SecuredAction.async {
      implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        serverCtrl.removePlayer(name)
        Future.successful(NoContent)
    }

    def maxPlayerCount():Action[AnyContent] = silhouette.SecuredAction.async {
      implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        Future.successful(Ok(""+serverCtrl.maxPlayerCount))
    }

    def game:Action[AnyContent] = silhouette.SecuredAction.async {
      implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        serverCtrl.onStartGame
        Future.successful(Ok(views.html.game(request.identity)))
    }

    def answerChosen(number: Int):Action[AnyContent] = silhouette.SecuredAction.async {
      implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        serverCtrl.answerChosen(number)
        Future.successful(NoContent)
    }

    def exit:Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        serverCtrl.onClose
        System.exit(0) // FIXME gracefully exit
        Future.successful(NoContent)
    }

    def help:Action[AnyContent] = silhouette.UserAwareAction.async {
        serverCtrl.onHelp
        Future.successful(NoContent)
    }

  def showHelp(message:String):Action[AnyContent] = silhouette.UserAwareAction.async {
    Future.successful(Ok(views.html.help(message)))
  }


  def signOut:Action[AnyContent] = silhouette.SecuredAction.async {
      implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        val result = Redirect(routes.HomeController.index())
        silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
        silhouette.env.authenticatorService.discard(request.authenticator, result)
    }

    override def update(updateParam: UpdateData): Unit = {
    }
}
