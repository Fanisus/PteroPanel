let adminVisiblilities = []
let sidebar_size_toggle_state = "large"
console.log(document.getElementsByClassName('icon-only'));
document.documentElement.style.setProperty('--current-sidebar-width', getComputedStyle(document.body).getPropertyValue('--sidebar-large-width'))
function sidebar_size_toggle() {
    console.log("cliecks");
    if (sidebar_size_toggle_state === "large") {
        sidebar_size_toggle_state = "small";
        document.documentElement.style.setProperty('--current-sidebar-width', getComputedStyle(document.body).getPropertyValue('--sidebar-small-width')) //10vw
        for (var i = 0; i < document.getElementsByClassName('icon-only').length; i++) {
            document.getElementsByClassName('icon-only').item(i).classList.add('hide')
        }
        document.getElementById("sidebar-button").style.transform = "rotate(90deg)"
    }
    else if (sidebar_size_toggle_state === "small") {
        sidebar_size_toggle_state = "large";
        document.documentElement.style.setProperty('--current-sidebar-width', getComputedStyle(document.body).getPropertyValue('--sidebar-large-width'))
        for (let i = 0; i < document.getElementsByClassName('icon-only').length; i++) {
            document.getElementsByClassName('icon-only').item(i).classList.remove('hide')
        }
        document.getElementById("sidebar-button").style.transform = "rotate(270deg)"
    }
}

console.log(window.location.pathname);
