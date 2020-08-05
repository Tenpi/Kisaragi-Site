import React, {Component} from "react"
import kisaragiNewYearChibi from "../assets/images/kisaraginewyearchibi.png"
import searchIcon from "../assets/icons/search-icon.png"
import showPic from "../assets/icons/show-pic.png"
import Navbar from "./Navbar"
import Footer from "./Footer"
import "../styles/commands.less"
import func from "../structures/Functions"
import commands from "../json/commands.json"
import $ from "jquery"

require.context("../assets/labels", true)
require.context("../assets/help", true)

interface Command {
    command: string
    category: string
    description: string
    help: string
    aliases: string
    examples: string
    cooldown: number
}

interface Props {
    theme: string
    reRender: () => void
}

interface State {
    category: string
}

const categories = [
    "admin", "anime", "config", "fun", "game",
    "heart", "image", "info", "weeb", "level",
    "lewd", "misc", "mod", "music", "music 2",
    "video", "waifu", "website", "website 2", "music 3",
    "reddit", "twitter", "misc 2", "website 3", "bot dev"
]

export default class Commands extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            category: "none"
        }
    }

    public commandInteractions = () => {
        /*Toggle Example Image*/
        $(".show-pic").click((event) => {
            const current = $(event.target).closest(".command-box")
            current.find(".example-image").slideDown()
            current.find(".show-pic-container").slideUp()
        })

        $(".example-image img").click((event) => {
            const current = $(event.target).closest(".command-box")
            current.find(".example-image").slideUp()
            current.find(".show-pic-container").slideDown()
        })

        /*Toggle Command Details*/
        $(".command-container").click((event) => {
            const current = $(event.target).closest(".command-box")
            if (current.find(".example-image").css("display") !== "none") {
                current.find(".example-image").slideUp()
                current.find(".show-pic-container").slideDown()
            }
            current.find(".command-details").slideToggle()
        })
    }

    public componentDidUpdate = () => {
        this.commandInteractions()
    }

    public commandColumns = () => {
        const category = this.state.category
        if (!category || category === "none") return
        const categoryCommands = commands.filter((c) => c.category === category)
        const jsx: any = []
        for (let i = 0; i < categoryCommands.length; i++) {
            const command = categoryCommands[i]
            jsx.push(this.generateJSX(command))
        }
        return jsx
    }

    public handleClick = (category: string) => {
        if (category === "bot dev") category = "bot developer"
        if (this.state.category === category) category = "none"
        this.setState({category})
    }

    public generateRows = (columns: number) => {
        const iterations = func.perfectDivision(categories.length, columns)
        const rawJSX: any = []
        for (let i = 0; i < iterations; i++) {
            if (!categories[i]) {
                rawJSX.push(<img src={`assets/labels/${categories[categories.length - 1].replace(/ +/g, "")}.png`} width="157" height="46" className={`category ${categories[categories.length - 1].replace(/ +/g, "")}`} style={{visibility: "hidden"}}/>)
            } else {
                rawJSX.push(<img src={`assets/labels/${categories[i].replace(/ +/g, "")}.png`} width="157" height="46" className={`category ${categories[i].replace(/ +/g, "")}`} onClick={() => this.handleClick(categories[i])}/>)
            }
        }
        const jsxArrays = func.splitArray(rawJSX, columns)
        const jsx: any = []
        for (let i = 0; i < jsxArrays.length; i++) {
            jsx.push(<div className="category-row">{jsxArrays[i].map((a) => a)}</div>)
        }
        return jsx
    }

    public generateJSX = (command: Command) => {
        let image = `assets/help/${command.category}/${command.command}.png`
        if (command.category === "weeb") image = `assets/help/japanese/${command.command}.png`
        const noImg = false
        /*
        if (!await func.imageExists(`../${image}`)) {
            image = image.slice(0, -3) + "gif"
            if (!await func.imageExists(`../${image}`)) {
                noImg = true
            }
        }*/
        const category = command.category === "bot developer" ? "botdev" : command.category.replace(/ +/g, "")
        const help = command.help.replace(/\n/g, `<br className="command-selection ${category}-command-selection">`).replace(/_/g, "")
        const examples = command.examples.replace(/\n/g, `<br className="command-selection ${category}-command-selection">`)
        return (
            <div className={`command-box ${category}-command-box`}>
                <div className="command-container">
                    <div className="command-text-container">
                        <h3 className={`command-name ${category}-command-name`}><span className={`command-selection ${category}-command-selection`}>{command.command}</span></h3>
                        <div className="command-desc-container">
                            <p className={`command-desc ${category}-command-desc`}><span className={`command-selection ${category}-command-selection`}>{command.description}</span></p>
                        </div>
                    </div>
                    <img src={`assets/labels/${category}-label.png`} width="147" height="58" className={`label command-selection ${category}-command-selection`}/>
                </div>
                <div className="command-details">
                    <h5 className={`command-aliases command-detail-color ${category}-command-detail-color`}><span className={`command-selection ${category}-command-selection`}>Aliases: {command.aliases}</span></h5>
                    <h5 className={`command-cooldown command-detail-color ${category}-command-detail-color`}><span className={`command-selection ${category}-command-selection`}>Cooldown: {command.cooldown}</span></h5>
                    <p className={`command-help ${category}-command-help command-selection ${category}-command-selection`}>Help:<br className={`command-selection ${category}-command-selection`}/>{help}</p>
                    <h5 className={`command-examples command-detail-color ${category}-command-detail-color command-selection ${category}-command-selection`}>Examples:<br className={`command-selection\ ${category}-command-selection`}/>{examples}</h5>
                    <div className="show-pic-container">
                        <img src={showPic} width="76" height="64" className={`show-pic ${category}-show-pic command-selection ${category}-command-selection`}/>
                    </div>
                </div>
                {noImg ? null :
                <div className="example-image">
                    <img src={image} className={`command-selection ${category}-command-selection command-img`}/>
                </div>
                }
            </div>
        )
    }
    public render() {
        return (
            <>
            <Navbar/>
            <main className="commands">
                <section className="commands-top-section">
                    <div className="commands-top-section-text">
                        <h1 className="commands-header"><span>Commands</span></h1>
                        <p className="commands-paragraph">Click on a category to display all of the commands in that category. Click on a command for additional description and sub-options. You can expand it even further to view an example image!</p>
                    </div>
                    <img src={kisaragiNewYearChibi} width="176" height="269" className="kisaraginewyear"/>
                </section>
                <hr className="commands-hr"/>

                <section className="categories">
                    {this.generateRows(5)}
                </section>

                <section className="categories-mobile">
                    {this.generateRows(2)}
                </section>

                <section className="commands-search-bar">
                    <div className="commands-search-container">
                        <input type="search" spellCheck="false" placeholder="Search..." className="commands-search"/>
                        <button type="submit" id="submit" className="commands-search-button"><img src={searchIcon} width="140" height="140" className="search-icon"/></button>
                    </div>
                </section>

                <section className="command-columns">
                    {this.commandColumns()}
                </section>
            </main>
            <Footer reRender={this.props.reRender}/>
            </>
        )
    }
}