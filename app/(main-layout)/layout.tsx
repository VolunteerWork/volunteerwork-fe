import Header from '@/components/header'
import Footer from '@/components/footer'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<div className='pt-[6rem] pb-32 flex-1'>{children}</div>
			<Footer />
		</div>
	)
}
