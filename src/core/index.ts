import { servings } from '@/lib/servings'
import { nutrientsValues } from '@/lib/measurements'
import { sumNestedFields, multiplyNestedFields } from '@/lib/utils'

export const calculateNutrientsForIngredients = (products) => {
    const transformedProducts = transformNutrients(products)
    const multipliedProductsNutrients = multiplyNutrientsForServing(transformedProducts)

    const totalNutrients = multipliedProductsNutrients.reduce(
        (nutrients, product) => sumNestedFields(nutrients, product.nutrients),
        nutrientsValues
    )

    return totalNutrients
}

function transformNutrients(products) {
    return products.map((item) => ({
        ...item,
        nutrients: {
            proximates: item.product.proximates,
            proximates_adv: item.product.proximates_adv,
            vitamins: item.product.vitamins,
            vitamins_adv: item.product.vitamins_adv,
            minerals: item.product.minerals,
            aminoacids: item.product.aminoacids,
            alcohol: item.product.alcohol,
            caffeine: item.product.caffeine,
            extra: item.product.extra,
            other: item.product.other,
        },
    }))
}

function multiplyNutrientsForServing(products) {
    return products.map((product) => {
        const servingMultiplier =
            servings[product.serving_label] ??
            product.product.custom_servings.find((item) => item.label === product.serving_label).value * servings['g']

        const totalAmount = servingMultiplier * Number(product.serving_amount)
        const multipliedNutrients = multiplyNestedFields(product.nutrients, totalAmount)

        product.nutrients = multipliedNutrients

        return product
    })
}
