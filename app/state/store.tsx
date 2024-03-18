import { create } from 'zustand'
import TodoModel from '../models/todoModel'
import UserModel from '../models/userModel'

interface TodoStoreState {
	todos: TodoModel[]
	addTodo: (todo: TodoModel) => void
	removeTodo: (id: string) => void
	updateTodo: (id: string, todo: TodoModel) => void
	initializeStore: (todos: TodoModel[]) => void
}

interface UserStoreState {
	user: UserModel | null
	setUser: (user: UserModel) => void
	logout: () => void
}

export const useTodoStore = create<TodoStoreState>()((set) => ({
	todos: [],
	initializeStore: (todos: TodoModel[]) => set({ todos }),
	addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
	removeTodo: (id) =>
		set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
	updateTodo: (id, todo) =>
		set((state) => ({ todos: state.todos.map((t) => (t.id === id ? todo : t)) }))
}))

export const useUserStore = create<UserStoreState>()((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	logout: () => set({ user: null })
}))
