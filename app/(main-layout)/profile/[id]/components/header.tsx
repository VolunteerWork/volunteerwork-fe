'use client'

import personsApi from '@/apis/persons'
import images from '@/assets/images'
import Crown from '@/components/icons/crown'
import Point from '@/components/icons/point'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import useAuth from '@/hooks/use-auth'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDocumentTitle } from 'usehooks-ts'

export default function Header() {
	const { id } = useParams<{ id: string }>()

	const { accountInfo } = useAuth()

	const { data, error, isLoading, isSuccess } = useQuery({
		queryKey: queryKeys.accountInfo.gen(id),
		queryFn: () => personsApi.getInfo(id),
	})

	useEffect(() => {
		if (error || (isSuccess && !data)) {
			notFound()
		}
	}, [data, error, isSuccess])

	useDocumentTitle(data?.name || 'Trang cá nhân', {
		preserveTitleOnUnmount: false,
	})

	return (
		<>
			{data && (
				<header className='bg-slate-50 pb-8'>
					<div className='container'>
						<div className='sm:h-[18.75rem] h-[15rem] relative'>
							<Image
								src={images.cover}
								alt='background image'
								fill
								priority
								className='object-cover h-full object-bottom rounded-b-3xl'
							/>

							<Image
								src={data.avatarUrl}
								alt='avatar'
								width={200}
								height={200}
								className='object-cover object-center absolute bottom-0 translate-y-1/2 sm:h-[11.25rem] sm:w-[11.25rem] w-[7rem] h-[7rem] left-1/2 -translate-x-1/2 border-[0.625rem] border-white border-solid rounded-full box-content'
							/>
						</div>

						<div className='flex flex-col items-center sm:mt-[6.8rem] mt-[5rem] sm:gap-3 gap-1'>
							<div className='flex gap-3 items-center'>
								<h1 className='sm:text-3xl text-xl font-semibold'>
									{data.name}
								</h1>
								{true && <Crown className='sm:w-10 w-6 relative sm:-top-1' />}
							</div>

							<div className='flex items-center mb-4'>
								<p className='font-medium'>{data.totalPoints}</p>
								<Point className='h-3 ml-2' />
							</div>

							{data._id == accountInfo?._id && (
								<Button variant={'secondary'}>
									<Link href={routes.settings}>Chỉnh sửa thông tin</Link>
								</Button>
							)}
						</div>
					</div>
				</header>
			)}

			{isLoading && (
				<header className='bg-slate-50 pb-8'>
					<div className='container'>
						<div className='sm:h-[18.75rem] h-[15rem] relative'>
							<Skeleton className='w-full h-full rounded-b-3xl' />

							<Skeleton className='absolute bottom-0 translate-y-1/2 sm:h-[11.25rem] sm:w-[11.25rem] w-[7rem] h-[7rem] left-1/2 -translate-x-1/2 border-[0.625rem] border-white border-solid rounded-full box-content' />
						</div>

						<div className='flex flex-col items-center sm:mt-[6.8rem] mt-[5rem] sm:gap-3 gap-1'>
							<div className='flex gap-3 items-center'>
								<Skeleton className='sm:h-9 h-7 w-36'></Skeleton>
							</div>

							<div className='flex items-center mb-4'>
								<Skeleton className='h-5'></Skeleton>
							</div>
						</div>
					</div>
				</header>
			)}
		</>
	)
}
