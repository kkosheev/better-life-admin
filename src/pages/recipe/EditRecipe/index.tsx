import React from 'react'
import { EditRecipeForm } from './EditRecipeForm'
import { useQuery } from 'react-query'
import { fetchRecipeById } from '@/lib/data'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useParams } from 'react-router-dom'

export function EditRecipe() {
    const { id } = useParams()
    const { data, isLoading } = useQuery(['recipe', id], () => fetchRecipeById(id))

    if (isLoading) return <ReloadIcon className="mr-2 h-14 w-14 animate-spin" />

    return (
        <EditRecipeForm recipe={data.recipe} ingredientsList={data.ingredients} cookingStepsList={data.cookingSteps} />
    )
}
