import { create } from 'zustand'
import TodoModel from '../models/todoModel'
import UserModel from '../models/userModel'
import {
	addTodoToFirebase,
	getTodos,
	removeTodoFromFirebase,
	updateTodoInFirebase
} from '@/firebase/todoServices'

interface TodoStoreState {
	todos: TodoModel[]
	addTodo: (todo: TodoModel) => Promise<void>
	removeTodo: (id: string) => Promise<void>
	updateTodo: (id: string, todo: TodoModel) => Promise<void>
	initializeStore: (id: string) => Promise<void>
	clearStore: () => void
}

interface UserStoreState {
	user: UserModel | null
	setUser: (user: UserModel) => void
	logout: () => void
}

export const useTodoStore = create<TodoStoreState>()((set) => ({
	todos: [] as TodoModel[],
	initializeStore: async (id) => {
		await getTodos(id).then((todos) => {
			set({ todos })
		})
	},
	addTodo: async (todo) => {
		addTodoToFirebase(todo).then(() => {
			set((state) => ({ todos: [...state.todos, todo] }))
		})
	},
	removeTodo: async (id) => {
		await removeTodoFromFirebase(id).then(() => {
			set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }))
		})
	},
	updateTodo: async (id, todo) => {
		await updateTodoInFirebase(id, todo).then(() => {
			set((state) => ({ todos: state.todos.map((t) => (t.id === id ? todo : t)) }))
		})
	},
	clearStore: () => set({ todos: [] })
}))

export const useUserStore = create<UserStoreState>()((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	logout: () => set({ user: null })
}))
