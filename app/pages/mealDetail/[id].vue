<script setup>
import { ArrowLeft, Utensils, Globe, Clock, Users, Heart } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const mealId = route.params.id
const theme = useTheme()

const { data: mealDetail, pending, error } = await useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
const meal = computed(() => mealDetail.value?.meals?.[0])

//pinia
const favourite = useFavouriteStore()
onMounted(() => {
    favourite.loadFromLocal()
})

const toggleFavourite = (meal) => {
  favourite.toggleFavourite(meal)
}
const isFaved = (id) => {
  return favourite.isFavourite(id)
}

const goBack = () => {
    router.back()
}

// Extract ingredients and measurements
const ingredients = computed(() => {
    if (!meal.value) return []
    const items = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal.value[`strIngredient${i}`]
        const measure = meal.value[`strMeasure${i}`]
        if (ingredient && ingredient.trim()) {
            items.push({
                name: ingredient,
                measure: measure || ''
            })
        }
    }
    return items
})
</script>

<template>
    <div class="py-6 max-w-5xl mx-auto">
        <!-- Back Button -->
        <button 
            @click="goBack" 
            :class="[
                'flex items-center gap-2 mb-8 px-4 py-2.5 rounded-xl font-medium text-sm',
                'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                theme
                    ? 'bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60'
                    : 'bg-slate-100 text-slate-700 border border-slate-200/60 hover:bg-slate-200'
            ]"
        >
            <ArrowLeft class="w-4 h-4" />
            Back
        </button>

        <!-- Loading State -->
        <div v-if="pending" class="flex flex-col items-center justify-center h-[50vh] gap-4">
            <div class="relative w-12 h-12">
                <div 
                    :class="[
                        'absolute inset-0 rounded-full border-2',
                        theme ? 'border-slate-700' : 'border-slate-200'
                    ]"
                ></div>
                <div class="absolute inset-0 rounded-full border-2 border-rose-500 border-t-transparent animate-spin"></div>
            </div>
            <p :class="['font-medium', theme ? 'text-slate-400' : 'text-slate-600']">
                Loading recipe...
            </p>
        </div>

        <!-- Not Found State -->
        <div 
            v-else-if="!meal" 
            class="flex flex-col items-center justify-center py-20 px-6 text-center"
        >
            <div 
                :class="[
                    'w-20 h-20 mb-6 rounded-2xl flex items-center justify-center shadow-xl',
                    theme 
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 shadow-black/30' 
                        : 'bg-gradient-to-br from-slate-100 to-slate-200 shadow-slate-300/50'
                ]"
            >
                <Utensils class="w-8 h-8 text-slate-400" />
            </div>
            <h2 
                :class="['text-2xl font-bold mb-2', theme ? 'text-white' : 'text-slate-900']"
            >
                Meal not found
            </h2>
            <p :class="['max-w-md', theme ? 'text-slate-400' : 'text-slate-600']">
                We couldn't find the recipe you're looking for. It may have been removed.
            </p>
        </div>

        <!-- Meal Detail Content -->
        <div v-else>
            <!-- Hero Section -->
            <div 
                :class="[
                    'rounded-3xl overflow-hidden mb-8',
                    theme
                        ? 'bg-slate-800/60 border border-slate-700/50'
                        : 'bg-white/80 border border-slate-200/60'
                ]"
            >
                <div class="grid md:grid-cols-2 gap-0">
                    <!-- Image -->
                    <div class="relative aspect-square md:aspect-auto overflow-hidden">
                        <img 
                            :src="meal.strMealThumb" 
                            :alt="meal.strMeal" 
                            class="w-full h-full object-cover"
                        />
                    </div>
                    
                    <!-- Info -->
                    <div class="p-6 lg:p-8 flex flex-col">
                        <!-- Favourite Button -->
                        <div class="flex justify-end mb-4">
                            <button 
                                @click="toggleFavourite(meal)"
                                :class="[
                                    'flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm',
                                    'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                                    isFaved(meal.idMeal)
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30'
                                        : theme
                                            ? 'bg-slate-700/60 text-slate-300 border border-slate-600/50 hover:bg-slate-600/60'
                                            : 'bg-slate-100 text-slate-600 border border-slate-200/60 hover:bg-slate-200'
                                ]"
                            >
                                <Heart 
                                    class="w-4 h-4" 
                                    :fill="isFaved(meal.idMeal) ? 'currentColor' : 'none'" 
                                />
                                {{ isFaved(meal.idMeal) ? 'Saved' : 'Add to Favourites' }}
                            </button>
                        </div>

                        <!-- Title -->
                        <h1 
                            :class="[
                                'text-3xl lg:text-4xl font-bold tracking-tight mb-4',
                                theme ? 'text-white' : 'text-slate-900'
                            ]"
                        >
                            {{ meal.strMeal }}
                        </h1>

                        <!-- Meta Tags -->
                        <div class="flex flex-wrap gap-3 mb-6">
                            <span 
                                :class="[
                                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
                                    theme
                                        ? 'bg-slate-700/60 text-slate-300 border border-slate-600/50'
                                        : 'bg-slate-100 text-slate-700 border border-slate-200/60'
                                ]"
                            >
                                <Utensils class="w-3.5 h-3.5" />
                                {{ meal.strCategory }}
                            </span>
                            <span 
                                :class="[
                                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
                                    theme
                                        ? 'bg-slate-700/60 text-slate-300 border border-slate-600/50'
                                        : 'bg-slate-100 text-slate-700 border border-slate-200/60'
                                ]"
                            >
                                <Globe class="w-3.5 h-3.5" />
                                {{ meal.strArea }}
                            </span>
                        </div>

                        <!-- Tags -->
                        <div v-if="meal.strTags" class="flex flex-wrap gap-2 mb-6">
                            <span 
                                v-for="tag in meal.strTags.split(',')" 
                                :key="tag"
                                class="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-rose-500/10 to-pink-500/10 text-rose-500 border border-rose-500/20"
                            >
                                {{ tag.trim() }}
                            </span>
                        </div>

                        <div class="mt-auto"></div>
                    </div>
                </div>
            </div>

            <!-- Two Column Layout -->
            <div class="grid lg:grid-cols-3 gap-8">
                <!-- Ingredients -->
                <div class="lg:col-span-1">
                    <div 
                        :class="[
                            'rounded-2xl p-6 sticky top-24',
                            theme
                                ? 'bg-slate-800/60 border border-slate-700/50'
                                : 'bg-white/80 border border-slate-200/60'
                        ]"
                    >
                        <h2 
                            :class="[
                                'text-xl font-bold mb-4 flex items-center gap-2',
                                theme ? 'text-white' : 'text-slate-900'
                            ]"
                        >
                            <div 
                                class="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500"
                            >
                                <Utensils class="w-4 h-4 text-white" />
                            </div>
                            Ingredients
                        </h2>
                        <ul class="space-y-3">
                            <li 
                                v-for="(item, index) in ingredients" 
                                :key="index"
                                :class="[
                                    'flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0',
                                    theme ? 'border-slate-700/50' : 'border-slate-200/60'
                                ]"
                            >
                                <span class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold">
                                    {{ index + 1 }}
                                </span>
                                <div>
                                    <span :class="['font-medium', theme ? 'text-slate-200' : 'text-slate-900']">
                                        {{ item.name }}
                                    </span>
                                    <span v-if="item.measure" :class="['block text-sm', theme ? 'text-slate-400' : 'text-slate-500']">
                                        {{ item.measure }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Instructions -->
                <div class="lg:col-span-2">
                    <div 
                        :class="[
                            'rounded-2xl p-6',
                            theme
                                ? 'bg-slate-800/60 border border-slate-700/50'
                                : 'bg-white/80 border border-slate-200/60'
                        ]"
                    >
                        <h2 
                            :class="[
                                'text-xl font-bold mb-4 flex items-center gap-2',
                                theme ? 'text-white' : 'text-slate-900'
                            ]"
                        >
                            <div 
                                class="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500"
                            >
                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            Instructions
                        </h2>
                        <div 
                            :class="[
                                'prose prose-lg max-w-none leading-relaxed',
                                theme ? 'prose-invert prose-p:text-slate-300' : 'prose-p:text-slate-700'
                            ]"
                        >
                            <p 
                                v-for="(paragraph, index) in meal.strInstructions.split('\r\n').filter(p => p.trim())" 
                                :key="index"
                                :class="['mb-4', theme ? 'text-slate-300' : 'text-slate-700']"
                            >
                                {{ paragraph }}
                            </p>
                        </div>

                        <!-- YouTube Link -->
                        <div v-if="meal.strYoutube" class="mt-8 pt-6 border-t" :class="theme ? 'border-slate-700/50' : 'border-slate-200/60'">
                            <a 
                                :href="meal.strYoutube" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                :class="[
                                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm',
                                    'transition-all duration-200',
                                    'hover:scale-[1.02] active:scale-[0.98]',
                                    'bg-gradient-to-r from-red-600 to-red-500',
                                    'text-white shadow-lg shadow-red-500/25',
                                    'hover:shadow-xl hover:shadow-red-500/35'
                                ]"
                            >
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>