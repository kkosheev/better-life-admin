import * as z from 'zod'

export const nutrientsLabels = {
    proximates: {
        protein: {
            label: 'Protein',
            unit: 'g',
        },
        water: {
            label: 'Water',
            unit: 'g',
        },
        energy: {
            label: 'Energy',
            unit: 'kcal',
        },
        fat: {
            label: 'Total lipid (fat)',
            unit: 'g',
        },
        carbohydrates: {
            label: 'Carbohydrates',
            unit: 'g',
        },
        fiber: {
            label: 'Fiber, total dietary',
            unit: 'g',
        },
        sugars: {
            label: 'Sugars, Total NLEA',
            unit: 'g',
        },
        salt: {
            label: 'Salt, NaCl',
            unit: 'mg',
        },
    },
    proximates_adv: {
        fiber_soluble: {
            label: 'Fiber, soluble',
            unit: 'g',
        },
        fiber_insoluble: {
            label: 'Fiber, insoluble',
            unit: 'g',
        },
        sugars: {
            label: 'Sugars, added',
            unit: 'g',
        },
        glucose: {
            label: 'Glucose (dextrose)',
            unit: 'g',
        },
        fructose: {
            label: 'Fructose',
            unit: 'g',
        },
        lactose: {
            label: 'Lactose',
            unit: 'g',
        },
        starch: {
            label: 'Starch',
            unit: 'g',
        },
        fatty_acids_saturated: {
            label: 'Fatty acids, total saturated',
            unit: 'g',
        },
        fatty_acids_monounsaturated: {
            label: 'Fatty acids, total monounsaturated',
            unit: 'g',
        },
        fatty_acids_polyunsaturated: {
            label: 'Fatty acids, total polyunsaturated',
            unit: 'g',
        },
        fatty_acids_trans: {
            label: 'Fatty acids, total trans',
            unit: 'g',
        },
        cholesterol: {
            label: 'Cholesterol',
            unit: 'mg',
        },
        other_saccharides: {
            label: 'Other Saccharides',
            unit: 'g',
        },
    },
    vitamins: {
        c: {
            label: 'Vitamin C',
            unit: 'mg',
        },
        b: {
            label: 'Vitamin B',
            unit: 'ug',
        },
        a: {
            label: 'Vitamin A',
            unit: 'iu',
        },
        e: {
            label: 'Vitamin E',
            unit: 'mg',
        },
        d: {
            label: 'Vitamin D (D2 & D3)',
            unit: 'iu',
        },
    },
    vitamins_adv: {
        thiamin: {
            label: 'Thiamin',
            unit: 'mg',
        },
        riboflavin: {
            label: 'Riboflavin',
            unit: 'mg',
        },
        niacin: {
            label: 'Niacin',
            unit: 'mg',
        },
        pantothenic_acid: {
            label: 'Pantothenic acid',
            unit: 'mg',
        },
        vitamin_b6: {
            label: 'Vitamin B-6',
            unit: 'mg',
        },
        biotin: {
            label: 'Biotin',
            unit: 'ug',
        },
        folate: {
            label: 'Folate, total',
            unit: 'mg',
        },
        choline: {
            label: 'Choline, total',
            unit: 'mg',
        },
        retinol: {
            label: 'Retinol',
            unit: 'ug',
        },
        carotene_beta: {
            label: 'Carotene, beta',
            unit: 'ug',
        },
        vitamin_k_phylloquinone: {
            label: 'Vitamin K (phylloquinone)',
            unit: 'ug',
        },
        vitamin_k_dihydrophylloquinone: {
            label: 'Vitamin K (dihydrophylloquinone)',
            unit: 'ug',
        },
        vitamin_k_menaquinone: {
            label: 'Vitamin K (menaquinone-4)',
            unit: 'ug',
        },
    },
    minerals: {
        calcium: {
            label: 'Calcium, Ca',
            unit: 'mg',
        },
        iron: {
            label: 'Iron, Fe',
            unit: 'mg',
        },
        magnesium: {
            label: 'Magnesium, Mg',
            unit: 'mg',
        },
        phosphorus: {
            label: 'Phosphorus, P',
            unit: 'mg',
        },
        potassium: {
            label: 'Potassium, K',
            unit: 'mg',
        },
        sodium: {
            label: 'Sodium, Na',
            unit: 'mg',
        },
        zinc: {
            label: 'Zinc, Zn',
            unit: 'mg',
        },
        copper: {
            label: 'Copper, Cu',
            unit: 'mg',
        },
        manganese: {
            label: 'Manganese, Mn',
            unit: 'mg',
        },
        iodine: {
            label: 'Iodine, I',
            unit: 'ug',
        },
        selenium: {
            label: 'Selenium, Se',
            unit: 'ug',
        },
        chlorine: {
            label: 'Chlorine, Cl',
            unit: 'mg',
        },
        chromium: {
            label: 'Chromium, Cr',
            unit: 'ug',
        },
    },
    aminoacids: {
        tryptophan: {
            label: 'Tryptophan',
            unit: 'g',
        },
        threonine: {
            label: 'Threonine',
            unit: 'g',
        },
        isoleucine: {
            label: 'Isoleucine',
            unit: 'g',
        },
        leucine: {
            label: 'Leucine',
            unit: 'g',
        },
        lysine: {
            label: 'Lysine',
            unit: 'g',
        },
        methionine: {
            label: 'Methionine',
            unit: 'g',
        },
        cystine: {
            label: 'Cystine',
            unit: 'g',
        },
        phenylalanine: {
            label: 'Phenylalanine',
            unit: 'g',
        },
        tyrosine: {
            label: 'Tyrosine',
            unit: 'g',
        },
        valine: {
            label: 'Valine',
            unit: 'g',
        },
        arginine: {
            label: 'Arginine',
            unit: 'g',
        },
        histidine: {
            label: 'Histidine',
            unit: 'g',
        },
        alanine: {
            label: 'Alanine',
            unit: 'g',
        },
        aspartic_acid: {
            label: 'Aspartic acid',
            unit: 'g',
        },
        glutamic_acid: {
            label: 'Glutamic acid',
            unit: 'g',
        },
        glycine: {
            label: 'Glycine',
            unit: 'g',
        },
        proline: {
            label: 'Proline',
            unit: 'g',
        },
        serine: {
            label: 'Serine',
            unit: 'g',
        },
        hydroxyproline: {
            label: 'Hydroxyproline',
            unit: 'g',
        },
        cysteine: {
            label: 'Cysteine',
            unit: 'g',
        },
    },
    alcohol: {
        alcohol: {
            label: 'Alcohol, ethyl',
            unit: 'g',
        },
    },
    caffeine: {
        caffeine: {
            label: 'Caffeine',
            unit: 'mg',
        },
    },
    extra: {
        lycopene: {
            label: 'Lycopene',
            unit: 'ug',
        },
        phytosterols: {
            label: 'Phytosterols',
            unit: 'mg',
        },
        beta_sitosterol: {
            label: 'Beta-sitosterol',
            unit: 'mg',
        },
        isoflavones: {
            label: 'Isoflavones',
            unit: 'mg',
        },
        flavans: {
            label: 'Flavans, total',
            unit: 'mg',
        },
        catechins: {
            label: 'Catechins, total',
            unit: 'mg',
        },
        flavanones: {
            label: 'Flavanones, total',
            unit: 'mg',
        },
        flavones: {
            label: 'Flavones, total',
            unit: 'mg',
        },
        flavonols: {
            label: 'Flavonols, total',
            unit: 'mg',
        },
        quercetin: {
            label: 'Quercetin',
            unit: 'mg',
        },
        pectin: {
            label: 'Pectin',
            unit: 'g',
        },
        beta_glucans: {
            label: 'Beta-glucans',
            unit: 'g',
        },
        oligosaccharides: {
            label: 'Oligosaccharides',
            unit: 'g',
        },
        resistant_starch: {
            label: 'Resistant starch',
            unit: 'g',
        },
        iron_heme: {
            label: 'Iron, heme',
            unit: 'mg',
        },
        iron_non_heme: {
            label: 'Iron, non-heme',
            unit: 'mg',
        },
        cysteine_and_methionine: {
            label: 'Cysteine and methionine (sulfer containig AA)',
            unit: 'g',
        },
        phenylalanine_and_tyrosine: {
            label: 'Phenylalanine and tyrosine (aromatic AA)',
            unit: 'g',
        },
        phospholipids: {
            label: 'Phospholipids',
            unit: 'g',
        },
        glycolipids: {
            label: 'Glycolipids',
            unit: 'g',
        },
        flavonoids: {
            label: 'Flavonoids, total',
            unit: 'mg',
        },
        inulin: {
            label: 'Inulin',
            unit: 'g',
        },
    },
    other: {
        ph: {
            label: 'pH',
            unit: 'ph',
        },
        orac: {
            label: 'ORAC, Total',
            unit: 'umol_te',
        },
    },
}

