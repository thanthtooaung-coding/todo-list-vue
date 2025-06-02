<script setup lang="ts">
import TodoItem from './TodoItem.vue';
import type { Todo } from '../stores/todo';

const props = defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  (e: 'update-todo', todo: Todo): void;
  (e: 'delete-todo', id: number): void;
}>();

const handleUpdateTodo = (todo: Todo) => {
  emit('update-todo', todo);
};

const handleDeleteTodo = (id: number) => {
  emit('delete-todo', id);
};
</script>

<template>
  <div class="mt-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Your To-Do List</h2>
    <ul v-if="todos.length > 0" class="space-y-3">
      <TodoItem
        v-for="todo in props.todos"
        :key="todo.ID" :todo="todo"
        @update-todo="handleUpdateTodo"
        @delete-todo="handleDeleteTodo"
      />
    </ul>
    <p v-else class="text-center text-gray-600 text-lg py-8 bg-white rounded-lg shadow-sm">
      No todos yet! Add some tasks to get started.
    </p>
  </div>
</template>

<style scoped>
</style>

