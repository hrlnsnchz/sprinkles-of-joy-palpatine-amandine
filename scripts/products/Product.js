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
          <div>
                <h4>Reviews:</h4>
                <ul>
                    ${reviewsObj.map(review => `<li>${review.comment}, rating: ${review.rating}/5</li>`).join("")}
                </ul>
            </div>
      </section>
  `
}

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
