'use client'

import organizationsApi from '@/apis/organizations'
import images from '@/assets/images'
import { Skeleton } from '@/components/ui/skeleton'
import queryKeys from '@/configs/query-keys'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function Top() {
	const { id } = useParams<{ id: string }>()

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.accountInfo.gen(id),
		queryFn: () => organizationsApi.getInfo(id),
	})

	return (
		<>
			{isLoading && (
				<div className='mb-8'>
					<Skeleton className='aspect-w-16 -z-[1] max-lg:aspect-h-8 max-sm:aspect-w-16 aspect-h-5 mb-4 rounded-2xl' />
					<div className='flex items-end max-lg:items-center max-lg:flex-col -mt-20 lg:ml-10'>
						<Skeleton className='w-36 h-36 rounded-full object-cover' />
						<div className='lg:ml-4 max-lg:mt-4'>
							<Skeleton className='h-8 max-lg:mx-auto w-[28rem] max-w-full' />

							<Skeleton className='mt-2 max-lg:mx-auto h-6 w-96 max-w-full' />
						</div>
					</div>
				</div>
			)}
			{data && (
				<div className='mb-8'>
					<div className='aspect-w-16 -z-[1] aspect-h-10 sm:aspect-h-9 md:aspect-h-6 lg:aspect-h-5 mb-4'>
						<Image
							alt='banner'
							src={images.cover}
							width={2048}
							height={2048}
							className='w-full h-full object-cover rounded-2xl'
						/>
					</div>

					<div className='flex items-end max-lg:items-center max-lg:flex-col -mt-20 lg:ml-10'>
						<Image
							alt='avatar'
							src={data.avatarUrl}
							width={144}
							height={144}
							className='w-36 h-36 rounded-full object-cover'
						/>
						<div className='lg:ml-4 max-lg:mt-4'>
							<h1 className='text-2xl font-semibold max-lg:text-center'>
								{data.name}
							</h1>

							<h2 className='mt-2 max-lg:text-center'>{data.affiliatedUnit}</h2>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