export const nutrientsValues = {
    proximates: {
        protein: 0,
        water: 0,
        energy: 0,
        fat: 0,
        carbohydrates: 0,
        fiber: 0,
        sugars: 0,
        salt: 0,
    },
    proximates_adv: {
        fiber_soluble: 0,
        fiber_insoluble: 0,
        sugars: 0,
        glucose: 0,
        fructose: 0,
        lactose: 0,
        starch: 0,
        fatty_acids_saturated: 0,
        fatty_acids_monounsaturated: 0,
        fatty_acids_polyunsaturated: 0,
        fatty_acids_trans: 0,
        cholesterol: 0,
        other_saccharides: 0,
    },
    vitamins: {
        c: 0,
        b: 0,
        a: 0,
        e: 0,
        d: 0,
    },
    vitamins_adv: {
        thiamin: 0,
        riboflavin: 0,
        niacin: 0,
        pantothenic_acid: 0,
        vitamin_b6: 0,
        biotin: 0,
        folate: 0,
        choline: 0,
        retinol: 0,
        carotene_beta: 0,
        vitamin_k_phylloquinone: 0,
        vitamin_k_dihydrophylloquinone: 0,
        vitamin_k_menaquinone: 0,
    },
    minerals: {
        calcium: 0,
        iron: 0,
        magnesium: 0,
        phosphorus: 0,
        potassium: 0,
        sodium: 0,
        zinc: 0,
        copper: 0,
        manganese: 0,
        iodine: 0,
        selenium: 0,
        chlorine: 0,
        chromium: 0,
    },
    aminoacids: {
        tryptophan: 0,
        threonine: 0,
        isoleucine: 0,
        leucine: 0,
        lysine: 0,
        methionine: 0,
        cystine: 0,
        phenylalanine: 0,
        tyrosine: 0,
        valine: 0,
        arginine: 0,
        histidine: 0,
        alanine: 0,
        aspartic_acid: 0,
        glutamic_acid: 0,
        glycine: 0,
        proline: 0,
        serine: 0,
        hydroxyproline: 0,
        cysteine: 0,
    },
    alcohol: {
        alcohol: 0,
    },
    caffeine: {
        caffeine: 0,
    },
    extra: {
        lycopene: 0,
        phytosterols: 0,
        beta_sitosterol: 0,
        isoflavones: 0,
        flavans: 0,
        catechins: 0,
        flavanones: 0,
        flavones: 0,
        flavonols: 0,
        quercetin: 0,
        pectin: 0,
        beta_glucans: 0,
        oligosaccharides: 0,
        resistant_starch: 0,
        iron_heme: 0,
        iron_non_heme: 0,
        cysteine_and_methionine: 0,
        phenylalanine_and_tyrosine: 0,
        phospholipids: 0,
        glycolipids: 0,
        flavonoids: 0,
        inulin: 0,
    },
    other: {
        ph: 0,
        orac: 0,
    },
}

