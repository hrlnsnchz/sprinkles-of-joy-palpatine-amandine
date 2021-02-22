import { authHelper } from "../auth/authHelper.js"
import { deleteReview } from "../reviews/ReviewProvider.js"
import { ProductList } from "./ProductList.js"
const eventHub = document.querySelector("#container")

export const Product = (product, category, reviewsObj) => {
    return `
      <section class="baked_good">
          <header class="baked_good__header">
              <h4>${product.name}</h4>
              <p>$${product.price}</p>
          </header>
          <div>
              <button id="addProduct--${product.id}">Add to Cart</button>
              <p>${product.description}</p>
              <p>${category.name}</p>
          </div>
          <div class="review">
                <h4>Reviews:</h4>
                <ul>
                    ${reviewsObj.map(review => `<li>${review.comment} rating: ${review.rating}/5 ${reviewDeleteButton(reviewsObj)}</li>`).join("")}
                    
                </ul>
                
            </div>
      </section>
  `
}

// function to render delete button
const reviewDeleteButton = (reviewObject) => {
    const currentCustomerId = parseInt(authHelper.getCurrentUserId())
    const reviewId = reviewObject.find(review => review.customerId === currentCustomerId)
    if (reviewObject.find(review => review.customerId === currentCustomerId)) {
        return `<button id="reviewDelete--${reviewId.id}">Delete Review</button>`
    }
    else {
        return ``
    }
}

// Listener for review delete button
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("reviewDelete--")) {
        const [prefix, id] = event.target.id.split("--")
        deleteReview(id)
        .then(ProductList)
    }
    
})

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("addProduct--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addProductEvent = new CustomEvent("addToCart", {
            detail: {
                addedProduct: parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addProductEvent)
    }
})
