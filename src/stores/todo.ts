import { defineStore } from 'pinia';

export interface Todo {
  ID: number;
  content: string;
  status: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    todos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTodos(): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('http://localhost:3000/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result && Array.isArray(result.todos)) {
          this.todos = result.todos;
        } else {
          throw new Error('Invalid response format: "todos" array not found.');
        }
      } catch (error: any) {
        this.error = `Failed to fetch todos: ${error.message}`;
        console.error('Error fetching todos:', error);
      } finally {
        this.loading = false;
      }
    },

    async addTodo(content: string): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        const newTodoData = { content, status: false };
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodoData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result && result.todo) {
          this.todos.push(result.todo);
        } else {
          throw new Error('Invalid response format: "todo" object not found after creation.');
        }
      } catch (error: any) {
        this.error = `Failed to add todo: ${error.message}`;
        console.error('Error adding todo:', error);
      } finally {
        this.loading = false;
      }
    },

    async updateTodo(updatedTodo: Todo): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        const updateData = { content: updatedTodo.content, status: updatedTodo.status };
        const response = await fetch(`http://localhost:3000/todos/${updatedTodo.ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const index = this.todos.findIndex((todo) => todo.ID === updatedTodo.ID);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      } catch (error: any) {
        this.error = `Failed to update todo: ${error.message}`;
        console.error('Error updating todo:', error);
      } finally {
        this.loading = false;
      }
    },

    async deleteTodo(id: number): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.todos = this.todos.filter((todo) => todo.ID !== id);
      } catch (error: any) {
        this.error = `Failed to delete todo: ${error.message}`;
        console.error('Error deleting todo:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});

