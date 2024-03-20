'use client'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { IoMdSearch } from 'react-icons/io'
import { IoPower } from 'react-icons/io5'
import { SearchBarVisibility } from '../Contexts/SearchBarVisibilityContext'
import { useContext } from 'react'
import { useTodoStore, useUserStore } from '../state/store'
import { signOutUser } from '@/firebase/userServices'
import { useRouter } from 'next/navigation'

export default function TopBar() {
	const userState = useUserStore((state) => state)
	const todoState = useTodoStore((state) => state)
	const router = useRouter()
	const { searchBarVisibility, setSearchBarVisibility } =
		useContext(SearchBarVisibility)

	const handleLogout = async () => {
		await signOutUser().then(() => {
			userState.logout()
			todoState.clearStore()
			router.push('/login')
		})
	}
	return (
		<div className='flex flex-row justify-between items-center h-12 p-4 bg-indigo-400 text-white'>
			<Link href='/'>
				<Image priority src='/logo.png' alt='logo' width={42} height={42} />
			</Link>

			<div className='flex flex-row justify-center items-center gap-6'>
				<button>
					<Link href='/newtodo'>
						<HiOutlinePlusSm className='h-8 w-8' />
					</Link>
				</button>

				<button
					onClick={() => {
						setSearchBarVisibility(!searchBarVisibility)
					}}>
					<IoMdSearch className='h-6 w-6' />
				</button>

				<button onClick={() => handleLogout()}>
					<IoPower className='h-6 w-6' />
				</button>
			</div>
		</div>
	)
}
