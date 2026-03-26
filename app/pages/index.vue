<script setup>
import { Heart } from 'lucide-vue-next'

const theme = useTheme()

const alp = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
const selectedAlp = ref('A')

const { data: meals, pending, error } = useFetch(()=>`https://www.themealdb.com/api/json/v1/1/search.php?f=${selectedAlp.value}`)

const mealNotFound = computed(() => {
  return !meals.value || !meals.value.meals || meals.value.meals.length === 0
})
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
//favourite button classes with soft gradient
const favClasses = (mealId) => {
    const base = 'flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 hover:scale-[1.05] active:scale-95'
    if (isFaved(mealId)) {
      return theme.value 
        ? `${base} bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30` 
        : `${base} bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30`
    }
    return theme.value
      ? `${base} bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:text-pink-400 hover:border-pink-500/50`
      : `${base} bg-slate-100 text-slate-500 border border-slate-200/60 hover:text-pink-500 hover:border-pink-400/50`
  }

//alphabet chip classes with soft gradient active state
const alpClasses = (char) => {
    const base = 'px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200'
    if (selectedAlp.value === char) {
      return theme.value
        ? `${base} bg-gradient-to-r from-slate-200 to-slate-300 text-slate-900 shadow-lg shadow-slate-500/20`
        : `${base} bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg shadow-slate-800/20`
    }
    return theme.value
      ? `${base} bg-slate-800/40 text-slate-400 border border-slate-700/50 hover:bg-slate-700/60 hover:text-slate-200`
      : `${base} bg-slate-100/80 text-slate-600 border border-slate-200/60 hover:bg-slate-200/80 hover:text-slate-900`
  }
</script>

<template>
    <div class="py-6">
        <!-- Header Section -->
        <div class="mb-10">
            <h1 
                :class="[
                    'text-3xl sm:text-4xl font-bold tracking-tight mb-3',
                    theme ? 'text-white' : 'text-slate-900'
                ]"
            >
                Discover Recipes
            </h1>
            <p 
                :class="[
                    'text-base',
                    theme ? 'text-slate-400' : 'text-slate-600'
                ]"
            >
                Browse delicious meals by letter. Find your next favourite dish.
            </p>
        </div>

        <!-- Alphabet Filter -->
        <div class="flex flex-wrap gap-2 mb-10">
            <button 
                v-for="letter in alp" 
                :key="letter" 
                @click="selectedAlp = letter"
                :class="alpClasses(letter)"
            >
                {{ letter }}
            </button>
        </div>

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
                Loading recipes...
            </p>
        </div>

        <!-- Empty State -->
        <div 
            v-else-if="mealNotFound" 
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
                <span class="text-4xl">🍽️</span>
            </div>
            <h2 
                :class="['text-2xl font-bold mb-2', theme ? 'text-white' : 'text-slate-900']"
            >
                No meals found
            </h2>
            <p 
                :class="['max-w-md', theme ? 'text-slate-400' : 'text-slate-600']"
            >
                We couldn't find any recipes starting with "{{ selectedAlp }}". Try selecting a different letter.
            </p>
        </div>

        <!-- Meal Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
                v-for="meal in meals?.meals" 
                :key="meal.idMeal"
                :class="[
                    'group rounded-2xl overflow-hidden transition-all duration-300',
                    'hover:-translate-y-1',
                    theme
                        ? 'bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 hover:shadow-xl hover:shadow-black/20'
                        : 'bg-white/80 border border-slate-200/60 hover:bg-white hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-900/10'
                ]"
            >
                <!-- Image Container -->
                <div class="relative aspect-[4/3] overflow-hidden">
                    <img 
                        :src="meal.strMealThumb" 
                        :alt="meal.strMeal"
                        :class="[
                            'w-full h-full object-cover transition-transform duration-500',
                            'group-hover:scale-110'
                        ]"
                    >
                    <!-- Glass Overlay on Hover -->
                    <div 
                        :class="[
                            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                            'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
                        ]"
                    ></div>
                </div>
                
                <!-- Content -->
                <div class="p-5">
                    <h3 
                        :class="[
                            'font-semibold text-lg mb-1 line-clamp-2 leading-snug',
                            theme ? 'text-white' : 'text-slate-900'
                        ]"
                    >
                        {{ meal.strMeal }}
                    </h3>
                    <p 
                        :class="['text-sm mb-4', theme ? 'text-slate-500' : 'text-slate-500']"
                    >
                        Meal #{{ meal.idMeal }}
                    </p>
                    
                    <div class="flex items-center gap-3">
                        <!-- View Recipe Button -->
                        <NuxtLink 
                            :to="`/mealDetail/${meal.idMeal}`"
                            :class="[
                                'flex-1 text-center px-4 py-2.5 rounded-xl font-medium text-sm',
                                'transition-all duration-200',
                                'hover:scale-[1.02] active:scale-[0.98]',
                                'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600',
                                'text-white shadow-lg shadow-rose-500/25',
                                'hover:shadow-xl hover:shadow-rose-500/35'
                            ]"
                        >
                            View Recipe
                        </NuxtLink>
                        
                        <!-- Favourite Button -->
                        <button 
                            @click="toggleFavourite(meal)"
                            :class="favClasses(meal.idMeal)"
                            aria-label="Toggle favourite"
                        >
                            <Heart class="w-5 h-5" :fill="isFaved(meal.idMeal) ? 'currentColor' : 'none'" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>