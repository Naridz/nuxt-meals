<script setup>
import { ArrowLeft, Heart, Trash2 } from 'lucide-vue-next'

const theme = useTheme()
const router = useRouter()
const favourite = useFavouriteStore()

onMounted(() => {
  favourite.loadFromLocal()
})

const goBack = () => {
    router.back()
}

const removeFavourite = (meal) => {
    favourite.toggleFavourite(meal)
}
</script>

<template>
    <div class="py-6">
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

        <!-- Header -->
        <div class="mb-10 flex items-center gap-3">
            <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center 
                       bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 
                       shadow-lg shadow-rose-500/20"
            >
                <Heart class="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 
                    :class="[
                        'text-3xl sm:text-4xl font-bold tracking-tight',
                        theme ? 'text-white' : 'text-slate-900'
                    ]"
                >
                    Your Favourites
                </h1>
                <p :class="['text-base mt-1', theme ? 'text-slate-400' : 'text-slate-600']">
                    {{ favourite.favourites.length }} meal{{ favourite.favourites.length !== 1 ? 's' : '' }} saved
                </p>
            </div>
        </div>

        <!-- Empty State -->
        <div 
            v-if="favourite.favourites.length === 0" 
            class="flex flex-col items-center justify-center py-20 px-6 text-center"
        >
            <div 
                :class="[
                    'w-24 h-24 mb-6 rounded-2xl flex items-center justify-center shadow-xl',
                    theme 
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 shadow-black/30' 
                        : 'bg-gradient-to-br from-slate-100 to-slate-200 shadow-slate-300/50'
                ]"
            >
                <Heart class="w-10 h-10 text-slate-400" />
            </div>
            <h2 
                :class="['text-2xl font-bold mb-2', theme ? 'text-white' : 'text-slate-900']"
            >
                No favourites yet
            </h2>
            <p :class="['max-w-md', theme ? 'text-slate-400' : 'text-slate-600']">
                Start exploring and save your favourite meals to see them here.
            </p>
        </div>

        <!-- Favourites Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
                v-for="meal in favourite.favourites"
                :key="meal.idMeal"
                :class="[
                    'group rounded-2xl overflow-hidden transition-all duration-300',
                    'hover:-translate-y-1',
                    theme
                        ? 'bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 hover:shadow-xl hover:shadow-black/20'
                        : 'bg-white/80 border border-slate-200/60 hover:bg-white hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-900/10'
                ]"
            >
                <!-- Image -->
                <div class="relative aspect-[4/3] overflow-hidden">
                    <img 
                        :src="meal.strMealThumb" 
                        :alt="meal.strMeal" 
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <!-- Remove Button Overlay -->
                    <button 
                        @click="removeFavourite(meal)"
                        :class="[
                            'absolute top-3 right-3 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200',
                            'hover:scale-[1.05] active:scale-95',
                            theme
                                ? 'bg-slate-900/80 text-rose-400 hover:bg-slate-900'
                                : 'bg-white/90 text-rose-500 hover:bg-white'
                        ]"
                        aria-label="Remove from favourites"
                    >
                        <Trash2 class="w-4 h-4" />
                    </button>
                </div>
                
                <!-- Content -->
                <div class="p-5">
                    <h2 
                        :class="[
                            'font-semibold text-lg mb-1 line-clamp-2 leading-snug',
                            theme ? 'text-white' : 'text-slate-900'
                        ]"
                    >
                        {{ meal.strMeal }}
                    </h2>
                    <p 
                        :class="['text-sm mb-4', theme ? 'text-slate-500' : 'text-slate-500']"
                    >
                        Meal #{{ meal.idMeal }}
                    </p>
                    <NuxtLink 
                        :to="`/mealDetail/${meal.idMeal}`"
                        :class="[
                            'block w-full text-center px-4 py-2.5 rounded-xl font-medium text-sm',
                            'transition-all duration-200',
                            'hover:scale-[1.02] active:scale-[0.98]',
                            'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600',
                            'text-white shadow-lg shadow-rose-500/25',
                            'hover:shadow-xl hover:shadow-rose-500/35'
                        ]"
                    >
                        View Recipe
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>