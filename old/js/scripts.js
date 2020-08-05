
/*Site Theme*/
const changeTheme = (skip) => {
    const themeImg = document.querySelector(".theme-img")
    const section2 = document.querySelector(".section2")
    const section2Headings = document.querySelectorAll(".section2-heading")
    const section2Titles = document.querySelectorAll(".section2-title")
    const section2Paragraphs = document.querySelectorAll(".section2-paragraph")
    const section404 = document.querySelector(".section-404")
    const text404 = document.querySelector(".text-404")
    const img404 = document.querySelector(".img-404")
    const tos = document.querySelector(".tos-container")
    const commands = document.querySelector(".commands")
    const commandsText = document.querySelectorAll(".commands-header, .commands-paragraph")
    section2?.classList.toggle("dark-mode")
    section404?.classList.toggle("section-404-dark")
    text404?.classList.toggle("text-404-dark")
    img404?.classList.toggle("img-404-dark")
    tos?.classList.toggle("tos-container-dark")
    commands?.classList.toggle("commands-dark")
    section2Headings.forEach((h) => h.classList?.toggle("section2-dark"))
    section2Titles.forEach((t) => t.classList?.toggle("section2-dark"))
    section2Paragraphs.forEach((p) => p.classList?.toggle("section2-dark"))
    commandsText.forEach((t) => t.classList.toggle("commands-text-dark"))
    if (themeImg.getAttribute("src").includes("invert")) {
        themeImg.src = "assets/theme.png"
    } else {
        themeImg.src = "assets/theme-invert.png"
    }
    if (!skip) {
        if (theme === "dark") {
            theme = "light"
            localStorage.setItem("theme", "light")
        } else {
            theme = "dark"
            localStorage.setItem("theme", "dark")
        }
    }
}

let theme = localStorage.getItem("theme")
if (!theme) {
    theme = "dark"
    localStorage.setItem("theme", "dark")
} else if (theme === "light") {
    changeTheme(true)
}

document.querySelector(".theme-img").onclick = () => {
    changeTheme()
}

/**Open External Links in New Tab*/
const links = document.getElementsByTagName("a")
for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href") && links[i].hostname !== location.hostname) {
        links[i].target = "_blank"
    }
}

/**Dropdown menu*/
document.querySelector(".features").onclick = () => {
    const dropdown = document.querySelector(".dropdown")
    dropdown?.classList.toggle("show-dropdown")
}

window.onclick = (event) => {
    if (!event.target.matches(".features")) {
        const dropdown = document.querySelector(".dropdown")
        if (dropdown?.classList.contains("show-dropdown")) {
            dropdown?.classList.toggle("show-dropdown")
        }
    }
}

/*Dropdown hover over and hide*/
document.querySelector(".features").onmouseover = () => {
    const dropdown = document.querySelector(".dropdown")
    if (!dropdown?.classList.contains("show-dropdown")) {
        dropdown?.classList.add("show-dropdown")
    }  
}

document.querySelector(".nav-ul").onmouseover = (event) => {
    let found = event.target.classList.contains("drop-hide")
    if (!found) found = event.target.childNodes.forEach((n) => {
        if (n.classList?.contains("drop-hide")) found = true
    })
    if (found) {
        const dropdown = document.querySelector(".dropdown")
        if (dropdown?.classList.contains("show-dropdown")) {
            dropdown?.classList.remove("show-dropdown")
        } 
    }
}

document.querySelector(".dropdown").onmouseleave = () => {
    const dropdown = document.querySelector(".dropdown")
    dropdown?.classList.remove("show-dropdown")
}

document.querySelector(".nav-fixed").onmouseleave = () => {
    const dropdown = document.querySelector(".dropdown")
    dropdown?.classList.remove("show-dropdown")
}

/*Change CSS for all except chrome because no paint-order support*/
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome) {
    const section1Title = document.querySelector(".section1-title")
    const section1Paragraph = document.querySelector(".section1-paragraph")
    section1Title?.classList.add("stroke-title")
    section1Paragraph?.classList.add("stroke-paragraph")
}

/*Mobile Navbar*/
document.querySelector(".hamburger").onclick = () => {
    //const mobileNav = document.querySelector(".mobile-navbar")
    //mobileNav?.classList.toggle("show-mobile-nav")
    $(".mobile-navbar").slideToggle()
}

/*Prevent double click selection*/
document.addEventListener("mousedown", (event) => {
    if (event.detail > 1) {
      event.preventDefault()
    }
}, false)

/*Terms of service bg color change*/
const terms = document.querySelector(".tos-container")

const termsColorChange = () => {
    if ((window.scrollY || window.pageYOffset) > 1000) {
        terms?.classList.add("tos-container-blue")
    } else {
        terms?.classList.remove("tos-container-blue")
    }
}
termsColorChange()

setTimeout(() => {
    terms?.classList.remove("tos-transition")
}, 500)

/*Stop preview on ios*/
document.querySelectorAll(".no-ios-preview").forEach((q) => q.ontouchstart = (event) => {
    event.target.style["-webkit-touch-callout"] = "none"
})

document.querySelectorAll("a").forEach((q) => q.ontouchstart = (event) => {
    event.target.style["-webkit-touch-callout"] = "none"
})

/*Back to top button*/
const backToTop = document.querySelector(".back-to-top")
const showBackToTop = () => {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTop?.style.display = "inline-flex";
      } else {
        backToTop?.style.display = "none";
      }
}

backToTop.onclick = () => {
    window.scroll({top: 0, behavior: "smooth"})
}

window.onscroll = () => {
    termsColorChange()
    // showBackToTop()
}

