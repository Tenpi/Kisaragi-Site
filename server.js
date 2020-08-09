import path from "path"
import mime from "mime"
import cors from "cors"
import bodyParser from "body-parser"
import express from "express"
import webpack from "webpack"
import middleware from "webpack-dev-middleware"
import hot from "webpack-hot-middleware"
import config from "./webpack.config.cjs"
import favicon from "express-favicon"
import dotenv from "dotenv"
// import ReactDOMServer from "react-dom/server"
// import React from "react"
// import App from "./App"
import fs from "fs"
const __dirname = path.resolve()

dotenv.config()
const app = express()
const compiler = webpack(config({platform: "web"}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(favicon(__dirname + "/assets/icons/favicon.gif"))
app.disable("x-powered-by")
app.set("trust proxy", true)

if (process.env.TESTING === "yes") {
  app.use(middleware(compiler, {
    noInfo: true,
    serverSideRender: true,
    writeToDisk: false
  }))
  app.use(hot(compiler))
}

app.use(express.static(path.join(__dirname, "./public")))
app.use(express.static(path.join(__dirname, "./dist")))

app.get("*", function(req, res) {
  /*const html = ReactDOMServer.renderToString(<App/>)
  const data = fs.readFileSync(path.join(__dirname, "index.html"), {encoding: "utf-8"})
  const document = data.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`)
  res.send(document)*/
  res.sendFile(path.join(__dirname, "./dist/index.html"))
})

app.listen(process.env.PORT || 8080, () => console.log("Started the website server!"))
