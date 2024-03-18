'use client'
import MinTopBar from '@/app/Components/MinTopBar'
import { useTodoStore, useUserStore } from '@/app/state/store'
import { removeTodo, updateTodo } from '@/firebase/todoServices'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TodoPage() {
	const pathName = usePathname()
	const id = pathName.split('/')[2]
	const router = useRouter()
	const todoState = useTodoStore((state) => state)
	const userState = useUserStore((state) => state)
	const currentTodo = todoState.todos.find((todo) => todo.id === id)
	const [title, setTitle] = useState<string>(currentTodo!.title)
	const [description, setDescription] = useState<string | undefined>(
		currentTodo?.description
	)
	const [dueDate, setDueDate] = useState<string>(currentTodo!.dueDate)
	const [isUrgent, setIsUrgent] = useState<boolean>(currentTodo!.isUrgent)

	const handleDelete = async () => {
		await removeTodo(id).then(() => {
			todoState.removeTodo(id)
			router.push('/')
		})
	}

	const handleUpdateTodo = async () => {
		await updateTodo(id, {
			id,
			uid: userState.user?.uid!,
			title,
			description,
			dueDate,
			isUrgent,
			completed: currentTodo!.completed
		}).then(() => {
			todoState.updateTodo(id, {
				id,
				uid: userState.user?.uid!,
				title,
				description,
				dueDate,
				isUrgent,
				completed: currentTodo!.completed
			})
			router.push('/')
		})
	}

	useEffect(() => {
		if (!userState.user?.uid) {
			router.push('/login')
		}
	})

	return (
		<div className='h-screen flex flex-col'>
			<MinTopBar heading='Edit A Todo' />
			<form className='flex flex-col justify-center items-start p-2 gap-12'>
				<div className='w-full flex flex-col gap-5 justify-center p-1'>
					<input
						className='w-full h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-400'
						placeholder='Todo Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className='w-full gap-8 flex flex-row justify-between'>
					<div className='w-full flex flex-col justify-center'>
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

				<div className='flex justify-center items-center gap-2'>
					<input
						type='checkbox'
						id='vehicle1'
						name='vehicle1'
						checked={isUrgent}
						onChange={(e) => setIsUrgent(e.target.checked)}
					/>
					<label htmlFor='vehicle1'>Mark as Urgent</label>
				</div>

				<div className='w-full flex flex-col gap-5 justify-center p-1'>
					<textarea
						className='w-full h-80 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-400'
						placeholder='Short Description or extra details'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</form>

			<div className='flex justify-between gap-2 p-4 items-center'>
				<button
					onClick={() => handleDelete()}
					className='w-full bg-red-400 text-white text-xl h-12 rounded-md focus:outline-none hover:bg-red-500 active:bg-red-600 transition-colors duration-300 ease-in-out'>
					Delete
				</button>
				<button
					className='w-full bg-indigo-400 text-white text-xl h-12 rounded-md focus:outline-none hover:bg-indigo-500 transition-colors duration-300 ease-in-out'
					onClick={() => handleUpdateTodo()}>
					Confirm Changes
				</button>
			</div>
		</div>
	)
}
