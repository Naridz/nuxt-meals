<script setup>
const route = useRoute()
const router = useRouter()
const mealId = route.params.id
const theme = useTheme()

const { data: mealDetail, pending, error } = await useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
const meal = computed(() => mealDetail.value?.meals?.[0])
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
        <div v-if="pending" :class="['flex justify-center items-center h-[50vh] text-2xl font-semibold animate-pulse' , theme ? 'text-gray-100' : 'text-slate-800']">Loading...</div>
        <div v-else-if="!meal">Meal not found</div>
        <div v-else :class="['p-6 rounded-xl shadow max-w-4xl mx-auto transition', theme ?
        'bg-[#1e1e1e] text-gray-100 shadow-gray-800':
        'bg-white text-slate-900 shadow-slate-300']">
            <h1 class="text-4xl font-bold mb-4 text-center">{{ meal.strMeal }}</h1>
            <img :src="meal.strMealThumb" alt="meal" class="w-full mx-auto max-w-md rounded-lg shadow my-6 " />
            <p class="mt-4 text-lg">
                <strong>Category:</strong> {{ meal.strCategory }} <strong class="ml-5">Country:</strong> {{ meal.strArea }}
            </p>
            <p class="text-lg font-semibold mb-1">Instructions:</p>
            <p>{{ meal.strInstructions }}</p>
    </div>
  </div>
</template>