import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'

import { nutrientsLabels } from '@/lib/measurements'

export function Filters({ filters, setFilters }) {
    const [localFilters, setLocalFilters] = useState(filters)

    const handleAddFilter = () => {
        setLocalFilters([
            ...localFilters,
            {
                subkey: 'proximates',
                key: 'energy',
                lt: 10,
                gt: 10,
            },
        ])
    }

    const handleSelect = (value, index) => {
        const key = value.split('.')
        localFilters[index].subkey = key[0]
        localFilters[index].key = key[1]

        setLocalFilters(localFilters)
    }

    const handleChangeLT = (value, index) => {
        localFilters[index].lt = Number(value)
        setLocalFilters([...localFilters])
    }

    const handleChangeGT = (value, index) => {
        localFilters[index].gt = Number(value)
        setLocalFilters([...localFilters])
    }

    const handleRemoveFilter = (index) => {
        const temp = localFilters
        temp.splice(index, 1)

        setLocalFilters(temp)
    }

    const handleApplyFilters = () => {
        setFilters([...localFilters])
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-40" variant="outline">
                    Advanced filters
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                    <DialogDescription>Choose filters to apply.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    {localFilters.map((flt, index) => (
                        <div
                            className="
                            min-w-max flex 
                            flex-row justify-between 
                        items-center space-between
                        "
                        >
                            <div className="w-40">
                                <Select
                                    onValueChange={(value) => handleSelect(value, index)}
                                    value={`${flt.subkey}.${flt.key}`}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={'-Proximates-'} disabled>
                                            ---- Proximates ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.proximates).map((key) => (
                                            <SelectItem value={`proximates.${key}`}>
                                                {nutrientsLabels.proximates[key].label} (
                                                {nutrientsLabels.proximates[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Proximates Adv-'} disabled>
                                            ---- Proximates Adv. ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.proximates_adv).map((key) => (
                                            <SelectItem value={`proximates_adv.${key}`}>
                                                {nutrientsLabels.proximates_adv[key].label} (
                                                {nutrientsLabels.proximates_adv[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Vitamins-'} disabled>
                                            ---- Vitamins ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.vitamins).map((key) => (
                                            <SelectItem value={`vitamins.${key}`}>
                                                {nutrientsLabels.vitamins[key].label} (
                                                {nutrientsLabels.vitamins[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Vitamins Adv-'} disabled>
                                            ---- Vitamins Adv ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.vitamins_adv).map((key) => (
                                            <SelectItem value={`vitamins_adv.${key}`}>
                                                {nutrientsLabels.vitamins_adv[key].label} (
                                                {nutrientsLabels.vitamins_adv[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Minerals-'} disabled>
                                            ---- Minerals ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.minerals).map((key) => (
                                            <SelectItem value={`minerals.${key}`}>
                                                {nutrientsLabels.minerals[key].label} (
                                                {nutrientsLabels.minerals[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Aminoacids-'} disabled>
                                            ---- Aminoacids ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.aminoacids).map((key) => (
                                            <SelectItem value={`aminoacids.${key}`}>
                                                {nutrientsLabels.aminoacids[key].label} (
                                                {nutrientsLabels.aminoacids[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Alcohol-'} disabled>
                                            ---- Alcohol ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.alcohol).map((key) => (
                                            <SelectItem value={`alcohol.${key}`}>
                                                {nutrientsLabels.alcohol[key].label} (
                                                {nutrientsLabels.alcohol[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Caffeine-'} disabled>
                                            ---- Caffeine ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.caffeine).map((key) => (
                                            <SelectItem value={`caffeine.${key}`}>
                                                {nutrientsLabels.caffeine[key].label} (
                                                {nutrientsLabels.caffeine[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Extra-'} disabled>
                                            ---- Extra ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.extra).map((key) => (
                                            <SelectItem value={`extra.${key}`}>
                                                {nutrientsLabels.extra[key].label} ({nutrientsLabels.extra[key].unit})
                                            </SelectItem>
                                        ))}
                                        <SelectItem value={'-Other-'} disabled>
                                            ---- Other ----
                                        </SelectItem>
                                        {Object.keys(nutrientsLabels.other).map((key) => (
                                            <SelectItem value={`other.${key}`}>
                                                {nutrientsLabels.other[key].label} ({nutrientsLabels.other[key].unit})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-20">
                                <Input
                                    placeholder="Min"
                                    value={flt.lt}
                                    type={'number'}
                                    onChange={(event) => handleChangeLT(event.target.value, index)}
                                />
                            </div>
                            <div className="w-20">
                                <Input
                                    placeholder="Max"
                                    value={flt.gt}
                                    type={'number'}
                                    onChange={(event) => handleChangeGT(event.target.value, index)}
                                />
                            </div>
                            <div>
                                <Button variant="outline" size="icon" onClick={() => handleRemoveFilter(index)}>
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button className="w-22" variant="outline" onClick={handleAddFilter}>
                        <PlusIcon /> &nbsp; Add filter
                    </Button>
                    {/* <div className="min-w-max flex flex-row justify-between items-center space-between space-x-3 space-y-0 rounded-md border-2 p-2">
                        <div className="ml-2 mr-5">
                            <span className="text-sm font-semibold">{ingredient.product.name}</span>
                        </div>
                        <div className="w-20">
                            <Input
                                placeholder="100"
                                value={ingredient.serving_amount}
                                type={'number'}
                                onChange={handleChangeWeight}
                            />
                        </div>
                        <div className="min-w-min">
                            <Select onValueChange={handleServingChange} value={ingredient.serving_label}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ingredient.product.custom_servings && (
                                        <SelectItem value={'-Custom-'} disabled>
                                            ---- Custom ----
                                        </SelectItem>
                                    )}
                                    {ingredient.product.custom_servings &&
                                        ingredient.product.custom_servings.map((serv) => (
                                            <SelectItem value={serv.label}>{serv.label}</SelectItem>
                                        ))}
                                    <SelectItem value={'-Standard-'} disabled>
                                        ---- Standard ----
                                    </SelectItem>
                                    {servingsLabels.map((serving) => (
                                        <SelectItem value={serving}>{serving}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Button variant="outline" size="icon" onClick={() => handleRemoveIngredient(index)}>
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div> */}
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={handleApplyFilters} type="submit">
                            Apply
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
