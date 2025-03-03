'use client'

import images from '@/assets/images'
import ConcentricCircles from '@/components/concentric-circles'
import { Button } from '@/components/ui/button'
import routes from '@/configs/routes'
import useAuth from '@/hooks/use-auth'
import { ArrowRight } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Introduction() {
	const { isLoggedIn } = useAuth()

	return (
		<section className='py-16 relative overflow-hidden'>
			<div className='container'>
				<div className='flex'>
					<div className='lg:w-1/2'>
						<h2 className='text-4xl tracking-wide'>
							<span className='font-extrabold text-primary-500'>
								Volunteer{' '}
							</span>

							<span className='font-bold'>Connect</span>
						</h2>
						<h3 className='mt-3 text-base text-slate-700'>
							Kết nối trái tim, kết nối hành động
						</h3>
						<p className='font-extralight mt-6'>
							Lorem ipsum dolor sit amet consectetur. Diam sagittis ut sit
							interdum pellentesque urna vivamus eget ornare. Posuere bibendum
							sed volutpat tortor sapien. Feugiat hac tortor id nec quis odio
							bibendum. Felis hac pulvinar bibendum vel arcu in.
						</p>

						{isLoggedIn ? (
							<div className='h-20'></div>
						) : (
							<Button variant='secondary' className='mt-12 group' asChild>
								<Link href={routes.logIn}>
									Tham gia ngay
									<ArrowRight className='ml-2 h-5 transition-all mr-2 group-hover:ml-4 group-hover:mr-0 ease-out' />
								</Link>
							</Button>
						)}
					</div>
					<div className='lg:flex-1 max-lg:hidden'>
						<Image
							alt='home'
							src={images.homeBanner}
							className='w-8/12 h-auto ml-auto transition hover:scale-[1.02] ease-in'
						/>
					</div>
				</div>
			</div>

			<div className='w-0 h-0 shadow-[0_0_8rem_4rem] shadow-primary-300/50 absolute top-[30%] left-[40%] z-[-1]'></div>
			<div className='w-0 h-0 shadow-[0_0_12rem_6rem] shadow-primary-300/75 absolute top-[60%] right-[20%] z-[-1]'></div>
			<ConcentricCircles className='absolute -right-[10rem] top-8 z-[-2]' />
		</section>
	)
}
