import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { nutrientsValues, nutrientsSchema, nutrientsLabels } from '@/lib/measurements'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'
import { fetchCategories, fetchSearchProducts } from '@/lib/data'
import { useQuery } from 'react-query'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    CaretSortIcon,
    ReloadIcon,
    PlusIcon,
    TrashIcon,
    Pencil1Icon,
    CheckIcon,
    Cross1Icon,
} from '@radix-ui/react-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { servings, servingsLabels } from '@/lib/servings'
import { calculateNutrientsForIngredients } from '@/core'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { actions } from '@/lib/actions'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
    name: z.string().min(2).max(100),
    image: z.string().url(),
    cooking_time: z.coerce.number().gte(0),
    difficulty: z.coerce.number().gte(0).lte(4),
})

const fn =
    (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
    (index: number) =>
        active && index === originalIndex
            ? {
                  y: curIndex * 0 + y,
                  scale: 1.1,
                  zIndex: 1,
                  shadow: 15,
                  immediate: (key: string) => key === 'y' || key === 'zIndex',
              }
            : {
                  y: order.indexOf(index) * 0,
                  scale: 1,
                  zIndex: 0,
                  shadow: 1,
                  immediate: false,
              }

const CookingStep: React.FC = ({ step, ingredients, index, onEdit, onDelete }) => {
    const [localStep, setLocalStep] = useState(step)

    const handleSave = () => {
        onEdit(index, localStep)
        setLocalStep({
            ...localStep,
            edit: false,
        })
    }

    const handleRemoveStep = (index) => {
        onDelete(index)
    }

    const handleChangeCustomText = (event) => {
        const text = event.target.value
        setLocalStep({
            ...localStep,
            customText: text,
        })
    }

    const handleCancel = () => {
        setLocalStep({
            ...step,
            edit: false,
        })
    }

    const handleProductChange = (id) => {
        const ingredient = ingredients.find((ing) => ing.product.id === id)

        setLocalStep({
            ...localStep,
            product: ingredient.product,
            serving: 'g',
        })
    }

    const handleActionChange = (action) => {
        setLocalStep({
            ...localStep,
            action: action,
        })
    }

    const handleChangeAmount = (event) => {
        const amount = event.target.value
        setLocalStep({
            ...localStep,
            amount: amount,
        })
    }

    const handleServingChange = (value) => {
        setLocalStep({
            ...localStep,
            serving: value,
        })
    }

    return (
        <div className="min-w-max flex flex-col justify-between space-between space-x-3 space-y-2 rounded-md border-2 p-2">
            <div className="flex flex-row space-x-3 items justify-end">
                {!localStep.edit && (
                    <div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                                setLocalStep({
                                    ...localStep,
                                    edit: true,
                                })
                            }
                        >
                            <Pencil1Icon className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                <div>
                    <Button variant="outline" size="icon" onClick={() => handleRemoveStep(index)}>
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span className="text-md font-semibold mr-2">Product: </span>
                <div className="flex-grow">
                    <Select onValueChange={handleProductChange} disabled={!localStep.edit}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose ingredient" />
                        </SelectTrigger>
                        <SelectContent>
                            {ingredients.map((ing) => (
                                <SelectItem value={ing.product.id}>{ing.product.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span className="text-md font-semibold mr-2">Amount: </span>
                <div className="mr-2">
                    <Input
                        placeholder="100"
                        value={localStep.amount}
                        type={'number'}
                        disabled={!localStep.edit}
                        onChange={handleChangeAmount}
                    />
                </div>
                <div>
                    <Select
                        disabled={!localStep.edit}
                        defaultValue={localStep.serving}
                        onValueChange={handleServingChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                            {localStep.product && localStep.product.custom_servings && (
                                <SelectItem value={'-Custom-'} disabled>
                                    ---- Custom ----
                                </SelectItem>
                            )}
                            {localStep.product &&
                                localStep.product.custom_servings &&
                                localStep.product.custom_servings.map((serv) => (
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
            </div>
            <div className="flex flex-row items-center justify-between">
                <span className="text-md font-semibold mr-2">Action: </span>
                <div className="flex-grow">
                    <Select onValueChange={handleActionChange} disabled={!localStep.edit}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose action" />
                        </SelectTrigger>
                        <SelectContent>
                            {actions.map((action) => (
                                <SelectItem value={action}>{action}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Textarea
                    disabled={!localStep.edit}
                    onChange={handleChangeCustomText}
                    placeholder="Put your custom text instruction for step here instead relying on generated one..."
                />
            </div>
            {localStep.edit && (
                <div className="space-x-4">
                    <Button onClick={handleSave}>
                        <CheckIcon /> &nbsp; Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                        <Cross1Icon /> &nbsp; Cancel
                    </Button>
                </div>
            )}
        </div>
    )
}

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
    const [cookingSteps, setCookingSteps] = useState([])

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

    // Cooking Steps

    const handleAddCookingStep = () => {
        setCookingSteps([
            ...cookingSteps,
            {
                product: null,
                action: null,
                amount: 100,
                serving: 'g',
                edit: true,
                customText: '',
            },
        ])
    }

    const handleCookingStepsEdit = (index, newValue) => {
        const newData = [...cookingSteps]
        newData[index] = { ...newValue }

        setCookingSteps(newData)
    }

    const handleDeleteCookingStep = (index) => {
        const newData = [...cookingSteps]
        newData.splice(index, 1)

        setCookingSteps([...newData])
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setError('')
            setLoading(true)

            console.log(ingredients)
            console.log(cookingSteps)
            console.log(values)

            if (ingredients.length === 0 || cookingSteps.length === 0) {
                setError('Ingredients list or cooking steps are missing')
                return
            }
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
            navigate('/products')
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
                <div className="space-y-12">
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
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-xl font-bold">Cooking Steps</h1>
                        {cookingSteps.map((step, i) => (
                            <CookingStep
                                step={step}
                                ingredients={ingredients}
                                index={i}
                                onEdit={handleCookingStepsEdit}
                                onDelete={handleDeleteCookingStep}
                            />
                        ))}
                        <div>
                            <Button onClick={handleAddCookingStep} disabled={ingredients.length > 0 ? false : true}>
                                <PlusIcon /> &nbsp; Add step
                            </Button>
                        </div>
                    </div>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.proximates)
                                            .sort()
                                            .map((key, index) => {
                                                return (
                                                    <TableRow key={`${key}_${index}`}>
                                                        <TableCell>{nutrientsLabels.proximates[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.proximates[key]} (
                                                            {nutrientsLabels.proximates[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.proximates_adv)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.proximates_adv[key]}>
                                                        <TableCell>
                                                            {nutrientsLabels.proximates_adv[key].label}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.proximates_adv[key]} (
                                                            {nutrientsLabels.proximates_adv[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.vitamins)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.vitamins[key]}>
                                                        <TableCell>{nutrientsLabels.vitamins[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.vitamins[key]} (
                                                            {nutrientsLabels.vitamins[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.vitamins_adv)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.vitamins_adv[key]}>
                                                        <TableCell>{nutrientsLabels.vitamins_adv[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.vitamins_adv[key]} (
                                                            {nutrientsLabels.vitamins_adv[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.minerals)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.minerals[key]}>
                                                        <TableCell>{nutrientsLabels.minerals[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.minerals[key]} (
                                                            {nutrientsLabels.minerals[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.aminoacids)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.aminoacids[key]}>
                                                        <TableCell>{nutrientsLabels.aminoacids[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.aminoacids[key]} (
                                                            {nutrientsLabels.aminoacids[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.alcohol)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.alcohol[key]}>
                                                        <TableCell>{nutrientsLabels.alcohol[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.alcohol[key]} (
                                                            {nutrientsLabels.alcohol[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.caffeine)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.caffeine[key]}>
                                                        <TableCell>{nutrientsLabels.caffeine[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.caffeine[key]} (
                                                            {nutrientsLabels.caffeine[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.extra)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.extra[key]}>
                                                        <TableCell>{nutrientsLabels.extra[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.extra[key]} (
                                                            {nutrientsLabels.extra[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
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
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Name</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(totalNutrients.other)
                                            .sort()
                                            .map((key: string) => {
                                                return (
                                                    <TableRow key={totalNutrients.other[key]}>
                                                        <TableCell>{nutrientsLabels.other[key].label}</TableCell>
                                                        <TableCell className="text-right">
                                                            {totalNutrients.other[key]} (
                                                            {nutrientsLabels.other[key].unit})
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
            </Form>
        </div>
    )
}
