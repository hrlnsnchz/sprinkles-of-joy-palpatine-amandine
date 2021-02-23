import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { Order, orderProductsFilter, OrderProducts} from "./Order.js"
import { getOrderProducts, useOrderProducts } from "./OrderProductProvider.js"
import { getOrders, useOrders } from "./OrderProvider.js"



const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let customerOrders = []
let orderProducts = []

export const OrderList = () => {
  if (authHelper.isUserLoggedIn()) {

    getOrders()
    .then(getOrderProducts)
      .then(() => {
        customerOrders = useOrders()
        orderProducts = useOrderProducts()
        render()
      })
  }
}

const render = () => {
  const ordersHtmlRepresentation = customerOrders.map(order=> Order(order)).join("")
  const productOrderHTMLRepresentation = orderProducts.filter(() => OrderProducts(customerOrders, orderProducts)).join("")

  contentContainer.innerHTML = `
  <div id="orders__modal" class="modal--parent">
        <div class="modal--content">
        <h3>Previous Orders</h3>
        <div>
        <h5>Ordered on</h5>
        ${ordersHtmlRepresentation}
        ${productOrderHTMLRepresentation}
        </div>
        <button id="modal--close">Close</button>
        </div>
    </div>`
}

eventHub.addEventListener("showPastOrders", () => {
  OrderList()
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}
