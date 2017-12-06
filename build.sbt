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

val key = AttributeKey[Int]("load-count")
val f = (s: State) => {
    import sys.process._
    val previous = s get key getOrElse 0
    println("Project load count: " + previous)
    var command = System.getProperty("os.name") match {
        case name if name.toLowerCase.contains("win") => {
            Seq("cmd", "/c", "yarn", "install") !;
            Seq("cmd", "/c", "yarn", "webpack") !;
        }
        case _ => {
            Seq("yarn", "install") !;
            Seq("yarn", "webpack") !;
        }
    }

    s.put(key, previous + 1)
}

onLoad in Global ~= (f compose _)
