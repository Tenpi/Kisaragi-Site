import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./service-worker"
import {BrowserRouter as Router} from "react-router-dom"
import images from "./structures/Images"

ReactDOM.hydrate(<Router><App/></Router>, document.getElementById("app"))
// images.animateFavicon()
if (process.env.TESTING === "yes") {
    serviceWorker.unregister()
} else {
    serviceWorker.register()
}
