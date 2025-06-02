<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'add-todo', text: string): void;
}>();

const newTodoText = ref('');

const addTodo = () => {
  if (newTodoText.value.trim()) {
    emit('add-todo', newTodoText.value.trim());
    newTodoText.value = '';
  }
};
</script>

<template>
  <form @submit.prevent="addTodo" class="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-lg shadow-md">
    <input
      type="text"
      v-model="newTodoText"
      placeholder="What needs to be done?"
      class="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      aria-label="New todo text"
    />
    <button
      type="submit"
      class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out shadow-lg"
    >
      Add Todo
    </button>
  </form>
</template>

<style scoped>
</style>