export const nutrientsSchema = z.object({
    proximates: z.object({
        protein: z.coerce.number().gte(0),
        water: z.coerce.number().gte(0),
        energy: z.coerce.number().gte(0),
        fat: z.coerce.number().gte(0),
        carbohydrates: z.coerce.number().gte(0),
        fiber: z.coerce.number().gte(0),
        sugars: z.coerce.number().gte(0),
        salt: z.coerce.number().gte(0),
    }),
    proximates_adv: z.object({
        fiber_soluble: z.coerce.number().gte(0),
        fiber_insoluble: z.coerce.number().gte(0),
        sugars: z.coerce.number().gte(0),
        glucose: z.coerce.number().gte(0),
        fructose: z.coerce.number().gte(0),
        lactose: z.coerce.number().gte(0),
        starch: z.coerce.number().gte(0),
        fatty_acids_saturated: z.coerce.number().gte(0),
        fatty_acids_monounsaturated: z.coerce.number().gte(0),
        fatty_acids_polyunsaturated: z.coerce.number().gte(0),
        fatty_acids_trans: z.coerce.number().gte(0),
        cholesterol: z.coerce.number().gte(0),
        other_saccharides: z.coerce.number().gte(0),
    }),
    vitamins: z.object({
        c: z.coerce.number().gte(0),
        b: z.coerce.number().gte(0),
        a: z.coerce.number().gte(0),
        e: z.coerce.number().gte(0),
        d: z.coerce.number().gte(0),
    }),
    vitamins_adv: z.object({
        thiamin: z.coerce.number().gte(0),
        riboflavin: z.coerce.number().gte(0),
        niacin: z.coerce.number().gte(0),
        pantothenic_acid: z.coerce.number().gte(0),
        vitamin_b6: z.coerce.number().gte(0),
        biotin: z.coerce.number().gte(0),
        folate: z.coerce.number().gte(0),
        choline: z.coerce.number().gte(0),
        retinol: z.coerce.number().gte(0),
        carotene_beta: z.coerce.number().gte(0),
        vitamin_k_phylloquinone: z.coerce.number().gte(0),
        vitamin_k_dihydrophylloquinone: z.coerce.number().gte(0),
        vitamin_k_menaquinone: z.coerce.number().gte(0),
    }),
    minerals: z.object({
        calcium: z.coerce.number().gte(0),
        iron: z.coerce.number().gte(0),
        magnesium: z.coerce.number().gte(0),
        phosphorus: z.coerce.number().gte(0),
        potassium: z.coerce.number().gte(0),
        sodium: z.coerce.number().gte(0),
        zinc: z.coerce.number().gte(0),
        copper: z.coerce.number().gte(0),
        manganese: z.coerce.number().gte(0),
        iodine: z.coerce.number().gte(0),
        selenium: z.coerce.number().gte(0),
        chlorine: z.coerce.number().gte(0),
        chromium: z.coerce.number().gte(0),
    }),
    aminoacids: z.object({
        tryptophan: z.coerce.number().gte(0),
        threonine: z.coerce.number().gte(0),
        isoleucine: z.coerce.number().gte(0),
        leucine: z.coerce.number().gte(0),
        lysine: z.coerce.number().gte(0),
        methionine: z.coerce.number().gte(0),
        cystine: z.coerce.number().gte(0),
        phenylalanine: z.coerce.number().gte(0),
        tyrosine: z.coerce.number().gte(0),
        valine: z.coerce.number().gte(0),
        arginine: z.coerce.number().gte(0),
        histidine: z.coerce.number().gte(0),
        alanine: z.coerce.number().gte(0),
        aspartic_acid: z.coerce.number().gte(0),
        glutamic_acid: z.coerce.number().gte(0),
        glycine: z.coerce.number().gte(0),
        proline: z.coerce.number().gte(0),
        serine: z.coerce.number().gte(0),
        hydroxyproline: z.coerce.number().gte(0),
        cysteine: z.coerce.number().gte(0),
    }),
    alcohol: z.object({
        alcohol: z.coerce.number().gte(0),
    }),
    caffeine: z.object({
        caffeine: z.coerce.number().gte(0),
    }),
    extra: z.object({
        lycopene: z.coerce.number().gte(0),
        phytosterols: z.coerce.number().gte(0),
        beta_sitosterol: z.coerce.number().gte(0),
        isoflavones: z.coerce.number().gte(0),
        flavans: z.coerce.number().gte(0),
        catechins: z.coerce.number().gte(0),
        flavanones: z.coerce.number().gte(0),
        flavones: z.coerce.number().gte(0),
        flavonols: z.coerce.number().gte(0),
        quercetin: z.coerce.number().gte(0),
        pectin: z.coerce.number().gte(0),
        beta_glucans: z.coerce.number().gte(0),
        oligosaccharides: z.coerce.number().gte(0),
        resistant_starch: z.coerce.number().gte(0),
        iron_heme: z.coerce.number().gte(0),
        iron_non_heme: z.coerce.number().gte(0),
        cysteine_and_methionine: z.coerce.number().gte(0),
        phenylalanine_and_tyrosine: z.coerce.number().gte(0),
        phospholipids: z.coerce.number().gte(0),
        glycolipids: z.coerce.number().gte(0),
        flavonoids: z.coerce.number().gte(0),
        inulin: z.coerce.number().gte(0),
    }),
    other: z.object({
        ph: z.coerce.number().gte(0),
        orac: z.coerce.number().gte(0),
    }),
})
