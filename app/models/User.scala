package models

import java.util.UUID

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }

/**
 * The user object.
 *
 * @param userID The unique ID of the user.
 * @param loginInfo The linked login info.
 * @param username Maybe the email of the authenticated provider.
 */
case class User(
  userID: UUID,
  loginInfo: LoginInfo,
  username: Option[String]) extends Identity {
}
