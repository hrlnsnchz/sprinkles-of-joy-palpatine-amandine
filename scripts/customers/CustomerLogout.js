import { CustomerNav } from "./CustomerNav.js"
import { LoginForm } from "./LoginForm.js"

const eventHub = document.querySelector("#container")

eventHub.addEventListener("logoutUser", event => {
    sessionStorage.clear()
    LoginForm()
})

