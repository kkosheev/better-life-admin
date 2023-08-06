import axios from 'axios'

export const fetchCategories = async () => {
    const { data } = await axios.get('http://localhost:3000/api/categories')

    return data
}
