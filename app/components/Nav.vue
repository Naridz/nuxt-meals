<script setup>
import { Heart, Moon, Sun, ChefHat } from 'lucide-vue-next'

const theme = useTheme()

const handleTheme = () => {
    theme.value = !theme.value
}
</script>

<template>
    <!-- Glassmorphism Navbar -->
    <nav 
        :class="[
            'sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300',
            theme 
                ? 'bg-slate-900/80 border-slate-800/60' 
                : 'bg-white/80 border-slate-200/60'
        ]"
    >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo with Gradient -->
                <NuxtLink 
                    to="/" 
                    class="flex items-center gap-3 group"
                >
                    <div 
                        class="w-10 h-10 rounded-xl flex items-center justify-center 
                               bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 
                               shadow-lg shadow-rose-500/20 
                               group-hover:shadow-rose-500/30 
                               group-hover:scale-105 
                               transition-all duration-300"
                    >
                        <ChefHat class="w-5 h-5 text-white" />
                    </div>
                    <span 
                        :class="[
                            'text-lg font-semibold tracking-tight transition-colors',
                            theme ? 'text-white' : 'text-slate-900'
                        ]"
                    >
                        NuxtMeal
                    </span>
                </NuxtLink>
                
                <!-- Actions -->
                <div class="flex items-center gap-2">
                    <!-- Favourites Button -->
                    <NuxtLink 
                        to="/fav" 
                        :class="[
                            'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm',
                            'transition-all duration-200',
                            'hover:scale-[1.02] active:scale-[0.98]',
                            theme
                                ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-slate-700/50'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                        ]"
                    >
                        <Heart class="w-4 h-4 text-rose-500" />
                        <span class="hidden sm:inline">Favourites</span>
                    </NuxtLink>
                    
                    <!-- Theme Toggle -->
                    <button 
                        @click="handleTheme"
                        :class="[
                            'flex items-center justify-center w-10 h-10 rounded-xl',
                            'transition-all duration-200',
                            'hover:scale-[1.02] active:scale-[0.98]',
                            theme
                                ? 'bg-slate-800/60 text-amber-400 hover:bg-slate-700/60 border border-slate-700/50'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                        ]"
                        :aria-label="theme ? 'Switch to light mode' : 'Switch to dark mode'"
                    >
                        <Sun v-if="theme" class="w-4 h-4" />
                        <Moon v-else class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>