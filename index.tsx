import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import images from "./structures/Images"

ReactDOM.render(<App/>, document.getElementById("root"))
// images.animateFavicon()
serviceWorker.unregister()