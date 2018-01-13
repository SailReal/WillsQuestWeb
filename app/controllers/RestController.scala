package controllers

import javax.inject._

import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import de.htwg.se.learn_duel.controller.{Controller, ControllerException}
import play.api.libs.json.{JsObject, Json}
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.Future

@Singleton
class RestController @Inject()(
    cc: ControllerComponents,
    silhouette: Silhouette[DefaultEnv],
    serverCtrl: Controller,
    homectrl: HomeController
)(
    implicit assets: AssetsFinder
) extends AbstractController(cc) {
    def onAddPlayer(name: String): Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            execute(serverCtrl.onAddPlayer(Some(name)))
            Future.successful(NoContent)
    }

    def onRemovePlayer(name: String): Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            execute(serverCtrl.onRemovePlayer(name))
            Future.successful(NoContent)
    }

    def getMaxPlayerCount: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            try {
                Future.successful(Ok(serverCtrl.maxPlayerCount.toString))
            } catch {
                case e: ControllerException =>
                    homectrl.sendToAllActors(createErrorJson(e.message))
                    Future.successful(NoContent)
            }
    }

    def onStartGame: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            execute(serverCtrl.onStartGame)
            Future.successful(NoContent)
    }

    def onAnswerChosen(number: Int): Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            execute(serverCtrl.onAnswerChosen(number))
            Future.successful(NoContent)
    }

    def onExit: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            execute(serverCtrl.onClose)
            System.exit(0) // FIXME exit gracefully
            // maybe call signout and on signon -> create new instance of controller
            Future.successful(NoContent)
    }

    def onHelp: Action[AnyContent] = silhouette.UserAwareAction.async {
        execute(serverCtrl.onHelp)
        Future.successful(NoContent)
    }

    def getUsername: Action[AnyContent] = silhouette.SecuredAction {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            Ok(request.identity.username.getOrElse("<unknown>"))
    }

    def onReset: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            execute(serverCtrl.reset)
            Future.successful(NoContent)
    }

    def execute(fn: => Unit): Unit = {
        try {
            fn
        } catch {
            case e: ControllerException =>
            homectrl.sendToAllActors(createErrorJson(e.message))
        }
    }

    def createErrorJson(message: String): JsObject = {
        Json.obj(
            "action" -> "ERROR",
            "errorMessage" -> message)
    }
}
