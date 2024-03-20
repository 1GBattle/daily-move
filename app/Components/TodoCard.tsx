'use client'
import TodoModel from '../models/todoModel'
import { FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { useTodoStore } from '../state/store'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

interface TodoCardProps {
	todo: TodoModel
}

export default function TodoCard({ todo }: TodoCardProps) {
	const todoState = useTodoStore((state) => state)
	const router = useRouter()
	const [isCompleted, setIsCompleted] = useState<boolean>(todo.completed)

	const handleDelete = async (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.stopPropagation()
		e.nativeEvent.stopImmediatePropagation()
		e.preventDefault()
		await todoState.removeTodo(todo.id)
	}

	const handleToggleCompelted = async (e: ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation()
		e.nativeEvent.stopImmediatePropagation()
		e.preventDefault()
		await todoState
			.updateTodo(todo.id, {
				...todo,
				completed: !isCompleted
			})
			.then(() => router.push('/'))

		setIsCompleted(!todo.completed)
	}

	return (
		<div
			onClick={() => router.push(`/todo/${todo.id}`)}
			className='shadow-md w-full h-16 p-2 hover:shadow-lg'>
			<div className='flex flex-row gap-2 mr-2 items-center'>
				<input
					className='h-5 w-5 accent-indigo-500 '
					type='checkbox'
					checked={isCompleted}
					onChange={(e) => handleToggleCompelted(e)}
				/>

				<h1
					className={`w-60 font-medium text-lg overflow-hidden whitespace-nowrap text-ellipsis ${isCompleted ? 'line-through text-gray-400' : null} `}>
					{todo.title}
				</h1>

				<div className='flex flex-row items-center -m-1'>
					<p>{dayjs(todo.dueDate).format('MM/D')}</p>

					<button onClick={(e) => handleDelete(e)}>
						<FaTrash className='ml-4 h-4 w-4' />
					</button>
				</div>
			</div>

			<div>
				<p className='`w-60 font-light text-sm overflow-hidden whitespace-nowrap text-ellipsis'>
					{todo.description ? todo.description : 'No Description Provided'}
				</p>
			</div>
		</div>
	)
}
