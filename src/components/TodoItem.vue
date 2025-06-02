<script setup lang="ts">
interface Todo {
  ID: number;
  content: string;
  status: boolean;
}

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: 'update-todo', todo: Todo): void;
  (e: 'delete-todo', ID: number): void;
}>();

const toggleCompletion = () => {
  emit('update-todo', { ...props.todo, status: !props.todo.status });
};

const deleteItem = () => {
  emit('delete-todo', props.todo.ID);
};
</script>

<template>
  <li class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3 transition-all duration-200 ease-in-out hover:shadow-md">
    <div class="flex items-center flex-grow">
      <input
        type="checkbox"
        :checked="todo.status"
        @change="toggleCompletion"
        class="form-checkbox h-5 w-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
      />
      <span
        :class="{ 'line-through text-gray-500': todo.status }"
        class="ml-4 text-lg font-medium text-gray-800 flex-grow"
      >
        {{ todo.content }}
      </span>
    </div>
    <button
      @click="deleteItem"
      class="ml-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
      aria-label="Delete todo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clip-rule="evenodd" />
      </svg>
    </button>
  </li >
</template>

<style scoped>
/* No specific scoped styles needed as Tailwind handles most of it */
</style>

