package controllers

import javax.inject._
import play.api.mvc._

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class NotFoundController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  /**
    * Create an Action to render an HTML page with a 404 message.
    */
  def index(currentPath: String) = Action {
    NotFound(views.html.notFound(currentPath))
  }
}
