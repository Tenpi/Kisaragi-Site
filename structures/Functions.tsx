import {RefObject} from "react"
import $ from "jquery"

export default class Functions {
  /** Promise SetTimeout */
  public static timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /** Changes a css property */
  public static changeCSS = (css: {[key: string]: string | number}) => {
      Object.keys(css).map((key) => {
        const value = css[key]
        document.documentElement.style.setProperty(key, String(value))
      })
  }

  /** Adds css to an html element */
  public static addCSS = (element: RefObject<HTMLElement>, css: {[key: string]: string | number}) => {
    console.log(css)
    Object.keys(css).map((key) => {
      const value = css[key]
      element.current!.style[key] = String(value)
    })
    console.log(window.getComputedStyle(element.current!))
  }

  /** Gets the width and height of an html element */
  public static dimensions = (element: RefObject<HTMLElement>) => {
    const height = element.current?.clientHeight!
    const width = element.current?.clientWidth!
    return {width, height}
  }

  /** Gets the browser a user is using */
  public static getBrowser = () => {
    // @ts-ignore Not in types
    const Opera = (!!window["opr"] && !!opr.addons) || !!window["opera"] || navigator.userAgent.indexOf(" OPR/") >= 0
    // @ts-ignore Not in types
    const Firefox = typeof InstallTrigger !== "undefined"
    // @ts-ignore Not in types
    const Safari = /constructor/i.test(window.HTMLElement as unknown as string) || (function (p) {return p.toString() === "[object SafariRemoteNotification]" })(!window["safari"] || (typeof safari !== "undefined" && safari.pushNotification))
    const IE = false || !!document["documentMode"]
    const Edge = !IE && !!window.StyleMedia
    const Chrome = !!window["chrome"] && (!!window["chrome"].webstore || !!window["chrome"].runtime)
    return {Opera, Firefox, Safari, IE, Edge, Chrome}
  }

  /** Animate details and summary */
  public static animateSummary = (element: any) => {
    const wrapper = $(element).nextAll().wrapAll("<div></div>").parent()
    if (!$(element).parent("details").attr("open")) wrapper.hide()
    $(element).on("click", (event) => {
       event.preventDefault()
       if ($(element).parent("details").attr("open")) {
          wrapper.slideUp(() => {
             $(element).parent("details").removeAttr("open")
          })
       } else {
          $(element).parent("details").attr("open", "")
          wrapper.slideDown()
       }
    })
  }

  /** Prevent double click selection */
  public static preventDoubleClick = () => {
    document.addEventListener("mousedown", (event) => {
      if (event.detail > 1) {
        event.preventDefault()
      }
    }, false)
  }

  /** Check if an image exists */
  public static imageExists = async (src: string) => {
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

  /** Get nearest perfect divisor */
  public static perfectDivision = (dividend: number, divisor: number) => {
    let iterations = dividend
    while (iterations % divisor !== 0) {
      iterations++
    }
    return iterations
  }

  /** Split array into multiple */
  public static splitArray = <T extends unknown>(array: T[], size: number): T[][] => {
    const arrays: T[][] = []
    for (let i = 0; i < array.length; i += size) {
        arrays.push(array.slice(i, i + size))
    }
    return arrays
  }
}