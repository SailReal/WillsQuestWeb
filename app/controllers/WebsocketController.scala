package controllers

import javax.inject._

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.stream.Materializer
import play.api.libs.streams.ActorFlow
import play.api.mvc._

// FIXME find a better way to send data to the websocket actor then to pass the homecontroller

@Singleton
class WebsocketController @Inject()(
    cc: ControllerComponents,
    homeController: HomeController
)(
    implicit system: ActorSystem, mat: Materializer
) extends AbstractController(cc)
{
    def createSocket: WebSocket = WebSocket.accept[String, String] { request =>
        ActorFlow.actorRef { out =>
            WebsocketActor.props(out, homeController)
        }
    }
}

object WebsocketActor {
    def props(out: ActorRef, homeController: HomeController): Props = {
        Props(new WebsocketActor(out, homeController))
    }
}

class WebsocketActor(out: ActorRef, homeController: HomeController) extends Actor {
    override def preStart(): Unit = {
        super.preStart()
        homeController.registerWebSocketActor(this)
    }

    override def postStop(): Unit = {
        super.postStop()
        homeController.deregisterWebSocketActor(this)
    }

    override def preRestart(reason: Throwable, message: Option[Any]): Unit = {
        super.preRestart(reason, message)
        homeController.deregisterWebSocketActor(this)
    }

    override def postRestart(reason: Throwable): Unit = {
        super.postRestart(reason)
        homeController.registerWebSocketActor(this)
    }

    override def receive: PartialFunction[Any, Unit] = {
        case message: String => println(message) // not gonna use this, but print it just in case
    }

    def send(json: String): Unit = {
        out ! json
    }
}
