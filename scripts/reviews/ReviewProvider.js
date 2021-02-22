import { bakeryAPI } from "../Settings.js"

let reviews = []

export const useReviews = () => reviews.slice

export const getReviews = () => {
    return fetch(`${bakeryAPI.baseURL}/reviews`)
    .then(res => res.json())
    .then(parsedRes => {
        reviews = parsedRes
    })
}

export const saveReview = review => {
    return fetch(`${bakeryAPI.baseURL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    .then(getReviews)  
}