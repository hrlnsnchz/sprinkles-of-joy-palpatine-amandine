import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")


const render = (productsArray, categoriesArray) => {
  contentTarget.innerHTML = productsArray.map(product => {
    const productCategory = categoriesArray.find(category => category.id === product.categoryId)
    console.log(product, productCategory)
    return Product(product, productCategory)
  }).join("")
}

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(() => {
        const bakeryProducts = useProducts()
        const bakeryCategories = useCategories()
        render(bakeryProducts, bakeryCategories)
    })
}

