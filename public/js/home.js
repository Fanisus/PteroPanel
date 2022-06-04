let sidebar_status = "close"
function sidebar_button() {
    console.log("Click")
    if (sidebar_status == "close") {
        sidebar_status = "open"
        document.getElementById("sidebar").classList.add("sidebar-open")
        document.getElementById("sidebar").classList.remove("sidebar-close")
        document.getElementById("header-navigation-left").classList.add("header-navigation-left-open")
        document.getElementById("header-navigation-left").classList.remove("header-navigation-left-close")
        let i = 0
        setTimeout(() => {

            while (document.getElementsByClassName("sidebar-text").length > i) {
                document.getElementsByClassName("sidebar-text").item(i).classList.remove("hide")
                i++
            }
        }, 500);
    }
    else if (sidebar_status == "open") {
        sidebar_status = "close"
        document.getElementById("sidebar").classList.add("sidebar-close")
        document.getElementById("sidebar").classList.remove("sidebar-open")
        document.getElementById("header-navigation-left").classList.add("header-navigation-left-close")
        document.getElementById("header-navigation-left").classList.remove("header-navigation-left-open")
        let i = 0
        setTimeout(() => {

            while (document.getElementsByClassName("sidebar-text").length > i) {
                document.getElementsByClassName("sidebar-text").item(i).classList.add("hide")
                i++
            }
        }, 500);

    }
}
function sidebar_hover_enter() {
    console.log("Click")
    if (sidebar_status == "close") {
        
        document.getElementById("sidebar").classList.add("sidebar-open")
        document.getElementById("sidebar").classList.remove("sidebar-close")
        document.getElementById("header-navigation-left").classList.add("header-navigation-left-open")
        document.getElementById("header-navigation-left").classList.remove("header-navigation-left-close")
        document.getElementById("content").classList.remove("content-close")
        document.getElementById("content").classList.add("content-open")
        
        let i = 0
        setTimeout(() => {
            while (document.getElementsByClassName("sidebar-text").length > i) {
                document.getElementsByClassName("sidebar-text").item(i).classList.remove("hide")
                i++
            };
        }, 500);
    }
}
function sidebar_hover_leave() {
    if (sidebar_status == "close") {
        document.getElementById("sidebar").classList.add("sidebar-close")
        document.getElementById("sidebar").classList.remove("sidebar-open")
        document.getElementById("header-navigation-left").classList.add("header-navigation-left-close")
        document.getElementById("header-navigation-left").classList.remove("header-navigation-left-open")
        document.getElementById("content").classList.remove("content-open")
        document.getElementById("content").classList.add("content-close")
        let i = 0
        setTimeout(() => {
            while (document.getElementsByClassName("sidebar-text").length > i) {
                document.getElementsByClassName("sidebar-text").item(i).classList.add("hide")
                i++
            }
        }, 500);
    }
}