import java.util.UUID

import com.google.inject.AbstractModule
import com.mohiva.play.silhouette.api.{Environment, LoginInfo}
import com.mohiva.play.silhouette.test._
import controllers.routes
import de.htwg.se.learn_duel.controller._
import models.User
import net.codingwell.scalaguice.ScalaModule
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.mockito.MockitoSugar
import org.specs2.specification.Scope
import play.api.Application
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.test.CSRFTokenHelper._
import play.api.test.{FakeRequest, PlaySpecification, WithApplication}
import utils.auth.DefaultEnv

import scala.concurrent.ExecutionContext.Implicits.global

class FunctionalSpec extends PlaySpecification with MockitoSugar with ScalaFutures {
    sequential

    "The `restApi`" should {
        "return ok on `onHelp`" in new Context {
            new WithApplication(application) {

                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.RestController.onHelp())
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo NO_CONTENT
            }
        }

        "return ok on `onStartGame`" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.RestController.onStartGame())
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo NO_CONTENT
            }
        }

        "return ok on `onAnswerChosen`" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.RestController.onAnswerChosen(2))
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo NO_CONTENT
            }
        }

        "return ok on `onAddPlayer`" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.RestController.onAddPlayer("testPlayer"))
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo NO_CONTENT
            }
        }

        "return ok on `onRemovePlayer`" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.RestController.onRemovePlayer("testPlayer"))
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo NO_CONTENT
            }
        }

        "return 2 on `getMaxPlayerCount`" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.RestController.getMaxPlayerCount())
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo OK

                contentType(result) must beSome("text/plain")
                contentAsString(result) must contain("2")
            }
        }

        "return <unknown> on `getUsername`" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.RestController.getUsername())
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo OK


                contentType(result) must beSome("text/plain")
                contentAsString(result) must contain("<unknown>")
            }
        }

        "return ok on `onReset`" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.RestController.onReset())
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo NO_CONTENT
            }
        }
    }

    "The `notfound` action" should {
        "should show not found" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, FakeRequest(routes.NotFoundController.index("foo"))
                  .withAuthenticator[DefaultEnv](LoginInfo("invalid", "invalid"))
                )

                status(result) must be equalTo NOT_FOUND
                contentType(result) must beSome("text/html")
                contentAsString(result) must contain("Sorry, the requested route was not found.")
            }
        }
    }

    "The `index` action" should {
        "redirect to login page if user is unauthorized" in new Context {
            new WithApplication(application) {
                val Some(redirectResult) = route(app, FakeRequest(routes.HomeController.index())
                  .withAuthenticator[DefaultEnv](LoginInfo("invalid", "invalid"))
                )

                status(redirectResult) must be equalTo SEE_OTHER

                val redirectURL: String = redirectLocation(redirectResult).getOrElse("")
                redirectURL must contain(routes.SignInController.view().toString)

                val Some(unauthorizedResult) = route(app, addCSRFToken(FakeRequest(GET, redirectURL)))

                status(unauthorizedResult) must be equalTo OK
                contentType(unauthorizedResult) must beSome("text/html")
                contentAsString(unauthorizedResult) must contain("Learn Duel")
            }
        }

        "return 200 if user is authorized" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.HomeController.index())
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo OK
            }
        }


        "redirect if user was logged out" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.HomeController.signOut())
                  .withAuthenticator[DefaultEnv](identity.loginInfo))
                )

                status(result) must be equalTo SEE_OTHER
            }
        }
    }


    "The `login/logout` action" should {
        "return ok on signup page" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.SignUpController.view())
                  .withAuthenticator[DefaultEnv](LoginInfo("invalid", "invalid")))
                )

                status(result) must be equalTo OK
            }
        }

        "return redirect on signup page" in new Context {
            new WithApplication(application) {
                val Some(result) = route(app, addCSRFToken(FakeRequest(routes.SignUpController.submit())
                  .withFormUrlEncodedBody("username" -> "foo", "password" -> "bar")
                  .withAuthenticator[DefaultEnv](LoginInfo("invalid", "invalid"))))

                status(result) must be equalTo SEE_OTHER

                val Some(resultAgain) = route(app, addCSRFToken(FakeRequest(routes.SignUpController.submit())
                  .withFormUrlEncodedBody("username" -> "foo", "password" -> "bar")
                  .withAuthenticator[DefaultEnv](LoginInfo("invalid", "invalid"))))

                status(resultAgain) must be equalTo SEE_OTHER
            }
        }

        "return redirect on signin page" in new Context {
            new WithApplication(application) {
                val Some(_) = route(app, addCSRFToken(FakeRequest(routes.SignInController.view())
                  .withFormUrlEncodedBody("username" -> "foo", "password" -> "bar")
                  .withAuthenticator[DefaultEnv](LoginInfo("invalid", "invalid"))))


                val Some(resultSignin) = route(app, addCSRFToken(FakeRequest(routes.SignInController.submit())
                  .withFormUrlEncodedBody("username" -> "foo", "password" -> "bar")
                  .withAuthenticator[DefaultEnv](LoginInfo("foo", "bar"))))

                status(resultSignin) must be equalTo SEE_OTHER
            }
        }
    }

    "The `Websocket` action" should {
        "not fail" in new Context {
            new WithApplication(application) {
                route(app, addCSRFToken(FakeRequest(routes.WebsocketController.createSocket())
                  .withAuthenticator[DefaultEnv](identity.loginInfo)))
            }
        }
    }

    trait Context extends Scope {
        class FakeModule extends AbstractModule with ScalaModule {
            def configure(): Unit = {
                bind[Environment[DefaultEnv]].toInstance(env)
                bind(classOf[Controller]).toInstance(mockedServerController)
            }
        }

        val identity = User(
            userID = UUID.randomUUID(),
            loginInfo = LoginInfo("test", "test"),
            username = None,
        )

        implicit val env: Environment[DefaultEnv] = new FakeEnvironment[DefaultEnv](Seq(identity.loginInfo -> identity))
        lazy val mockedServerController:Controller = MockedServerController.create()

        lazy val application: Application = new GuiceApplicationBuilder()
          .overrides(new FakeModule)
          .build()
    }
}