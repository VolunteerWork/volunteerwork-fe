import Logo from '@/components/logo'
import SignUpForm from './components/sign-up-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Metadata } from 'next'
import RightImage from './components/right-image'

export const metadata: Metadata = {
	title: 'Đăng ký',
}

export default function SignUpPage() {
	return (
		<div className='flex lg:h-screen items-stretch justify-center'>
			<ScrollArea className='xl:w-[55%] lg:w-[52%] md:w-10/12 w-full'>
				<div className='xl:px-32 sm:px-8 px-4 md:px-16 py-12'>
					<Logo />

					<div className='mt-8'>
						<SignUpForm />
					</div>
				</div>
			</ScrollArea>
			<div className='flex-1 flex items-center max-lg:hidden bg-primary-50 overflow-hidden'>
				<RightImage />
			</div>
		</div>
	)
}
