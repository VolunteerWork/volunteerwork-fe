'use client'

import useAuth from '@/hooks/use-auth'
import AskForm from './ask-form'
import List from './list'

export default function QNA() {
	const { isLoggedIn, isOrganization } = useAuth()

	return (
		<section className='max-w-[40rem] mx-auto'>
			<h3 className='font-semibold text-lg mb-10'>Hỏi đáp</h3>

			<div className='mb-16'>
				{isLoggedIn && !isOrganization && <AskForm />}
				{!isLoggedIn && (
					<p className='rounded-lg py-6 px-4 bg-slate-100'>
						Vui lòng đăng nhập để đặt câu hỏi
					</p>
				)}
			</div>

			<List />
		</section>
	)
}
