import { defineStore } from 'pinia'

export const useFavouriteStore = defineStore('favourite', {
  state: () => ({
    favourites: [] as any[],
  }),
  actions: {
    toggleFavourite(meal: any) {
      const index = this.favourites.findIndex(m => m.idMeal === meal.idMeal)
      if (index !== -1) {
        this.favourites.splice(index, 1)
      } else {
        this.favourites.push(meal)
      }
      this.saveToLocal()
    },
    isFavourite(mealId: string) {
      return this.favourites.some(m => m.idMeal === mealId)
    },
    saveToLocal() {
      localStorage.setItem('favourites', JSON.stringify(this.favourites))
    },
    loadFromLocal() {
      const data = localStorage.getItem('favourites')
      if (data) {
        this.favourites = JSON.parse(data)
      }
    }
  }
})