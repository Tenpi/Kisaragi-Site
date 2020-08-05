import commands from "./commands.js"

/*Check if image exists*/
const imageExists = async (src) => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
            resolve(true)
        }
        img.onerror = () => {
            resolve(false)
        }
        img.src = src
    })
}

const commandInteractions = () => {
    /*Toggle Example Image*/
    $(".show-pic").click((event) => {
        const current = $(event.target).closest(".command-box")
        current.find(".example-image").slideDown()
        current.find(".show-pic-container").slideUp()
    })
    
    $(".example-image img").click(() => {
        const current = $(event.target).closest(".command-box")
        current.find(".example-image").slideUp()
        current.find(".show-pic-container").slideDown()
    })


    /*Toggle Command Details*/
    $(".command-container").click(() => {
        const current = $(event.target).closest(".command-box")
        if (current.find(".example-image").css("display") !== "none") {
            current.find(".example-image").slideUp()
            current.find(".show-pic-container").slideDown()
        }
        current.find(".command-details").slideToggle()
    })
}

commandInteractions()

const generateHTML = async (command) => {
    let image = `help/${command.category}/${command.command}.png`
    if (command.category === "weeb") image = `help/japanese/${command.command}.png`
    let noImg = false
    if (!await imageExists(`../${image}`)) {
        image = image.slice(0, -3) + "gif"
        if (!await imageExists(`../${image}`)) {
            noImg = true
        }
    }
    if (command.category === "bot developer") command.category = "botdev"
    const category = command.category.replace(/ +/g, "")
    const help = command.help.replace(/\n/g, `<br class="command-selection ${category}-command-selection">`).replace(/_/g, "")
    const examples = command.examples.replace(/\n/g, `<br class="command-selection ${category}-command-selection">`)
    if (noImg) {
        return `
            <div class="command-box ${category}-command-box">
                <div class="command-container">
                    <div class="command-text-container">
                        <h3 class="command-name ${category}-command-name"><span class="command-selection ${category}-command-selection">${command.command}</span></h3>
                        <div class="command-desc-container">
                            <p class="command-desc ${category}-command-desc"><span class="command-selection ${category}-command-selection">${command.description}</span></p>
                        </div>
                    </div>
                    <img src="assets/${category}-label.png" width="147" height="58" class="label command-selection ${category}-command-selection">
                </div>
                <div class="command-details">
                    <h5 class="command-aliases command-detail-color ${category}-command-detail-color"><span class="command-selection ${category}-command-selection">Aliases: ${command.aliases}</span></h5>
                    <h5 class="command-cooldown command-detail-color ${category}-command-detail-color"><span class="command-selection ${category}-command-selection">Cooldown: ${command.cooldown}</span></h5>
                    <p class="command-help ${category}-command-help command-selection ${category}-command-selection">Help:<br class=\"command-selection ${category}-command-selection\">${help}</p>
                    <h5 class="command-examples command-detail-color ${category}-command-detail-color command-selection ${category}-command-selection">Examples:<br class=\"command-selection ${category}-command-selection\">${examples}</h5>
                </div>
            </div>\n
        `
    } else {
        return `
            <div class="command-box ${category}-command-box">
                <div class="command-container">
                    <div class="command-text-container">
                        <h3 class="command-name ${category}-command-name"><span class="command-selection ${category}-command-selection">${command.command}</span></h3>
                        <div class="command-desc-container">
                            <p class="command-desc ${category}-command-desc"><span class="command-selection ${category}-command-selection">${command.description}</span></p>
                        </div>
                    </div>
                    <img src="assets/${category}-label.png" width="147" height="58" class="label command-selection ${category}-command-selection">
                </div>
                <div class="command-details">
                    <h5 class="command-aliases command-detail-color ${category}-command-detail-color"><span class="command-selection ${category}-command-selection">Aliases: ${command.aliases}</span></h5>
                    <h5 class="command-cooldown command-detail-color ${category}-command-detail-color"><span class="command-selection ${category}-command-selection">Cooldown: ${command.cooldown}</span></h5>
                    <p class="command-help ${category}-command-help command-selection ${category}-command-selection">Help:<br class=\"command-selection ${category}-command-selection\">${help}</p>
                    <h5 class="command-examples command-detail-color ${category}-command-detail-color command-selection ${category}-command-selection">Examples:<br class=\"command-selection\ ${category}-command-selection">${examples}</h5>
                    <div class="show-pic-container">
                        <img src="assets/show-pic.png" width="76" height="64" class="show-pic ${category}-show-pic command-selection ${category}-command-selection">
                    </div>
                </div>
                <div class="example-image">
                    <img src="${image}" class="command-selection ${category}-command-selection command-img">
                </div>
            </div>\n
        `
    }
}

const categories = [
    "admin",
    "anime",
    "config",
    "fun",
    "game",
    "heart",
    "image",
    "info",
    "weeb",
    "level",
    "lewd",
    "misc",
    "mod",
    "music",
    "music 2",
    "video",
    "waifu",
    "website",
    "website 2",
    "music 3",
    "reddit",
    "twitter",
    "misc 2",
    "website 3",
    "bot dev"
]

let state = "none"

const commandsHTML = localStorage.getItem("commands")
if (commandsHTML !== null) {
    document.querySelector(".command-columns").innerHTML = commandsHTML
    commandInteractions()
}

/*Generate Commands on Click*/
for (let i = 0; i < categories.length; i++) {
    let category = categories[i]
    document.querySelectorAll(`.${category.replace(/ +/g, "")}`).forEach((s) => {
        s.onclick = async () => {
            if (state === category) {
                document.querySelector(".command-columns").innerHTML = ""
                state = "none"
                localStorage.setItem("commands", "")
                commandInteractions()
            } else {
                state = category
                if (category === "bot dev") category = "bot developer"
                const categoryCommands = commands.commands.filter((c) => c.category === category)
                let htmlString = ""
                for (let i = 0; i < categoryCommands.length; i++) {
                    const command = categoryCommands[i]
                    htmlString += await generateHTML(command)
                }
                document.querySelector(".command-columns").innerHTML = htmlString
                localStorage.setItem("commands", htmlString)
                commandInteractions()
            }
        }
    })
}

/*Search for commands*/
const searchCommands = async (query) => {
    document.querySelector(".command-columns").innerHTML = `<img src="assets/loading.gif" width="50" height="50">`
    query = query.toLowerCase()
    const foundCommands = commands.commands.filter((c) => {
        for (let i = 0; i < Object.values(c).length; i++) {
            console.log(Object.values(c)[i])
            if (String(Object.values(c)[i]).toLowerCase().includes(query)) return true
        }
        return false
    })
    let htmlString = ""
    for (let i = 0; i < foundCommands.length; i++) {
        const command = foundCommands[i]
        htmlString += await generateHTML(command)
    }
    document.querySelector(".command-columns").innerHTML = htmlString
    localStorage.setItem("commands", htmlString)
    commandInteractions()
}

document.querySelector(".commands-search-button").onclick = async () => {
    const text = document.querySelector(".commands-search").value
    await searchCommands(text)
}