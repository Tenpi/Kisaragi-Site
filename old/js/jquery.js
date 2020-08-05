/*Animate details and summary*/
$("details summary").each(function() {
    var $Wrapper = $(this).nextAll().wrapAll("<div></div>").parent()
    if(!$(this).parent("details").attr("open"))
       $Wrapper.hide()
    $(this).click(function(Event) {
       Event.preventDefault()
       if($(this).parent("details").attr("open")) {
          $Wrapper.slideUp(function() {
             $(this).parent("details").removeAttr("open")
          })
       } else {
          $(this).parent("details").attr("open", true)
          $Wrapper.slideDown()
       }
    })
})

/*Hide Header on scroll down*/
/*
let scrolled = false
let lastScrollTop = 0
let delta = 20
let navbarHeight = $(".nav-fixed").outerHeight()

window.addEventListener("scroll", () => {
    scrolled = true
})

setInterval(() => {
    if (scrolled) {
        windowScrolled()
        scrolled = false
    }
}, 250)

function windowScrolled() {
   var st = $(this).scrollTop()
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return
    
    if (st > lastScrollTop && st > navbarHeight) {
        $(".nav-fixed").addClass("nav-hide")
    } else {
        if (st + $(window).height() < $(document).height()) {
         const mobileNav = document.querySelector(".mobile-navbar")
         mobileNav.classList.remove("show-mobile-nav")
         $(".nav-fixed").removeClass("nav-hide")
        }
    }
    lastScrollTop = st
}*/