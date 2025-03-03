import routes from '@/configs/routes'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
	withText?: boolean
	textWhite?: boolean
	className?: string
}

export default function Logo({
	withText = true,
	textWhite,
	className,
}: LogoProps) {
	return (
		<Link
			href={routes.home}
			className={cn('inline-flex items-center', className)}
		>
			<Image
				alt='logo'
				src={'/images/logo.png'}
				width={515}
				height={512}
				className='h-10 w-auto'
			/>
			{withText && (
				<div
					className={cn(
						'ml-3 flex flex-col tracking-wide',
						textWhite && 'text-white',
					)}
				>
					<span className='font-extrabold text-lg leading-[1]'>Volunteer</span>
					<span className='font-semibold text-sm leading-[1]'>Connect</span>
				</div>
			)}
		</Link>
	)
}
