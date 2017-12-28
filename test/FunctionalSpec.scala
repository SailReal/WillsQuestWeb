import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerSuite
import play.api.http.Status
import play.api.test.FakeRequest
import play.api.test.Helpers._

/**
  * Functional tests start a Play application internally, available
  * as `app`.
  */
class FunctionalSpec extends PlaySpec with GuiceOneAppPerSuite {

    "Routes" should {

        "send 404 on a bad request" in {
            route(app, FakeRequest(GET, "/boum")).map(status(_)) mustBe Some(NOT_FOUND)
        }

        "send 200 on a good request" in {
            route(app, FakeRequest(GET, "/signIn")).map(status(_)) mustBe Some(OK)
        }

        "send 303 when trying to access a route for which one must be logged in" in {
            route(app, FakeRequest(GET, "/")).map(status(_)) mustBe Some(SEE_OTHER)
        }
    }

    "HomeController" should {

        "render the sign in page" in {
            var home = route(app, FakeRequest(GET, "/")).get

            status(home) mustBe Status.SEE_OTHER

            home = route(app, FakeRequest(GET, "/signIn")).get
            contentType(home) mustBe Some("text/html")
            contentAsString(home) must include("logInUp-container")
        }

    }
}
