import React from 'react'
import { EditProductForm } from './EditProductForm'
import { useQuery } from 'react-query'
import { fetchProductById } from '@/lib/data'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useParams } from 'react-router-dom'

export function EditProduct() {
    const { id } = useParams()
    const { data: product, isLoading } = useQuery(['product', id], () => fetchProductById(id))

    if (isLoading) return <ReloadIcon className="mr-2 h-14 w-14 animate-spin" />

    return <EditProductForm product={product.data} productCategories={product.categories} />
}
