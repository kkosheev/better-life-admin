import React from 'react'
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
    glycemicIndex: z.number().gte(0).lte(100),
    nutritionScore: z.number().gte(0).lte(100),
    quantity: z.string(),
    price: z.string(),
})

export const ProductCreate: React.FC = () => {
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
    )
}
