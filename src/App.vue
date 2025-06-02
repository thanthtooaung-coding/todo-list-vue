<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div class="text-2xl font-bold tracking-tight">
          Vue Todo App
        </div>
        <nav>
          <ul class="flex space-x-6">
            <li>
              <RouterLink
                to="/"
                class="text-white hover:text-blue-200 transition-colors duration-200 ease-in-out px-3 py-2 rounded-md hover:bg-blue-700"
                active-class="bg-blue-700 font-semibold"
              >
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="text-white hover:text-blue-200 transition-colors duration-200 ease-in-out px-3 py-2 rounded-md hover:bg-blue-700"
                active-class="bg-blue-700 font-semibold"
              >
                About
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-grow py-8 px-4 sm:px-6 lg:px-8">
      <RouterView />
    </main>

    <footer class="bg-gray-800 text-white py-4 text-center text-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        &copy; {{ new Date().getFullYear() }} Vue Todo App. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* No specific scoped styles needed as Tailwind handles most of it */
</style>

