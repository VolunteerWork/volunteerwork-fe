'use client'

import volunteerWorksApi from '@/apis/volunteer-works'
import { Skeleton } from '@/components/ui/skeleton'
import queryKeys from '@/configs/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function Information() {
	const { id } = useParams<{ id: string }>()

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	return (
		<div className='space-y-8 mx-auto max-w-[45rem]'>
			<section>
				<h3 className='font-semibold text-lg mb-4'>Giới thiệu</h3>

				{data && (
					<div
						className='prose prose-sm max-w-none'
						dangerouslySetInnerHTML={{ __html: data.description }}
					></div>
				)}
				{isLoading && (
					<div className='space-y-1'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
					</div>
				)}
			</section>

			<section>
				<h3 className='font-semibold text-lg mb-4'>Đối tượng tham gia</h3>

				{data && (
					<div
						className='prose prose-sm max-w-none'
						dangerouslySetInnerHTML={{ __html: data.requirements }}
					></div>
				)}

				{isLoading && (
					<div className='space-y-1'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
					</div>
				)}
			</section>

			<section>
				<h3 className='font-semibold text-lg mb-4'>Quyền lợi tham gia</h3>

				{data && (
					<div
						className='prose prose-sm max-w-none'
						dangerouslySetInnerHTML={{ __html: data.benefits }}
					></div>
				)}

				{isLoading && (
					<div className='space-y-1'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
					</div>
				)}
			</section>

			<section>
				<h3 className='font-semibold text-lg mb-4'>Thông tin liên hệ</h3>

				{data && (
					<div
						className='prose prose-sm max-w-none'
						dangerouslySetInnerHTML={{ __html: data.contactInfo }}
					></div>
				)}

				{isLoading && (
					<div className='space-y-1'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
					</div>
				)}
			</section>
		</div>
	)
}
