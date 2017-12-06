package controllers

import javax.inject._

import de.htwg.se.learn_duel.controller.impl.Controller
import de.htwg.se.learn_duel.model.impl.Game
import play.api.mvc._

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

    val gameState = Game()
    val serverCtrl = Controller.create(gameState)

    /**
      * Create an Action to render an HTML page with a welcome message.
      * The configuration in the `routes` file means that this method
      * will be called when the application receives a `GET` request with
      * a path of `/`.
      */
    def index = Action {
        Ok(views.html.index(serverCtrl.nextPlayerName))
    }

    def help = Action {
        Ok(views.html.help())
    }
}
