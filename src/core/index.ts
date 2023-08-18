import { servings } from '@/lib/servings'

export const calculateNutrientsForIngredients = (products) => {
    const transformedProducts = transformNutrients(products)
    const multipliedProductsNutrients = multiplyNutrientsForServing(transformedProducts)

    console.log(multipliedProductsNutrients)

    return []
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
        const servingMultiplier = servings[product.serving_label] * Number(product.serving_amount)
        const multipliedNutrients = multiplyNestedFields(product.nutrients, servingMultiplier)

        product.nutrients = multipliedNutrients

        return product
    })
}

function multiplyNestedFields(obj, multiplier) {
    const result = {}

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            result[key] = multiplyNestedFields(obj[key], multiplier)
        } else if (typeof obj[key] === 'number') {
            result[key] = obj[key] * multiplier
        } else {
            result[key] = obj[key]
        }
    }

    return result
}

function sumNestedFields(obj1, obj2) {
    const result = {}

    for (const key in obj1) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            result[key] = sumNestedFields(obj1[key], obj2[key])
        } else if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number') {
            result[key] = obj1[key] + obj2[key]
        } else {
            result[key] = obj1[key]
        }
    }

    return result
}
