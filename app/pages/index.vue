<script setup>
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
//favourite style
const favStyle = (mealId) => {
    if (isFaved(mealId)) {
      return theme.value ?'bg-pink-600 text-white hover:bg-pink-700 border-pink-600':'bg-pink-600 text-white hover:bg-pink-700 border-pink-600'
    } else {
      return theme.value ?'border-slate-600 text-slate-100 hover:bg-slate-800 border':'border-slate-400 text-slate-900 hover:bg-gray-100 border'
    }
  }
//find by letter style
const alpStyle = (char) => {
  if (selectedAlp.value === char) {
    return theme.value ?'bg-slate-300 text-black':'bg-slate-800 text-white'
  } else {
    return theme.value?'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]':'bg-gray-100 text-slate-900 hover:bg-gray-200'
  }
}
</script>

<template>
    <div class="container mx-auto p-10">
        <div class="flex flex-wrap gap-2 mb-6">
            <button v-for="i in alp" :key="i" @click="selectedAlp = i" :class="alpStyle(i)"
            class="px-4 py-2 rounded-full font-semibold transition"
            >{{ i }}</button>
        </div>
        <div v-if="pending" :class="['flex justify-center items-center h-[50vh] text-2xl font-semibold animate-pulse' ,theme ?'text-gray-100':'text-slate-800']">Loading...</div>
        <div v-else-if="mealNotFound" :class="['text-center m-10 py-10 px-6 text-3xl font-semibold rounded-lg shadow-md' , theme ?
        'bg-[#1f1f1f] text-gray-100 shadow-gray-700':'bg-white text-slate-800 shadow-slate-300']"
            >Meals not Found</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div class="border-2 rounded-xl m-4 w-[300px] flex flex-col justify-between min-h-[400px] overflow-hidden shadow-md"
            v-for="i in meals?.meals" :key="i.idMeal">
                <img class="w-full h-[300px] object-cover rounded-t-md" :src="i.strMealThumb" alt="meals">
                <h1 class="text-center p-1 my-2 font-bold text-2xl">{{ i.strMeal }}</h1>
                <ul class="flex justify-between p-5 mt-auto">
                    <li>
                        <button :class="['bg-gradient-to-r px-4 py-2 rounded-full shadow transition' , theme ?
                        'from-slate-300 to-slate-500 text-black hover:from-slate-200 hover:to-slate-400':
                        'from-slate-700 to-slate-900 text-white hover:from-slate-800 hover:to-slate-950']"><NuxtLink :to="`/mealDetail/${i.idMeal}`"
                        >View Detail</NuxtLink></button>
                    </li>
                    <li>
                        <button @click="toggleFavourite(i)"
                        :class="['ml-2 px-4 py-2 rounded-full transition', favStyle(i.idMeal)]"
                        >Favourite</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>