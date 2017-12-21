package controllers

import javax.inject._

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.stream.Materializer
import play.api.libs.streams.ActorFlow
import play.api.mvc._

@Singleton
class WebsocketController @Inject()(cc: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {
  def socket() = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      WebsocketActor.props(out)
    }
  }
}

object WebsocketActor {
  def props(out: ActorRef) = Props(new WebsocketActor(out))
}

class WebsocketActor(out: ActorRef) extends Actor {
  def receive = {
    case message: String =>
      out ! "Halle welt receive :)"
  }

  def send(json: String) = {
    out ! "Halle welt send :)"
  }
}