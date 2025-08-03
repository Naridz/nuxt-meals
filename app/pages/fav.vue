<script setup>
const theme = useTheme()
const router = useRouter()
const favourite = useFavouriteStore()
onMounted(() => {
  favourite.loadFromLocal()
})
const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="container mx-auto p-8">
        <button @click="goBack" :class="['inline-block mb-6 px-4 py-3 rounded-full font-medium transition cursor-pointer' , theme ?
        'bg-gray-100 text-black hover:bg-gray-300':'bg-slate-800 text-white hover:bg-slate-700']">
        ← Back
        </button>
        <!-- แสดงรายการ favourite -->
        <h1 :class="['text-3xl font-bold mb-6', theme ? 'text-white' : 'text-slate-800']">
            Your Favourite Meals
        </h1>

        <div v-if="favourite.favourites.length === 0" :class="['text-center mt-10 text-lg', theme ? 'text-gray-400' : 'text-gray-600']">
            You have no favourite meals yet.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
            v-for="meal in favourite.favourites"
            :key="meal.idMeal"
            :class="[
                'rounded-xl shadow-md overflow-hidden flex flex-col justify-between',
                theme ? 'bg-[#1f1f1f] text-white shadow-gray-700' : 'bg-white text-slate-800 shadow-slate-200']">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-[250px] object-cover"/>
        <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ meal.strMeal }}</h2>
            <button :class="['bg-gradient-to-r mt-2 px-4 py-2 rounded-full shadow transition' , theme ?
            'from-slate-300 to-slate-500 text-black hover:from-slate-200 hover:to-slate-400':
            'from-slate-700 to-slate-900 text-white hover:from-slate-800 hover:to-slate-950']"><NuxtLink :to="`/mealDetail/${meal.idMeal}`"
            >View Detail</NuxtLink></button>
        </div>
      </div>
    </div>
    </div>
</template>