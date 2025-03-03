'use client'

import useAuth from '@/hooks/use-auth'
import { ReactNode } from 'react'

export default function Settings({
	organization,
	person,
}: {
	person: ReactNode
	organization: ReactNode
}) {
	const { isOrganization } = useAuth()

	return (
		<div className='container py-16'>
			<h1 className='text-3xl font-semibold text-center mb-16'>
				Cài đặt tài khoản
			</h1>

			<div className='max-w-[50rem] mx-auto'>
				{isOrganization ? organization : person}
			</div>
		</div>
	)
}
