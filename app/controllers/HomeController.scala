package controllers

import javax.inject._

import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.api.{LogoutEvent, Silhouette}
import de.htwg.se.learn_duel.controller.Controller
import de.htwg.se.learn_duel.{Observer, UpdateAction, UpdateData}
import play.api.libs.json.{JsObject, Json}
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.Future

@Singleton
class HomeController @Inject()(
    cc: ControllerComponents,
    silhouette: Silhouette[DefaultEnv],
    serverCtrl: Controller
)(
    implicit assets: AssetsFinder
) extends AbstractController(cc) with Observer {
    var actors: List[WebsocketActor] = List()
    serverCtrl.addObserver(this)

    def index: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            Future.successful(Ok(views.html.index(request)))
    }

    def signOut: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            val result = Redirect(routes.HomeController.index())
            silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
            silhouette.env.authenticatorService.discard(request.authenticator, result)
    }

    def registerWebSocketActor(actor: WebsocketActor): Unit = {
        actors = actors :+ actor
        serverCtrl.requestUpdate
    }

    def deregisterWebSocketActor(actor: WebsocketActor): Unit = {
        actors = actors diff List(actor)
    }

    override def update(updateParam: UpdateData): Unit = {
        updateParam.getAction() match {
            case UpdateAction.BEGIN =>
                val jsonWithAction = Json.toJson(updateParam.getState()).as[JsObject] + ("action" -> Json.toJson("BEGIN"))
                sendToAllActors(jsonWithAction)
            case UpdateAction.CLOSE_APPLICATION => // sign out? or shut down server for now?
            case UpdateAction.SHOW_HELP =>
                val jsonWithAction = Json.toJson(updateParam.getState()).as[JsObject] + ("action" -> Json.toJson("SHOW_HELP"))
                sendToAllActors(jsonWithAction)
            case UpdateAction.PLAYER_UPDATE =>
                val jsonWithAction =  Json.toJson(updateParam.getState()).as[JsObject] + ("action" -> Json.toJson("PLAYER_UPDATE"))
                sendToAllActors(jsonWithAction)
            case UpdateAction.SHOW_GAME =>
                val jsonWithAction =  Json.toJson(updateParam.getState()).as[JsObject] + ("action" -> Json.toJson("SHOW_GAME"))
                sendToAllActors(jsonWithAction)
            case UpdateAction.TIMER_UPDATE =>
                val jsonWithAction = Json.toJson(updateParam.getState()).as[JsObject] + ("action" -> Json.toJson("TIMER_UPDATE"))
                sendToAllActors(jsonWithAction)
            case UpdateAction.SHOW_RESULT =>
                val jsonWithAction = Json.toJson(updateParam.getState()).as[JsObject] + ("action" -> Json.toJson("SHOW_RESULT"))
                sendToAllActors(jsonWithAction)
            case _ =>
        }
    }

    def sendToAllActors(json: JsObject): Unit = {
        actors.foreach(actor => {
            actor.send(Json.stringify(json))
        })
    }
}
