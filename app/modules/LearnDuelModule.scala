package modules

import com.google.inject.AbstractModule
import de.htwg.se.learn_duel.controller.Controller
import de.htwg.se.learn_duel.model.Question
import de.htwg.se.learn_duel.model.impl.Game
import net.codingwell.scalaguice.ScalaModule
import play.api.libs.json.{JsValue, Json}

import scala.io.Source

class LearnDuelModule extends ScalaModule {
    val jsonString: String = Source.fromResource("questions.json").getLines.mkString("\n")
    val json: JsValue = Json.parse(jsonString)
    val questions: List[Question] = Json.fromJson[List[Question]](json).getOrElse(List())

    val gameState = Game(questions = questions)
    val serverCtrl: Controller = Controller.create(gameState)

    /**
      * Configures the module.
      */
    def configure(): Unit = {
        bind(classOf[Controller]).toInstance(serverCtrl)
    }
}
