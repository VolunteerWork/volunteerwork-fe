import Logo from '@/components/logo'
import { ReactNode } from 'react'

export default function EmptyLayout({ children }: { children: ReactNode }) {
	return (
		<div className='px-8 py-8 max-md:px-4'>
			<Logo />
			<div className='flex justify-center mt-16'>
				<div className='w-[26rem] max-w-full'>{children}</div>
			</div>
		</div>
	)
}
