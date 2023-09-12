import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function multiplyNestedFields(obj, multiplier) {
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

export function sumNestedFields(obj1, obj2) {
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

export function debounce(func, delay) {
    let timerId

    return function (...args) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
