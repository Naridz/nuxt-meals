<script setup>
const theme = useTheme()

const handleTheme = () => {
    theme.value = !theme.value
}
</script>

<template>
    <div :class="['border-b p-2' ,theme ? 'bg-[#1a1a1a] text-slate-100 border-slate-700' : 'bg-white text-slate-800 border-slate-300']">
        <ul class="flex justify-between p-2 container mx-auto">
            <li>
                <button :class="['px-4 py-2 rounded-full transition' , theme ?
                'hover:bg-slate-800':'hover:bg-slate-100']">
                    <NuxtLink to="/">Home</NuxtLink>
                </button>
            </li>
            <li class="flex gap-2 items-center">
                <button :class="['flex items-center gap-2 px-4 py-2 rounded-full transition font-semibold' , theme ?
                'bg-pink-600 text-white hover:bg-pink-700':
                'bg-pink-100 text-pink-700 hover:bg-pink-200']">
                    <NuxtLink to="/fav" class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        Favourites</NuxtLink>
                </button>
                <button @click="handleTheme()" :class="['px-4 py-2 rounded-full border transition' , theme ?
                'border-slate-600 hover:bg-slate-800':
                'border-slate-400 hover:bg-slate-100']">Dark</button>
            </li>
        </ul>
    </div>
</template>