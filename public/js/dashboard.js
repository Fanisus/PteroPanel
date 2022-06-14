let adminVisiblilities = []
let sidebar_size_toggle_state = "large"
console.log(document.getElementsByClassName('icon-only'));
document.documentElement.style.setProperty('--current-sidebar-width', getComputedStyle(document.body).getPropertyValue('--sidebar-large-width'))
function sidebar_size_toggle() {
    console.log("cliecks");
    if (sidebar_size_toggle_state === "large") {
        sidebar_size_toggle_state = "small";
        // document.getElementById('sidebar').classList.add('sidebar-small')
        // document.getElementById('sidebar').classList.remove('sidebar-large')

        document.documentElement.style.setProperty('--current-sidebar-width', getComputedStyle(document.body).getPropertyValue('--sidebar-small-width')) //10vw
        // document.getElementById('icons').classList.remove('inline-block')
        // document.getElementById('icons').classList.add('hide')
        for (let i = 0; i < document.getElementsByClassName('icon-only'); i++) {
            document.getElementById('icons').classList.add('hide')
        }

    }
    else if (sidebar_size_toggle_state === "small") {
        sidebar_size_toggle_state = "large";
        // document.getElementById('sidebar').classList.add('sidebar-large')
        // document.getElementById('sidebar').classList.remove('sidebar-small')
        for (let i = 0; i < document.getElementsByClassName('icon-only'); i++) {
            document.getElementById('icons').item(i).classList.remove('hide')
        }

        document.documentElement.style.setProperty('--current-sidebar-width', getComputedStyle(document.body).getPropertyValue('--sidebar-large-width'))
    }
}

console.log(window.location.pathname);
