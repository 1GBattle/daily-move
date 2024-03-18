'use client'
import TodoModel from '../models/todoModel'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import MinTopBar from '../Components/MinTopBar'
import { useTodoStore, useUserStore } from '../state/store'
import { addTodo } from '@/firebase/todoServices'
import dayjs from 'dayjs'

export default function NewTodoPage() {
	const user = useUserStore((state) => state.user)
	const todoState = useTodoStore((state) => state)
	const router = useRouter()
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [dueDate, setDueDate] = useState<string>(new Date().toDateString())
	const [isUrgent, setIsUrgent] = useState<boolean>(false)

	const handleAddTodo = async () => {
		const todo: TodoModel = {
			id: uuid(),
			uid: user?.uid!,
			title: title,
			completed: false,
			isUrgent,
			dueDate,
			description
		}

		try {
			await addTodo(todo).then(() => {
				todoState.addTodo(todo)
				router.push('/')
			})
		} catch (error) {
			console.error('Error adding todo: ', error)
		}
	}

	useEffect(() => {
		if (!user?.uid) {
			router.push('/login')
		}
	}, [])

	return (
		<div className='h-screen flex flex-col gap-2'>
			<MinTopBar heading='Test' />
			<form className='flex flex-col justify-center items-start p-2 gap-12'>
				<div className='w-full flex flex-col gap-5 justify-center p-1'>
					<input
						className='w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-400'
						placeholder='Todo Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className='w-full gap-4'>
					<div className='flex flex-col justify-center'>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={['DatePicker']}>
								<DatePicker
									label='Due Date'
									value={dayjs(dueDate)}
									onChange={(e) => setDueDate(e!.toDate().toDateString())}
								/>
							</DemoContainer>
						</LocalizationProvider>
					</div>
				</div>

				<div className='flex justify-center items-center w-full gap-2'>
					<input
						type='checkbox'
						checked={isUrgent}
						onChange={() => setIsUrgent(!isUrgent)}
					/>
					<label>Mark as Urgent</label>
				</div>

				<div className='w-full flex flex-col gap-5 justify-center p-1'>
					<textarea
						className='w-full h-80 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-400'
						placeholder='Short Description or extra details (optional)'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</form>

			<div className='flex justify-center items-center gap-4 p-4'>
				<button
					onClick={() => handleAddTodo()}
					className='w-full bg-indigo-400 text-white text-2xl h-12 rounded-md focus:outline-none hover:bg-indigo-500 transition-colors duration-300 ease-in-out'>
					Add Todo
				</button>
			</div>
		</div>
	)
}
