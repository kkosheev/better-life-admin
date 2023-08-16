import axios from 'axios'

export const fetchCategories = async () => {
    const { data } = await axios.get('http://localhost:3000/api/categories')
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchProducts = async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    const { data } = await axios.get(
        `http://localhost:3000/api/products/fetch?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchSearchProducts = async (searchQuery) => {
    if (searchQuery.length <= 2) return []

    const { data } = await axios.get(`http://localhost:3000/api/products/search?text=${searchQuery}`)
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchProductById = async (id) => {
    const { data } = await axios.get(`http://localhost:3000/api/products/findbyid?id=${id}`)
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}
