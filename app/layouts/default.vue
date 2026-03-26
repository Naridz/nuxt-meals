<script setup>

const theme = useTheme()
useHead({
  title: 'Favourite Meals'
})
</script>

<template>
    <div 
        :class="[
            'min-h-screen transition-colors duration-300',
            theme 
                ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100' 
                : 'bg-gradient-to-br from-slate-100 via-slate-50 to-white text-slate-900'
        ]"
    >
        <Nav/>
        <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <slot/>
        </main>
    </div>
</template>