const eventHub = document.querySelector("#container")

// Listening for logout button click. Then clears sesssion storage and refreshes page.
eventHub.addEventListener("logoutUser", event => {
    sessionStorage.clear()
    location.reload()
})

