package controllers

import java.util.UUID
import javax.inject.Inject

import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AvatarService
import com.mohiva.play.silhouette.api.util.PasswordHasherRegistry
import com.mohiva.play.silhouette.impl.providers._
import forms.SignUpForm
import models.User
import models.services.{AuthTokenService, UserService}
import play.api.i18n.{I18nSupport, Messages}
import play.api.mvc._
import utils.auth.DefaultEnv

import scala.concurrent.{ExecutionContext, Future}

/**
  * The `Sign Up` controller.
  *
  * @param components             The Play controller components.
  * @param silhouette             The Silhouette stack.
  * @param userService            The user service implementation.
  * @param authInfoRepository     The auth info repository implementation.
  * @param authTokenService       The auth token service implementation.
  * @param avatarService          The avatar service implementation.
  * @param passwordHasherRegistry The password hasher registry.
  * @param assets                 The Play assets finder.
  * @param ex                     The execution context.
  */
class SignUpController @Inject()(
    components: ControllerComponents,
    silhouette: Silhouette[DefaultEnv],
    userService: UserService,
    authInfoRepository: AuthInfoRepository,
    authTokenService: AuthTokenService,
    avatarService: AvatarService,
    passwordHasherRegistry: PasswordHasherRegistry,
)(
    implicit
    assets: AssetsFinder,
    ex: ExecutionContext
) extends AbstractController(components)
    with I18nSupport {

  /**
    * Views the `Sign Up` page.
    *
    * @return The result to display.
    */
  def view: Action[AnyContent] = silhouette.UnsecuredAction.async {
    implicit request: Request[AnyContent] =>
      Future.successful(Ok(views.html.signUp(SignUpForm.form)))
  }

  /**
    * Handles the submitted form.
    *
    * @return The result to display.
    */
  def submit: Action[AnyContent] = silhouette.UnsecuredAction.async {
    implicit request: Request[AnyContent] =>
      SignUpForm.form.bindFromRequest.fold(
        form => Future.successful(BadRequest(views.html.signUp(form))),
        data => {
          val result = Redirect(routes.SignInController.view())
            .flashing("success" -> Messages("account.activated"))
          val loginInfo = LoginInfo(CredentialsProvider.ID, data.username)
          userService.retrieve(loginInfo).flatMap {
            case Some(user) =>
              Future.successful(result)
            case None =>
              val authInfo = passwordHasherRegistry.current.hash(data.password)
              val user = User(
                userID = UUID.randomUUID(),
                loginInfo = loginInfo,
                username = Some(data.username)
              )
              for {
                user <- userService.save(user.copy())
                authInfo <- authInfoRepository.add(loginInfo, authInfo)
              } yield {
                silhouette.env.eventBus.publish(SignUpEvent(user, request))
                result
              }
          }
        }
      )
  }
}
