import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./service-worker"
import images from "./structures/Images"

ReactDOM.render(<App/>, document.getElementById("root"))
// images.animateFavicon()
if (process.env.TESTING === "yes") {
    serviceWorker.unregister()
} else {
    serviceWorker.register()
}
