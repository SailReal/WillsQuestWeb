import sbt.Resolver

name := """LearnDuelWeb"""
version := "0.0.1-SNAPSHOT"

lazy val learnduelweb =
  (project in file(".")).enablePlugins(PlayScala).dependsOn(learnduel)
lazy val learnduel = RootProject(
  uri("https://github.com/bb30/learn-duel.git#v0.0.1"))

resolvers += Resolver.sonatypeRepo("snapshots")
resolvers += Resolver.url("scoverage-bintray",
                          url("https://dl.bintray.com/sksamuel/sbt-plugins/"))(
  Resolver.ivyStylePatterns)

scalaVersion := "2.12.6"

libraryDependencies += guice

libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.3" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.196"
libraryDependencies += "org.webjars" % "bootstrap" % "4.0.0-beta.2" exclude ("org.webjars", "jquery")

resolvers += Resolver.jcenterRepo
resolvers += "Sonatype snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/"

libraryDependencies += "com.mohiva" %% "play-silhouette" % "5.0.0"
libraryDependencies += "com.mohiva" %% "play-silhouette-password-bcrypt" % "5.0.0"
libraryDependencies += "com.mohiva" %% "play-silhouette-persistence" % "5.0.0"
libraryDependencies += "com.mohiva" %% "play-silhouette-crypto-jca" % "5.0.0"
libraryDependencies += "org.webjars" % "jquery" % "3.2.1"
libraryDependencies += "net.codingwell" %% "scala-guice" % "4.1.0"
libraryDependencies += "com.iheart" %% "ficus" % "1.4.1"
libraryDependencies += "com.adrianhurt" %% "play-bootstrap" % "1.2-P26-B3"
libraryDependencies += "com.enragedginger" %% "akka-quartz-scheduler" % "1.6.1-akka-2.5.x"
libraryDependencies += "com.mohiva" %% "play-silhouette-testkit" % "5.0.0" % "test"
libraryDependencies += specs2 % Test
libraryDependencies += ehcache
libraryDependencies += filters

unmanagedSourceDirectories in Compile := (unmanagedSourceDirectories in Compile).value.filter{ _.exists }
unmanagedSourceDirectories in Test := (unmanagedSourceDirectories in Test).value.filter{ _.exists }

routesGenerator := InjectedRoutesGenerator

routesImport += "utils.route.Binders._"

val key = AttributeKey[Int]("load-count")
val f = (s: State) => {
  import sys.process._
  val previous = s get key getOrElse 0
  println("Project load count: " + previous)
  var command = System.getProperty("os.name") match {
    case name if name.toLowerCase.contains("win") => {
      Seq("cmd", "/c", "yarn", "install") !;
      Seq("cmd", "/c", "yarn", "run", "css-modules") !;
      Seq("cmd", "/c", "yarn", "webpack") !;
    }
    case _ => {
      Seq("yarn", "install") !;
      Seq("yarn", "run", "css-modules") !;
      Seq("yarn", "webpack") !;
    }
  }

  s.put(key, previous + 1)
}

onLoad in Global ~= (f compose _)
