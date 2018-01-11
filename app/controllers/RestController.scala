package controllers

import javax.inject._

import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.api.Silhouette
import de.htwg.se.learn_duel.controller.{Controller, ControllerException}
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.Future

@Singleton
class RestController @Inject()(
    cc: ControllerComponents,
    silhouette: Silhouette[DefaultEnv],
    serverCtrl: Controller
)(
    implicit assets: AssetsFinder
) extends AbstractController(cc) {
    def onAddPlayer(name: String): Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            // FIXME catch other routes too and maybe responed with a better error so page can show it
            try {
                serverCtrl.onAddPlayer(Some(name))
                Future.successful(NoContent)
            } catch {
                // FIXME #13 this just generates a internal play error, find a way to send this to the website
                case e: ControllerException => Future.failed(e)
            }
    }

    def onRemovePlayer(name: String): Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            serverCtrl.onRemovePlayer(name)
            Future.successful(NoContent)
    }

    def getMaxPlayerCount: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            Future.successful(Ok(serverCtrl.maxPlayerCount.toString))
    }

    def onStartGame: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            serverCtrl.onStartGame
            Future.successful(NoContent)
    }

    def onAnswerChosen(number: Int): Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            serverCtrl.onAnswerChosen(number)
            Future.successful(NoContent)
    }

    def onExit: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            serverCtrl.onClose
            System.exit(0) // FIXME exit gracefully
            // maybe call signout and on signon -> create new instance of controller
            Future.successful(NoContent)
    }

    def onHelp: Action[AnyContent] = silhouette.UserAwareAction.async {
        serverCtrl.onHelp
        Future.successful(NoContent)
    }

    def getUsername: Action[AnyContent] = silhouette.SecuredAction {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            Ok(request.identity.username.getOrElse("<unknown>"))
    }

    def onReset: Action[AnyContent] = silhouette.SecuredAction.async {
        implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
            serverCtrl.reset()
            Future.successful(NoContent)
    }
}
