import { Metadata } from 'next'
import List from './components/list'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Hoạt động tình nguyện',
}

export default function ExploreWorksPage() {
	return (
		<div className='container py-16'>
			<h2 className='text-3xl font-bold mb-14 text-center'>
				Các hoạt động tình nguyện
			</h2>

			<Suspense>
				<List />
			</Suspense>
		</div>
	)
}
