'use client'
import { VisibleTodosContext } from '../Contexts/VisibleTodosContext'
import TodoCard from './TodoCard'
import { useContext } from 'react'

export default function TodoList() {
	const { visibleTodos } = useContext(VisibleTodosContext)
	const data = visibleTodos

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
