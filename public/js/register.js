
function updatePassword() {
    if (document.getElementById("password").value == document.getElementById("retypepassword").value && document.getElementById("password").value.length > 1) {
        console.log("Submit button")
        document.getElementById("submit").disabled = false
    } else if (document.getElementById("password").value != document.getElementById("retypepassword").value) {
        document.getElementById("submit").disabled = true

    }
}
