package controllers

import javax.inject._

import com.mohiva.play.silhouette.api.{LogoutEvent, Silhouette}
import com.mohiva.play.silhouette.api.actions.SecuredRequest
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
) extends AbstractController(cc) {

    val gameState = Game()
    val serverCtrl = Controller.create(gameState)

    /**
      * Create an Action to render an HTML page with a welcome message.
      * The configuration in the `routes` file means that this method
      * will be called when the application receives a `GET` request with
      * a path of `/`.
      */
    def index = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
        Future.successful(Ok(views.html.index(serverCtrl.nextPlayerName, request.identity)))
    }

    def help = silhouette.UserAwareAction.async {
        Future.successful(Ok(views.html.help()))
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
}
