package controllers

import javax.inject._

import com.mohiva.play.silhouette.api.{LogoutEvent, Silhouette}
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import de.htwg.se.learn_duel.Observer
import de.htwg.se.learn_duel.controller.impl.Controller
import de.htwg.se.learn_duel.model.impl.Game
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.Future

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject()(
  cc: ControllerComponents,
  silhouette: Silhouette[DefaultEnv]
)(
  implicit
  assets: AssetsFinder
) extends AbstractController(cc) with Observer {

    val gameState = Game()
    val serverCtrl = Controller.create(gameState)

    serverCtrl.addObserver(this)

    /**
      * Create an Action to render an HTML page with a welcome message.
      * The configuration in the `routes` file means that this method
      * will be called when the application receives a `GET` request with
      * a path of `/`.
      */
    def index = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        Future.successful(Ok(views.html.index(serverCtrl.nextPlayerName, request.identity)))
    }

    def addPlayer(name:String) = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        serverCtrl.addPlayer(Some(name))
        Future.successful(NoContent)
    }

    def removePlayer(name:String) = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        serverCtrl.removePlayer(name)
        Future.successful(NoContent)
    }

    def solve(answer: String) = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        //serverCtrl.solve(answer)
        Future.successful(NoContent) // TODO think about it next question or finished or don't know
    }

    def game = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        //serverCtrl.startGame()
        Future.successful(Ok(views.html.game(request.identity)))
    }

    def exit = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        //serverCtrl.close();
        System.exit(0) // FIXME gracefully exit
        Future.successful(NoContent)
    }

    def help(message: String) = silhouette.UserAwareAction.async {
        Future.successful(Ok(views.html.help(message)))
    }

    /**
      * Handles the Sign Out action.
      *
      * @return The result to display.
      */
    def signOut = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        val result = Redirect(routes.HomeController.index())
        silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
        silhouette.env.authenticatorService.discard(request.authenticator, result)
    }

    /*override def update(updateParam: UpdateData): Unit = {
        updateParam.getAction() match {
            case UpdateAction.CLOSE_APPLICATION => exit
            case UpdateAction.SHOW_HELP => {
                val helpText = updateParam.getState() match {
                    case Some(gameState) => gameState.helpText
                    case None => "No help available."
                }

                help(helpText)
            }
            case UpdateAction.PLAYER_UPDATE => displayMenu
            case UpdateAction.START_GAME => {
                updateParam.getState() match {
                    case Some(gameState) => {
                        displayGame(gameState.currentQuestion.get, 0)
                    }
                    case _ =>
                }
            }
            case _ =>
        }
    }*/

    override def update: Unit = {}
}
