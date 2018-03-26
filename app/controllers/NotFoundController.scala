package controllers

import javax.inject._

import com.mohiva.play.silhouette.api.Silhouette
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.Future

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class NotFoundController @Inject()(
    cc: ControllerComponents,
    silhouette: Silhouette[DefaultEnv]
)(
    implicit
    assets: AssetsFinder
) extends AbstractController(cc) {

  /**
    * Create an Action to render an HTML page with a 404 message.
    */
  def index(currentPath: String): Action[AnyContent] =
    silhouette.UnsecuredAction.async { implicit request: RequestHeader =>
      println(s"User tried to access unavailable route '${currentPath}'")
      Future.successful(NotFound(views.html.notFound(request)))
    }
}
