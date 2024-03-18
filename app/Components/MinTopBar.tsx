'use client'
import { useRouter } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'

interface MinTopBarProps {
	heading: string
}

export default function MinTopBar({ heading }: MinTopBarProps) {
	const router = useRouter()
	return (
		<div className='bg-indigo-400 h-12 p-2'>
			<h1 className='text-white text-center text-2xl'>{heading}</h1>

			<div className='relative ' style={{ top: '-99.9%', filter: 'invert(100%)' }}>
				<MdArrowBack className='w-9 h-9' onClick={() => router.back()} />
			</div>
		</div>
	)
}
