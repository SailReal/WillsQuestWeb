import de.htwg.se.learn_duel.controller.Controller

class MockedServerController extends Controller {
  override def nextPlayerName(): Option[String] = {
    Some("NextPlayer")
  }

  override def getPlayerNames: List[String] = {
    List("Player1", "Player2")
  }

  override def maxPlayerCount(): Int = {
    2
  }

  override def requestUpdate(): Unit = {}

  override def reset(): Unit = {}

  override def onAddPlayer(name: Option[String]): Unit = {}

  override def onRemovePlayer(name: String): Unit = {}

  override def onPlayerActionUndo(): Unit = {}

  override def onPlayerActionRedo(): Unit = {}

  override def onHelp(): Unit = {}

  override def onStartGame(): Unit = {}

  override def onClose(): Unit = {}

  override def onAnswerChosen(input: Int): Unit = {}
}

object MockedServerController {
  def create(): MockedServerController = {
    new MockedServerController
  }
}
