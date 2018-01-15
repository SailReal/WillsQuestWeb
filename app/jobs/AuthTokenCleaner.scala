package jobs

import javax.inject.Inject

import akka.actor._
import com.mohiva.play.silhouette.api.util.Clock
import jobs.AuthTokenCleaner.Clean
import models.services.AuthTokenService

import scala.concurrent.ExecutionContext.Implicits.global

/**
 * A job which cleanup invalid auth tokens.
 *
 * @param service The auth token service implementation.
 * @param clock The clock implementation.
 */
class AuthTokenCleaner @Inject() (
  service: AuthTokenService,
  clock: Clock)
  extends Actor {

  /**
   * Process the received messages.
   */
  def receive: Receive = {
    case Clean =>
      val start = clock.now.getMillis
      service.clean.map { deleted =>
        val seconds = (clock.now.getMillis - start) / 1000
      }.recover {
        case e =>
      }
  }
}

/**
 * The companion object.
 */
object AuthTokenCleaner {
  case object Clean
}
