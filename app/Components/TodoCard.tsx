import { FcClock } from 'react-icons/fc'
import TodoModel from '../models/todoModel'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { removeTodo, updateTodo } from '@/firebase/todoServices'
import { useTodoStore } from '../state/store'
import { MouseEvent, useState } from 'react'
import dayjs from 'dayjs'

interface TodoCardProps {
	todo: TodoModel
}

export default function TodoCard({ todo }: TodoCardProps) {
	const todoState = useTodoStore((state) => state)
	const [isCompleted, setIsCompleted] = useState<boolean>(todo.completed)

	const handleDelete = async (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.stopPropagation()

		await removeTodo(todo.id).then(() => {
			todoState.removeTodo(todo.id)
		})
	}

	const handleToggleCompelted = async () => {
		await updateTodo(todo.id, {
			...todo,
			completed: !isCompleted
		}).then(() => {
			todoState.updateTodo(todo.id, {
				...todo,
				completed: !isCompleted
			})

			setIsCompleted(!todo.completed)
		})
	}

	return (
		<Link
			href={`/todo/${todo.id}`}
			className='shadow-md w-full h-16 p-2 hover:shadow-lg'>
			<div className='flex flex-row gap-2 mr-2 items-center'>
				<input
					className='h-5 w-5 accent-indigo-500 '
					type='checkbox'
					checked={isCompleted}
					onChange={() => handleToggleCompelted()}
				/>
				<h1
					className={`w-60 font-medium text-lg overflow-hidden whitespace-nowrap text-ellipsis ${isCompleted ? 'line-through text-gray-400' : null} `}>
					{todo.title}
				</h1>
				<div className='flex flex-row items-center -m-1'>
					{/* <FcClock className='mr-1' /> */}
					<p>{dayjs(todo.dueDate).format('MM/D')}</p>
					<button onClick={(e) => handleDelete(e)}>
						<FaTrash className='ml-4 h-6 w-6' />
					</button>
				</div>
			</div>

			<div>
				<p className='`w-60 font-light text-sm overflow-hidden whitespace-nowrap text-ellipsis'>
					{todo.description ? todo.description : 'No Description Provided'}
				</p>
			</div>
		</Link>
	)
}
