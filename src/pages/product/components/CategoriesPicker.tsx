import React, { useState } from 'react'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CategoriesPicker {
    categories: any[]
    selectedCategories: any[]
    setSelectedCategories: any
}

export const CategoriesPicker: React.FC<CategoriesPicker> = ({
    categories,
    selectedCategories,
    setSelectedCategories,
}) => {
    const [selectedValue, setSelectedValue] = useState('')

    const handleClick = () => {
        if (selectedCategories.includes(selectedValue) || selectedValue === '') {
            return
        }

        setSelectedCategories([...selectedCategories, selectedValue])
    }

    const handleChange = (value: string) => {
        setSelectedValue(value)
    }

    const handleDelete = (item: string) => {
        setSelectedCategories(selectedCategories.filter((selected) => selected !== item))
    }

    return (
        <>
            <Select onValueChange={handleChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={category.id}
                            disabled={selectedCategories.includes(category.id)}
                        >
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleClick}>
                <PlusIcon /> &nbsp; Add category
            </Button>
            {categories &&
                selectedCategories.map((item) => (
                    <div className="flex flex-row justify-center items-center space-between space-x-3 space-y-0 rounded-md border-2 p-2">
                        <div className="flex-grow">{categories.find((element) => element.id === item)?.label}</div>
                        <div>
                            <Button variant="outline" size="icon" onClick={() => handleDelete(item)}>
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
        </>
    )
}
