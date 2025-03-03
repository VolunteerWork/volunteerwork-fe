'use client'

import personsApi from '@/apis/persons'
import images from '@/assets/images'
import queryKeys from '@/configs/query-keys'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function Quote({ className }: { className?: string }) {
	const { id } = useParams<{ id: string }>()

	const { data } = useQuery({
		queryKey: queryKeys.accountInfo.gen(id),
		queryFn: () => personsApi.getInfo(id),
	})

	return (
		data && (
			<div
				className={cn(
					className,
					'relative max-w-full min-h-[12rem] flex justify-center items-center py-[3.125rem] px-[2.25rem]',
				)}
			>
				<p className='text-xl italic text-center text-primary-500'>
					{data?.quote || "Do things at your own place. Life isn't a race."}
				</p>
				<Image
					src={images.quotes}
					alt=''
					className='absolute w-12 top-2 left-2'
				/>
				<Image
					src={images.quotes}
					alt=''
					className='absolute w-12 bottom-2 right-2'
				/>
				<Image
					src={images.quotesTopRight}
					alt=''
					className='absolute w-[80%]  top-0 right-0'
				/>
				<Image
					src={images.quotesBottomLeft}
					alt=''
					className='absolute w-[80%] bottom-0 left-0'
				/>
			</div>
		)
	)
}
