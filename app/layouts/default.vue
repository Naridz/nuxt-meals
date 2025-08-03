<script setup>

const theme = useTheme()
useHead({
  title: 'Favourite Meals'
})
</script>

<template>
    <div :class="['min-h-screen transition',theme ? 'bg-[#121212] text-gray-100' : 'bg-slate-200 text-slate-900'] ">
        <Nav/>
        <main>
            <slot/>
        </main>
    </div>
</template>