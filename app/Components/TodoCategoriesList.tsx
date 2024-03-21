'use client'
import { useContext, useEffect, useState } from 'react'
import { VisibleTodosContext } from '../Contexts/VisibleTodosContext'
import { useTodoStore, useUserStore } from '../state/store'
import dayjs from 'dayjs'
import { SearchBarVisibility } from '../Contexts/SearchBarVisibilityContext'
import TodoModel from '../models/todoModel'

export default function TodoCategoriesList() {
	const todoState = useTodoStore((state) => state)
	const userState = useUserStore((state) => state)
	const [startingTodos, setStartingTodos] = useState<TodoModel[]>([])
	const { searchTerm, setSearchTerm } = useContext(SearchBarVisibility)
	const [activeCategory, setActiveCategory] = useState<string>('All')
	const categories = [
		'All',
		'Urgent',
		'Overdue',
		'Due Today',
		'Due This Week',
		'Completed'
	]

	const todosDueToday = todoState.todos.filter((todo) => {
		const today = dayjs()
		const todoDate = dayjs(todo.dueDate)
		return today.isSame(todoDate, 'day')
	})

	const todosDueThisWeek = todoState.todos.filter((todo) => {
		const today = dayjs()
		const todoDate = dayjs(todo.dueDate)
		return today.isSame(todoDate, 'week')
	})

	const todosOverdue = todoState.todos.filter((todo) => {
		const today = dayjs()
		const todoDate = dayjs(todo.dueDate)
		return today.isAfter(todoDate, 'day')
	})

	const searchedTodos = todoState.todos.filter((todo) => {
		todo.title.includes(searchTerm)
	})

	const handleCategoryClick = (category: string) => {
		if (searchTerm) {
			todoState.setTodos(searchedTodos)
			return
		}

		switch (category) {
			case 'All':
				todoState.initializeStore(userState.user?.uid!)
				setActiveCategory('All')
				break
			case 'Urgent':
				todoState.setTodos(todoState.todos.filter((todo) => todo.isUrgent))
				setActiveCategory('Urgent')
				break
			case 'Overdue':
				todoState.setTodos(todosOverdue)
				setActiveCategory('Overdue')
				break
			case 'Due Today':
				todoState.setTodos(todosDueToday)
				setActiveCategory('Due Today')
				break
			case 'Due This Week':
				todoState.setTodos(todosDueThisWeek)
				setActiveCategory('Due This Week')
				break
			case 'Completed':
				todoState.setTodos(todoState.todos.filter((todo) => todo.completed))
				setActiveCategory('Completed')
				break
			default:
				todoState.initializeStore(userState.user?.uid!)
				setActiveCategory('All')
		}
	}

	return (
		<div className='p-2 grid grid-cols-3 gap-4 '>
			{categories.map((category) => (
				<div
					key={category}
					className='flex items-center justify-center p-1 h-20 shadow-lg hover:scale-105 active:scale-95 rounded-md'
					style={{
						outline: `1px solid ${activeCategory === category ? '#7f9cf5' : '#ddd'}`
					}}
					onClick={() => handleCategoryClick(category)}>
					<h1 className='font-light'>{category}</h1>
				</div>
			))}
		</div>
	)
}
