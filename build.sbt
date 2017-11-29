name := """LearnDuelWeb"""
version := "0.0.1-SNAPSHOT"

lazy val learnduelweb = (project in file(".")).enablePlugins(PlayScala)

resolvers += Resolver.sonatypeRepo("snapshots")
resolvers += Resolver.url("scoverage-bintray", url("https://dl.bintray.com/sksamuel/sbt-plugins/"))(Resolver.ivyStylePatterns)

scalaVersion := "2.12.4"

libraryDependencies += guice

libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.196"
libraryDependencies += "org.webjars" % "bootstrap" % "4.0.0-beta.2"

//FIXME: add as build task
lazy val loadNodeDependencies = TaskKey[Unit]("loadNodeDependencies", "Loads all required node_modules")

loadNodeDependencies := {
    import sys.process._
    "yarn install" !;
    "yarn webpack" !;
}
