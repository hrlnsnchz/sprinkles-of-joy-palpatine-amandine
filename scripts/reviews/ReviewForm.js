import { getProducts, useProducts } from "../products/ProductProvider.js"
import { saveReview } from "./ReviewProvider.js"

const eventHub = document.querySelector("#container")
let contentTarget = document.querySelector(".form__review")

eventHub.addEventListener("showNewReviewForm", event => {
    getProducts()
        .then(() => {
            const products = useProducts()
            render(products)
    })
})

const render = (productsArray) => {
    contentTarget.innerHTML = `
        <h4>New Review</h4>
    <select id="productSelect" class="productSelect">
        <option value="0">Please select a product...</option>
        ${productsArray.map(product => `<option value="${product.id}">${product.name}</option>`).join("")}
    </select>
    <select id="ratingSelect" class="ratingSelect">
        <option value="0">Please select a rating...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <form action="">    
        <label for="reviewComment">Add a Comment:</label> <br>
        <input type="text" id="reviewComment" <br>
        <button id="postReview">Post Review</button>
    </form>
    
    `
}

// event listener for product selection
eventHub.addEventListener("change", event => {
    if (event.target.id === "productSelect") {
        const customEvent = new CustomEvent("productSelected", {
            detail: {
                selectedProduct: event.target.id
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

// Event listener for the save/post button
eventHub.addEventListener("click", clickEvent => {
    clickEvent.preventDefault()
    if (clickEvent.target.id === "postReview") {
    const product = document.getElementById("productSelect").value
    const rating = document.getElementById("ratingSelect").value
    const comment = document.getElementById("reviewComment").value

        const newReview = {
            productId: parseInt(product),
            rating: parseInt(rating),
            comment: comment
        }
        saveReview(newReview)
        return newReview
    }
})



// Once the reviews are saved fetch the data with a separate function and display it with the built i button on each card