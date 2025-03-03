'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import { ArrowRight } from 'iconsax-react'

import { Button } from '@/components/ui/button'
import ConcentricCircles from '@/components/concentric-circles'
import images from '@/assets/images'
import routes from '@/configs/routes'
import useAuth from '@/hooks/use-auth'

function Introduce() {
	const { isLoggedIn } = useAuth()

	return (
		<div className='container relative'>
			<p className='font-bold lg:text-4xl text-2xl text-center md:pb-16 pb-12 uppercase'>
				Về chúng tôi
			</p>

			<div className='grid grid-cols-[40%_60%] w-full max-lg:grid-cols-1 gap-y-5 max-sm:gap-y-2'>
				<div className='flex flex-col lg:gap-7 gap-4'>
					<header className='lg:text-4xl sm:text-3xl text-2xl'>
						<span className='font-extrabold text-primary-400'>Volunteer</span>
						&nbsp;
						<span className='font-bold'>Connect</span>
					</header>

					<div className='font-light flex flex-col gap-2'>
						<p>
							Một website được phát triển nhằm quản lý hiệu quả các hoạt động
							tình nguyện dành cho sinh viên.
						</p>
						<p>
							Chúng tôi cung cấp nền tảng cho sinh viên, tổ chức và các bên liên
							quan khác dễ dàng kết nối, tìm kiếm và tham gia các hoạt động tình
							nguyện phù hợp.
						</p>
					</div>
					{isLoggedIn ? (
						<div className='h-4'></div>
					) : (
						<Button variant='secondary' className='group w-fit mt-2' asChild>
							<Link href={routes.logIn}>
								Tham gia ngay
								<ArrowRight className='ml-2 h-5 transition-all mr-2 group-hover:ml-4 group-hover:mr-0 ease-out' />
							</Link>
						</Button>
					)}
				</div>

				<div className='h-full w-full flex justify-center items-center'>
					<div
						className={cn(
							'bg-primary-200 rounded-3xl rounded-br-[3rem] relative my-[4rem]',
							'w-[22rem] h-[14rem] max-xl:w-[18rem] max-xl:h-[12rem] max-sm:w-[12rem] max-sm:h-[8rem]',
						)}
					>
						<Image
							src={images.about1}
							alt='About 1'
							height={512}
							width={512}
							className='absolute top-1/3 right-1/4 rounded-xl z-10'
						/>
						<Image
							src={images.about2}
							alt='About 2'
							height={512}
							width={512}
							className='absolute -top-1/4 left-1/3 rounded-xl'
						/>
					</div>
				</div>
			</div>

			<div className='w-0 h-0 shadow-[0_0_8rem_4rem] shadow-primary-300/50 absolute top-[20%] left-0 z-[-1]'></div>
			<div className='w-0 h-0 shadow-[0_0_8rem_4rem] shadow-primary-300/50 absolute top-[70%] left-[35%] z-[-1]'></div>
			<ConcentricCircles className='absolute -right-[8rem] sm:top-[15rem] z-[-2] top-[20rem] sm:scale-150' />
		</div>
	)
}

export default Introduce
