import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"

const eventHub = document.querySelector("#container")
const userNav = document.querySelector(".userNav")

export const CustomerNav = () => {
  if (authHelper.isUserLoggedIn()) {
    getCustomer(authHelper.getCurrentUserId())
      .then(userObject => {
        render(userObject)
      })
  }
}

const render = (customer) => {
  userNav.innerHTML = `
    <h3>Welcome ${customer.firstName}!</h3>
    <nav class="userNav__links">
      <a class="userNav__link" id="userNav--showCart">My Cart</a>
      <a class="userNav__link" id="userNav--newReview">New Review</a>
      <a class="userNav__link" id="userNav--pastOrders">Order History</a>
      <a class="userNav__link" id="userNav--logout">Logout</a>
    </nav>
  `
}

eventHub.addEventListener("userLoggedIn", event => {
  CustomerNav()
})

eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("userNav--")) {
    const [idPrefix, idSuffix] = event.target.id.split("--")
    let customEvent
    switch (idSuffix) {
      case "showCart":
        customEvent = new CustomEvent("showCustomerCart")
        break;
      case "newReview":
        customEvent = new CustomEvent("showNewReviewForm")
        break;
      case "pastOrders":
        customEvent = new CustomEvent("showPastOrders")
        break;
      case "logout":
        customEvent = new CustomEvent("logoutUser")
        break;
    }
    eventHub.dispatchEvent(customEvent)
  }
})
