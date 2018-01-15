package controllers

import javax.inject._

import akka.actor.{Actor, ActorRef, ActorSystem, Props, Timers}
import akka.stream.Materializer
import play.api.libs.streams.ActorFlow
import play.api.mvc._

import scala.concurrent.duration._


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

class WebsocketActor(out: ActorRef, homeController: HomeController) extends Actor with Timers {
    private case object TickKey
    private case object Tick

    override def preStart(): Unit = {
        super.preStart()
        homeController.registerWebSocketActor(this)
        timers.startPeriodicTimer(TickKey, Tick, 5.second)
    }

    override def postStop(): Unit = {
        super.postStop()
        homeController.deregisterWebSocketActor(this)
        timers.cancel(TickKey)
    }

    override def preRestart(reason: Throwable, message: Option[Any]): Unit = {
        super.preRestart(reason, message)
        homeController.deregisterWebSocketActor(this)
        timers.startPeriodicTimer(TickKey, Tick, 5.second)
    }

    override def postRestart(reason: Throwable): Unit = {
        super.postRestart(reason)
        homeController.registerWebSocketActor(this)
        timers.cancel(TickKey)
    }

    override def receive: PartialFunction[Any, Unit] = {
        case message: String => if(message != "Pong") println(message) // not gonna use this, but print it just in case
        case Tick ⇒ send("Ping")
    }

    def send(json: String): Unit = {
        out ! json
    }
}
