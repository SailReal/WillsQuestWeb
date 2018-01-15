package forms

import play.api.data.Form
import play.api.data.Forms._

/**
 * The form which handles the submission of the credentials.
 */
object SignInForm {

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "username" -> nonEmptyText,
      "password" -> nonEmptyText,
    )(Data.apply)(Data.unapply)
  )

  /**
   * The form data.
   *
   * @param username The username of the user.
   * @param password The password of the user.
   */
  case class Data(
    username: String,
    password: String)
}
