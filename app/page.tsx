'use client'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import TodoList from './Components/TodoList'
import TopBar from './Components/TopBar'
import { useTodoStore, useUserStore } from './state/store'
import { useRouter } from 'next/navigation'
import { getTodos } from '@/firebase/todoServices'
import TodoCategoriesList from './Components/TodoCategoriesList'
import { VisibleTodosContext } from './Contexts/VisibleTodosContext'
import TodoModel from './models/todoModel'
import { SearchBarVisibility } from './Contexts/SearchBarVisibilityContext'

export default function Home() {
	const router = useRouter()
	const user = useUserStore((state) => state.user)
	const todoState = useTodoStore((state) => state)
	const [visibleTodos, setVisibleTodos] = useState<TodoModel[]>([])
	const visibleTodosContext = { visibleTodos, setVisibleTodos }
	const [searchBarVisibility, setSearchBarVisibility] = useState<boolean>(false)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const searchBarVisibilityContext = {
		searchBarVisibility,
		setSearchBarVisibility,
		searchTerm,
		setSearchTerm
	}

	useEffect(() => {
		if (!user?.uid) {
			router.push('/login')
		}

		if (user?.uid) {
			const handleGetData = async () => {
				todoState.initializeStore(await getTodos(user!.uid).then((todos) => todos))
			}
			handleGetData()
		}
	}, [todoState.todos])

	useEffect(() => {
		if (searchTerm) {
			setVisibleTodos(
				todoState.todos.filter((todo) =>
					todo.title.toLowerCase().includes(searchTerm)
				)
			)
		}
	}, [searchTerm])

	return (
		<SearchBarVisibility.Provider value={searchBarVisibilityContext}>
			<VisibleTodosContext.Provider value={visibleTodosContext}>
				<div className='flex flex-col h-screen'>
					<TopBar />

					{searchBarVisibility && (
						<div className='p-2 flex justify-center items-center'>
							<input
								value={searchTerm}
								type='text'
								placeholder='Search'
								className='w-11/12 text-lg border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-400'
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					)}

					{!searchTerm && (
						<div>
							<TodoCategoriesList />
						</div>
					)}

					<div className='p-2'>
						<TodoList />
					</div>
				</div>
			</VisibleTodosContext.Provider>
		</SearchBarVisibility.Provider>
	)
}
