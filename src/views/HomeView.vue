<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todo';
import TodoList from '../components/TodoList.vue';
import TodoForm from '../components/TodoForm.vue';
import type { Todo } from '../stores/todo';

const todoStore = useTodoStore();

const { todos, loading, error } = storeToRefs(todoStore);

onMounted(() => {
  todoStore.fetchTodos();
});

const handleAddTodo = (content: string) => {
  todoStore.addTodo(content);
};

const handleUpdateTodo = (todo: Todo) => { // Use the imported Todo interface here
  todoStore.updateTodo(todo);
};

const handleDeleteTodo = (id: number) => {
  todoStore.deleteTodo(id);
};
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen rounded-lg shadow-lg">
    <h1 class="text-4xl font-extrabold text-center text-blue-700 mb-10">
      Vinn's To-Do List
    </h1>

    <TodoForm @add-todo="handleAddTodo" class="mb-8" />

    <div v-if="loading" class="text-center text-blue-600 text-xl font-semibold py-8">
      Loading todos...
    </div>

    <div v-else-if="error" class="text-center text-red-600 text-xl font-semibold py-8 bg-red-100 border border-red-400 rounded-md">
      Error: {{ error }}
    </div>

    <TodoList
      v-else
      :todos="todos"
      @update-todo="handleUpdateTodo"
      @delete-todo="handleDeleteTodo"
    />
  </div>
</template>

<style scoped>
/* No specific scoped styles needed as Tailwind handles most of it */
</style>

