

const contentTarget = document.querySelector(".prods")

export const Order = (customerOrder) => {
  return `
    <div class="order">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p class="prods"></p>
      <p>${customerOrder.status.label}</p>
    </div>
  `
}

export const OrderProducts = (customerOrder, productsArray) => {
  contentTarget.innerHTML = `
  <p>${orderProductsFilter(customerOrder, orderProducts)}</p>
  <p>$${totalCost.toFixed(2)}</p>`
  orderProductsFilter(ordersArray, productsArray)
}



let totalCost = 0
export const orderProductsFilter = (customerOrdersArray, orderProductsArray) => {
  const filteredProduct = orderProductsArray.filter(products => products.orderId === customerOrdersArray.id)
  for (const product of filteredProduct) {
    totalCost += product.price
    return filteredProduct
  }
}