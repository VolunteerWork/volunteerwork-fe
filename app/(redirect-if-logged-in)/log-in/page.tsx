import Logo from '@/components/logo'
import LogInForm from './components/log-in-form'
import RightImage from './components/right-image'
import { Metadata } from 'next'
import lottieAnimations from '@/assets/lottie-animations'
import LottieAnimation from '@/components/lottie-animation'

export const metadata: Metadata = {
	title: 'Đăng nhập',
}

export default function LoginPage() {
	return (
		<div className='flex h-screen items-stretch justify-center'>
			<div className='lg:w-6/12 xl:w-5/12 md:w-8/12 w-full px-4 sm:px-16 py-12'>
				<Logo />

				<div className='mt-8'>
					<LogInForm />
				</div>
			</div>
			<div className='flex-1 flex items-center max-lg:hidden bg-slate-50 overflow-hidden'>
				<RightImage />
			</div>
		</div>
	)
}
