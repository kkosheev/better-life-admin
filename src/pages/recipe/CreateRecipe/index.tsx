import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { nutrientsValues, nutrientsSchema, nutrientsLabels } from '@/lib/measurements'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchCategories, fetchSearchProducts } from '@/lib/data'
import { useQuery } from 'react-query'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { CaretSortIcon, ReloadIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { servings, servingsLabels } from '@/lib/servings'
import { calculateNutrientsForIngredients } from '@/core'

const formSchema = z.object({
    name: z.string().min(2).max(100),
    image: z.string().url(),
    cooking_time: z.coerce.number().gte(0),
    difficulty: z.coerce.number().gte(0).lte(4),
})

export const Ingredient: React.FC = ({ ingredient, index, onEdit, onDelete }: any) => {
    //const [localIngredient, setLocalIngredient] = useState(ingredient)

    const handleChangeWeight = (event) => {
        const weight = event.target.value
        onEdit(index, {
            ...ingredient,
            serving_amount: weight,
        })
    }

    const handleServingChange = (value) => {
        onEdit(index, {
            ...ingredient,
            serving_label: value,
        })
    }

    const handleRemoveIngredient = (index) => {
        onDelete(index)
    }

    return (
        <div className="min-w-max flex flex-row justify-between items-center space-between space-x-3 space-y-0 rounded-md border-2 p-2">
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
        </div>
    )
}

export const CreateRecipe: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const { toast } = useToast()

    const [loadingProducts, setLoadingProducts] = useState(false)
    const [foundProducts, setFoundProducts] = useState([])
    const [ingredients, setIngredients] = useState([])

    const [totalNutrients, setTotalNutrients] = useState(nutrientsValues)

    const [proximatesOpen, setProximatesOpen] = useState(false)
    const [proximatesAdvOpen, setProximatesAdvOpen] = useState(false)
    const [vitaminsOpen, setVitaminsOpen] = useState(false)
    const [vitaminsAdvOpen, setVitaminsAdvOpen] = useState(false)
    const [mineralsOpen, setMineralsOpen] = useState(false)
    const [aminoacidsOpen, setAminoacidsOpen] = useState(false)
    const [alcoholOpen, setAlcoholOpen] = useState(false)
    const [caffeineOpen, setCaffeineOpen] = useState(false)
    const [extraOpen, setExtraOpen] = useState(false)
    const [otherOpen, setOtherOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            image: '',
            cooking_time: 0,
            difficulty: '1',
        },
    })

    const handleEdit = (index, newValue) => {
        // Create a new array with the updated item
        const newData = [...ingredients]
        newData[index] = { ...newValue }

        console.log(newData)

        setIngredients(newData)
    }

    React.useEffect(() => {
        const result = calculateNutrientsForIngredients(ingredients)
        setTotalNutrients(result)
    }, [ingredients])

    const handleDeleteIngredient = (index) => {
        const newData = [...ingredients]
        newData.splice(index, 1)

        setIngredients([...newData])
    }

    const handleAddIngredientToList = (product) => {
        const newProduct = {
            product: product,
            serving_label: servingsLabels[1],
            serving_amount: 100,
        }

        setIngredients([...ingredients, newProduct])
    }

    const handleSearchIngredient = async (event) => {
        setLoadingProducts(true)

        const name = event.target.value
        const result = await fetchSearchProducts(name)

        setFoundProducts(result)
        setLoadingProducts(false)
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setError('')
            setLoading(true)

            //better-life-serverless-functions-kkosheev.vercel.app
            // await axios.post(
            //     'https://better-life-serverless-functions-kkosheev.vercel.app/api/products/create',
            //     {
            //         data: values,
            //         selectedCategories: selectedCategories,
            //         custom_servings: customServings,
            //     },
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //     }
            // )

            toast({
                title: 'Hooray 🎉',
                description: 'Recipe created successfully!',
            })
            //navigate('/recipes')
        } catch (err: any) {
            console.log(err.response.data.message)
            if (err.message) {
                setError(err.response.data.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-14 min-w-max">
            {error && <div className="rounded-md p-4 bg-red-100 text-red-900 col-span-3 font-semibold">{error}</div>}
            <Form {...form}>
                <div>
                    <h1 className="text-xl font-bold">Create Recipe</h1>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipe name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Chicken Salad" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL (Cover)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cooking_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cooking Time (Minutes)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="30" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Difficulty</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an estimated price" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'1'}>★</SelectItem>
                                            <SelectItem value={'2'}>★★</SelectItem>
                                            <SelectItem value={'3'}>★★★</SelectItem>
                                            <SelectItem value={'4'}>★★★★</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} type="submit">
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </form>
                </div>
                <div className="space-y-4">
                    <h1 className="text-xl font-bold">Ingredients list</h1>
                    {ingredients.map((ingredient, index) => (
                        <Ingredient
                            ingredient={ingredient}
                            index={index}
                            onEdit={handleEdit}
                            onDelete={handleDeleteIngredient}
                        />
                    ))}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button>
                                <PlusIcon /> &nbsp; Add serving
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-100">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Search product</h4>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Input
                                            placeholder="Apple"
                                            onChange={handleSearchIngredient}
                                            className="col-span-2 h-8"
                                        />
                                    </div>
                                </div>
                                <div className="grid">
                                    {loadingProducts && <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />}
                                    {!loadingProducts && foundProducts.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No products found</p>
                                    )}
                                    {!loadingProducts &&
                                        foundProducts.map((product) => (
                                            <div className={'grid gap-1 grid-cols-4 items-center'}>
                                                <img className="h-10 w-10" src={product.image_url} />
                                                <div className={'col-span-2'}>
                                                    <span className="text-sm font-semibold">{product.name}</span>
                                                </div>
                                                <PopoverClose asChild>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleAddIngredientToList(product)}
                                                    >
                                                        <PlusIcon className="h-4 w-4" />
                                                        &nbsp; Add
                                                    </Button>
                                                </PopoverClose>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <h1 className="text-xl font-bold">Total nutrients</h1>
                    <div className="my-4 space-y-4">
                        <Collapsible
                            open={proximatesOpen}
                            onOpenChange={setProximatesOpen}
                            className="w-[350px] space-y-2"
                        >
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Proximates</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.proximates)
                                    .sort()
                                    .map((key: string) => {
                                        const fieldKey = `nutrients.proximates.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.proximates.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.proximates[key].label} (
                                                            {nutrientsLabels.proximates[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible
                            open={proximatesAdvOpen}
                            onOpenChange={setProximatesAdvOpen}
                            className="w-[350px] space-y-2"
                        >
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Proximates Adv</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.proximates_adv)
                                    .sort()
                                    .map((key: string) => {
                                        const fieldKey = `nutrients.proximates_adv.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.proximates_adv.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.proximates_adv[key].label} (
                                                            {nutrientsLabels.proximates_adv[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible open={vitaminsOpen} onOpenChange={setVitaminsOpen} className="w-[350px] space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Vitamins</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.vitamins)
                                    .sort()
                                    .map((key: string) => {
                                        const fieldKey = `nutrients.vitamins.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.vitamins.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.vitamins[key].label} (
                                                            {nutrientsLabels.vitamins[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible
                            open={vitaminsAdvOpen}
                            onOpenChange={setVitaminsAdvOpen}
                            className="w-[350px] space-y-2"
                        >
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Vitamins Adv</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.vitamins_adv)
                                    .sort()
                                    .map((key: any) => {
                                        return (
                                            <FormField
                                                key={`nutrients.vitamins_adv.${key}`}
                                                control={form.control}
                                                name={`nutrients.vitamins_adv.${key}`}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.vitamins_adv[key].label} (
                                                            {nutrientsLabels.vitamins_adv[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible open={mineralsOpen} onOpenChange={setMineralsOpen} className="w-[350px] space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Minerals</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.minerals)
                                    .sort()
                                    .map((key: keyof typeof nutrientsLabels.minerals) => {
                                        const fieldKey = `nutrients.minerals.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.minerals.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.minerals[key].label} (
                                                            {nutrientsLabels.minerals[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible
                            open={aminoacidsOpen}
                            onOpenChange={setAminoacidsOpen}
                            className="w-[350px] space-y-2"
                        >
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Aminoacids</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.aminoacids)
                                    .sort()
                                    .map((key: string) => {
                                        const fieldKey = `nutrients.aminoacids.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.aminoacids.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.aminoacids[key].label} (
                                                            {nutrientsLabels.aminoacids[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible open={alcoholOpen} onOpenChange={setAlcoholOpen} className="w-[350px] space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Alcohol</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.alcohol)
                                    .sort()
                                    .map((key: string) => {
                                        const fieldKey = `nutrients.alcohol.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.alcohol.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.alcohol[key].label} (
                                                            {nutrientsLabels.alcohol[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible open={caffeineOpen} onOpenChange={setCaffeineOpen} className="w-[350px] space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Caffeine</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.caffeine)
                                    .sort()
                                    .map((key: string) => {
                                        const fieldKey = `nutrients.caffeine.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.caffeine.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.caffeine[key].label} (
                                                            {nutrientsLabels.caffeine[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible open={extraOpen} onOpenChange={setExtraOpen} className="w-[350px] space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Extra</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.extra)
                                    .sort()
                                    .map((key: string) => {
                                        const fieldKey = `nutrients.extra.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.extra.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.extra[key].label} (
                                                            {nutrientsLabels.extra[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div className="my-4 space-y-4">
                        <Collapsible open={otherOpen} onOpenChange={setOtherOpen} className="w-[350px] space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4 rounded-md border-2 p-2">
                                <h4 className="text-md font-semibold">Other</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <CaretSortIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                {Object.keys(nutrientsLabels.other)
                                    .sort()
                                    .map((key: string) => {
                                        const fieldKey = `nutrients.other.${key}`

                                        return (
                                            <FormField
                                                key={`nutrients.other.${key}`}
                                                control={form.control}
                                                name={fieldKey}
                                                defaultValue={0}
                                                render={({ field }: any) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            {nutrientsLabels.other[key].label} (
                                                            {nutrientsLabels.other[key].unit})
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
            </Form>
        </div>
    )
}
