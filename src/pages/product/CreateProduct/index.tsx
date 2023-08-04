import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { nutrientsTemplate } from '@/lib/measurements'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
    name: z.string().min(2).max(100),
    image: z.string(),
    pure: z.boolean(),
    glycemicIndex: z.coerce.number().gte(0).lte(100),
    nutritionScore: z.coerce.number().gte(0).lte(100),
    quantity: z.string(),
    price: z.string(),
})

export const ProductCreate: React.FC = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            image: '',
            pure: true,
            glycemicIndex: 0,
            nutritionScore: 0,
            quantity: 'g',
            price: '$',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        console.log(values)

        setLoading(false)
    }

    return (
        <div className="grid grid-cols-1 gap-4 min-w-max">
            <h1 className="text-xl font-bold">Create Product</h1>
            <Form {...form}>
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
                    <Button disabled={loading} type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}
