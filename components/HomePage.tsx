import React, {Component} from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Section1 from "./Section1"
import Section2 from "./Section2"

interface Props {
    theme: string
    reRender: () => void
}

export default class HomePage extends Component<Props> {
    public render() {
        return (
            <>
            <Navbar/>
            <Section1/>
            <Section2 theme={this.props.theme}/>
            <Footer fanart reRender={this.props.reRender}/>
            </>
        )
    }
}