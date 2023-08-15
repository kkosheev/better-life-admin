import axios from 'axios'

export const fetchCategories = async () => {
    const { data } = await axios.get('http://localhost:3000/api/categories')
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}

export const fetchProducts = async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    console.log(pageIndex, pageSize)
    const { data } = await axios.get(
        `http://localhost:3000/api/products/fetch?pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
    // better-life-serverless-functions-kkosheev.vercel.app

    return data
}
