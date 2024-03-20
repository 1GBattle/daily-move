'use client'
import { useContext, useEffect, useState } from 'react'
import { VisibleTodosContext } from '../Contexts/VisibleTodosContext'
import { useTodoStore } from '../state/store'
import dayjs from 'dayjs'
import { SearchBarVisibility } from '../Contexts/SearchBarVisibilityContext'

export default function TodoCategoriesList() {
	const todoState = useTodoStore((state) => state)
	const { visibleTodos, setVisibleTodos } = useContext(VisibleTodosContext)
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
			setVisibleTodos(searchedTodos)
			return
		}

		switch (category) {
			case 'All':
				setVisibleTodos(todoState.todos)
				setActiveCategory('All')
				break
			case 'Urgent':
				setVisibleTodos(todoState.todos.filter((todo) => todo.isUrgent))
				setActiveCategory('Urgent')
				break
			case 'Overdue':
				setVisibleTodos(todosOverdue)
				setActiveCategory('Overdue')
				break
			case 'Due Today':
				setVisibleTodos(todosDueToday)
				setActiveCategory('Due Today')
				break
			case 'Due This Week':
				setVisibleTodos(todosDueThisWeek)
				setActiveCategory('Due This Week')
				break
			case 'Completed':
				setVisibleTodos(todoState.todos.filter((todo) => todo.completed === true))
				setActiveCategory('Completed')
				break
			default:
				setVisibleTodos(todoState.todos)
				setActiveCategory('All')
		}
	}

	useEffect(() => {
		setVisibleTodos(todoState.todos)
	}, [todoState.todos])

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
