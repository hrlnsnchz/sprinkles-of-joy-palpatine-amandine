import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

let bakeryProducts = []
let bakeryCategories = []

export const ProductList = () => {
  getProducts()
    .then(() => {
      debugger
      getCategories()
      bakeryProducts = useProducts()
      bakeryCategories = useCategories()
      render(bakeryProducts, bakeryCategories)
    })
}

const render = (bakeryProducts, bakeryCategories) => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)
    console.log("Product" + product, "category" + productCategory)
    return Product(product, productCategory)
  }).join("")
}
