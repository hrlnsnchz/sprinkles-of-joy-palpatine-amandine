import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"
import { getReviews, useReviews } from "../reviews/ReviewProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")


const render = (productsArray, categoriesArray, reviewsArray) => {
  contentTarget.innerHTML = productsArray.map(product => {
    const productCategory = categoriesArray.find(category => category.id === product.categoryId)
    const productReview = reviewsArray.filter(review => review.productId === product.id)
    // console.log(product, productCategory)
    return Product(product, productCategory, productReview)
  }).join("")
}

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(getReviews)
    .then(() => {
        const bakeryProducts = useProducts()
        const bakeryCategories = useCategories()
        const productReviews = useReviews()
        render(bakeryProducts, bakeryCategories, productReviews)
    })
}

eventHub.addEventListener("categorySelected", event => {
  const categoryId = event.detail.selectedCategory
  const categoriesArray = useCategories()
  const products = useProducts()
  const reviews = useReviews()
  if (parseInt(categoryId) !== 0) {
    getProducts()
    .then(getCategories)
    .then(getReviews)
    .then(() => {
      const filteredProductsArray = products.filter(productObject => {
      return productObject.categoryId === parseInt(categoryId)}) 
      render(filteredProductsArray, categoriesArray, reviews)
  })
  }else {
    render(products, categoriesArray, reviews)
  }
})