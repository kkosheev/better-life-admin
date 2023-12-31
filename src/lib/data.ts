import axios from 'axios'

export const fetchCategories = async () => {
    const { data } = await axios.get('https://better-life-serverless-functions-kkosheev.vercel.app/api/categories')
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

type FetchOptions = {
    pageIndex: number
    pageSize: number
    archived: 'false' | 'true'
}

export const fetchProducts = async ({ pageIndex, pageSize, archived = 'false' }: FetchOptions, filters: any = []) => {
    const { data } = await axios.post(
        `https://better-life-serverless-functions-kkosheev.vercel.app/api/products/fetch?pageIndex=${pageIndex}&pageSize=${pageSize}&archived=${archived}`,
        JSON.stringify({
            filters: filters,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchSearchProducts = async (searchQuery, limit = 30, archived = 'false', filters = []) => {
    if (searchQuery.length <= 2) return []

    const { data } = await axios.post(
        `https://better-life-serverless-functions-kkosheev.vercel.app/api/products/search?text=${searchQuery}&limit=${limit}&archived=${archived}`,
        JSON.stringify({
            filters: filters,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    // try {
    //     const queryParams = {
    //         text: searchQuery,
    //         limit: limit.toString(),
    //         archived: archived,
    //     }

    //     const queryString = new URLSearchParams(queryParams).toString()

    //     const response = await fetch(
    //         `https://better-life-serverless-functions-kkosheev.vercel.app/api/products/search?${queryString}`,
    //         //`http://localhost:3000/api/products/search?${queryString}`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 filters: [],
    //             }),
    //         }
    //     )
    //     console.log(await response.json())
    // } catch (error) {
    //     console.log(error)
    // }
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchProductById = async (id) => {
    const { data } = await axios.get(
        `https://better-life-serverless-functions-kkosheev.vercel.app/api/products/findbyid?id=${id}`
    )
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchRecipes = async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    const { data } = await axios.get(
        `https://better-life-serverless-functions-kkosheev.vercel.app/api/recipes/fetch?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const toggleArchiveProduct = async (id) => {
    await axios.get(`https://better-life-serverless-functions-kkosheev.vercel.app/api/products/archive?id=${id}`)
}

export const fetchSearchRecipes = async (searchQuery, limit = 30) => {
    if (searchQuery.length <= 2) return []

    const { data } = await axios.get(
        `https://better-life-serverless-functions-kkosheev.vercel.app/api/recipes/search?text=${searchQuery}&limit=${limit}`
    )
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchRecipeById = async (id) => {
    const { data } = await axios.get(
        `https://better-life-serverless-functions-kkosheev.vercel.app/api/recipes/findbyid?id=${id}`
    )
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}
