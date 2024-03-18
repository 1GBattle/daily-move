import { Dispatch, SetStateAction, createContext } from 'react'
import TodoModel from '../models/todoModel'

interface VisibleTodosContextProps {
	visibleTodos: TodoModel[]
	setVisibleTodos: Dispatch<SetStateAction<TodoModel[]>>
}

export const VisibleTodosContext = createContext<VisibleTodosContextProps>({
	visibleTodos: [],
	setVisibleTodos: () => {}
})
