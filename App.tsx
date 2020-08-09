import React, {Component} from "react"
import {BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter} from "react-router-dom"
import HomePage from "./components/HomePage"
import Commands from "./components/Commands"
import TermsOfService from "./components/TermsOfService"
import $404 from "./components/404"
import ScrollToTop from "./components/ScrollToTop"
import "./index.less"
import func from "./structures/Functions"
export default class App extends Component {
  public reRender = () => {
    this.forceUpdate()
  }

  public componentDidMount = () => {
    func.preventDoubleClick()
  }

  public render = () => {
    let theme: string | null = null
    if (typeof window !== "undefined") {
      theme = localStorage.getItem("theme")
      if (!theme) {
        theme = "dark"
        localStorage.setItem("theme", "dark")
      }
    } else {
      theme = "dark"
    }
    return (
      <div className={theme === "dark" ? "app dark-theme" : "app"} onTouchStart={() => ""}>
        <Router>
          <ScrollToTop>
            <Switch>
              <Route exact path={["/", "/home", "/index", "/index.html", "/kisaragi"]}><HomePage reRender={this.reRender}/></Route>
              <Route exact path={["/commands", "/commands.html"]}><Commands reRender={this.reRender}/></Route>
              <Route exact path={["/privacy", "/privacypolicy"]}><Redirect to="/terms#privacy"/></Route>
              <Route exact path={["/terms", "/termsofservice"]}><TermsOfService reRender={this.reRender}/></Route>
              <Route path="*"><$404 reRender={this.reRender}/></Route>
            </Switch>
          </ScrollToTop>
        </Router>
      </div>
    )
  }
}