'use client'
import { VisibleTodosContext } from '../Contexts/VisibleTodosContext'
import TodoModel from '../models/todoModel'
import { useTodoStore } from '../state/store'
import TodoCard from './TodoCard'
import { useContext, useEffect, useState } from 'react'

export default function TodoList() {
	const { visibleTodos } = useContext(VisibleTodosContext)
	const todoState = useTodoStore((state) => state)
	const [data, setData] = useState([] as TodoModel[])

	useEffect(() => {
		setData(todoState.todos)
	}, [todoState.todos])

	return (
		<div className='flex flex-col gap-5 justify-center p-1'>
			{data.map((todo) => (
				<div className='flex flex-row justify-between' key={todo.id}>
					<TodoCard todo={todo} />
				</div>
			))}
		</div>
	)
}
