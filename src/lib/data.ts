import axios from 'axios'

export const fetchCategories = async () => {
    const { data } = await axios.get('https://better-life-serverless-functions-kkosheev.vercel.app/api/categories')
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchProducts = async () => {
    const { data } = await axios.get('https://better-life-serverless-functions-kkosheev.vercel.app/api/products/fetch')
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}
