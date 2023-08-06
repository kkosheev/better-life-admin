import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { nutrientsTemplate } from '@/lib/measurements'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CategoriesPicker } from './CategoriesPicker'
import { fetchCategories } from '@/lib/data'
import { useQuery } from 'react-query'

interface Category {
    id: string
    name: string
    parent_id: string | null
    label: string
}

const formSchema = z.object({
    name: z.string().min(2).max(100),
    image: z.string().url(),
    pure: z.boolean(),
    glycemicIndex: z.coerce.number().gte(0).lte(100),
    nutritionScore: z.coerce.number().gte(0).lte(100),
    unit: z.string(),
    price: z.string(),
})

export const ProductCreate: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

    const { data: categoriesData } = useQuery('categories', fetchCategories, {
        initialData: [],
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            image: '',
            pure: true,
            glycemicIndex: 0,
            nutritionScore: 0,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        console.log(values)

        setLoading(false)
    }

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-14 min-w-max">
            <Form {...form}>
                <div>
                    <h1 className="text-xl font-bold">Create Product</h1>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Apple" {...field} />
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
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pure"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-2 p-4">
                                    <FormControl>
                                        <Checkbox onCheckedChange={field.onChange} checked={field.value} />
                                    </FormControl>
                                    <FormLabel>Pure product</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="glycemicIndex"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Glycemic Index</FormLabel>
                                    <FormControl>
                                        <Input placeholder="100" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nutritionScore"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nutrition Score</FormLabel>
                                    <FormControl>
                                        <Input placeholder="100" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (Averaged category)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an estimated price" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="$">$</SelectItem>
                                            <SelectItem value="$$">$$</SelectItem>
                                            <SelectItem value="$$$">$$$</SelectItem>
                                            <SelectItem value="$$$$">$$$$</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Main unit of measurements" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="g">Grams (g)</SelectItem>
                                            <SelectItem value="ml">Millilitres (ml)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
                <div>
                    <h1 className="text-xl font-bold">Nutrients</h1>
                </div>
            </Form>
            <div>
                <h1 className="text-xl font-bold">Categories</h1>
                <div className="my-3 space-y-4">
                    <CategoriesPicker
                        categories={categoriesData}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                </div>
            </div>
        </div>
    )
}
