'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useUserStore } from '../state/store'
import { useState } from 'react'
import { loginUserWithGoogle, signUpUser } from '@/firebase/userServices'
import UserModel from '../models/userModel'
import { useRouter } from 'next/navigation'

export default function () {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [userName, setUserName] = useState('')
	const router = useRouter()
	const userState = useUserStore((state) => state)

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await signUpUser(email, password, userName).then(
			(user: UserModel | Error | null) => {
				if (user instanceof Error || user === null) {
					console.log(user!.message)
					return
				} else {
					userState.setUser(user)
					router.push('/')
				}
			}
		)
	}

	const handleGoogleLogin = () => {
		loginUserWithGoogle().then((user) => {
			if (user instanceof Error || user === null) {
				console.log(user!.message)
				return
			} else {
				userState.setUser(user)
				router.push('/')
			}
		})
	}

	return (
		<div className='h-screen flex gap-14 flex-col justify-center items-center'>
			<div className='flex flex-col justify-center items-center'>
				<Image priority src='/logo.png' alt='logo' width={180} height={180} />
				<h2 className='text-xl mt-8 text-center'>
					Welcome to Daily Move, sign up to continue
				</h2>
			</div>
			<form
				className='w-full flex flex-col items-center gap-12'
				onSubmit={(e) => handleSignUp(e)}>
				<div>
					<input
						className='w-80 h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-400'
						type='text'
						id='userName'
						name='userName'
						placeholder='User Name'
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div>
					<input
						className='w-80 h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-400'
						type='text'
						id='email'
						name='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<input
						className='w-80 h-12 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-400'
						type='password'
						id='password'
						name='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<button
						className='w-80 bg-indigo-400 text-white text-xl h-12 rounded-md focus:outline-none hover:bg-indigo-500 transition-colors duration-300 ease-in-out'
						type='submit'>
						Sign Up
					</button>
					<p className='text-center text-sm'>
						Already have an account? Click{' '}
						<Link className='text-indigo-400' href='/login'>
							here
						</Link>
					</p>
				</div>
			</form>

			<div>
				<button onClick={() => handleGoogleLogin()}>
					<Image
						className='w-80 -mt-8 h-16 rounded-md focus:outline-none hover:bg-indigo-500 transition-colors duration-300 ease-in-out'
						src='/google-signin.png'
						width={200}
						height={200}
						alt='google signin button'
					/>
				</button>
			</div>
		</div>
	)
}
