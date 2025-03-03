'use client'

import organizationsApi from '@/apis/organizations'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import queryKeys from '@/configs/query-keys'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useDocumentTitle } from 'usehooks-ts'

export default function Overview() {
	const { id } = useParams<{ id: string }>()

	const { data, isLoading, error, isSuccess } = useQuery({
		queryKey: queryKeys.accountInfo.gen(id),
		queryFn: () => organizationsApi.getInfo(id),
	})

	useEffect(() => {
		if (error || (isSuccess && data == null)) {
			console.log('123')
			notFound()
		}
	}, [error, data, isSuccess])

	useDocumentTitle(data?.name || 'Trang tổ chức', {
		preserveTitleOnUnmount: false,
	})

	return (
		<>
			{isLoading && (
				<section className='border border-slate-100 rounded-2xl px-4 md:px-6 xl:px-4 py-6 flex items-center flex-col'>
					<Skeleton className='w-20 h-20 rounded-full object-cover' />
					<Skeleton className='h-6 mx-auto w-36 mt-2 max-w-full' />
					<Skeleton className='mt-3 h-5 mx-auto w-64 max-w-full' />
					<Separator className='my-4' />

					<h4 className='text-sm font-medium w-full mb-3'>Thông tin liên hệ</h4>

					<div className='space-y-1 w-full'>
						<Skeleton className='w-full h-4' />
						<Skeleton className='w-full h-4' />
						<Skeleton className='w-[80%] h-4' />
					</div>
				</section>
			)}
			{data && (
				<section className='border border-slate-100 rounded-2xl px-4 md:px-6 xl:px-4 py-6 flex items-center flex-col'>
					<Image
						alt='avatar'
						src={data.avatarUrl}
						width={80}
						height={80}
						className='w-20 h-20 rounded-full object-cover'
					/>
					<h3 className='text-base font-semibold line-clamp-2 text-center mt-2'>
						{data.name}
					</h3>
					<p className='mt-3 text-sm text-center'>{data.affiliatedUnit}</p>
					<Separator className='my-4' />

					<h4 className='text-sm font-medium w-full mb-3'>Thông tin liên hệ</h4>

					<div
						className='prose w-full prose-sm prose-p:!m-0 line-clamp-5'
						dangerouslySetInnerHTML={{ __html: data.contactInfo }}
					></div>
				</section>
			)}
		</>
	)
}
