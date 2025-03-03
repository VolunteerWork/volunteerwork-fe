'use client'

import volunteerWorksApi from '@/apis/volunteer-works'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Organization() {
	const { id } = useParams<{ id: string }>()

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	return (
		<>
			{data && (
				<section className='border border-slate-100 rounded-2xl px-4 md:px-6 xl:px-4 py-6 flex items-center flex-col'>
					<Image
						alt='avatar'
						src={data.organization.avatarUrl}
						width={80}
						height={80}
						className='w-20 h-20 rounded-full object-cover'
					/>
					<h3 className='text-base font-semibold line-clamp-2 text-center mt-2'>
						{data.organization.name}
					</h3>
					<p className='mt-3 text-sm text-center'>
						{data.organization.affiliatedUnit}
					</p>
					<Separator className='my-4' />

					<h4 className='text-sm font-medium w-full mb-3'>Thông tin liên hệ</h4>

					<div
						className='prose w-full prose-sm prose-p:!m-0 line-clamp-4'
						dangerouslySetInnerHTML={{ __html: data.organization.contactInfo }}
					></div>
					<Separator className='my-4' />
					<h4 className='text-sm font-medium w-full mb-3'>Mô tả</h4>

					<div
						className='prose w-full prose-sm prose-p:!m-0 line-clamp-3'
						dangerouslySetInnerHTML={{ __html: data.organization.description }}
					></div>

					<Button asChild className='group mt-6' size='sm' variant='outline'>
						<Link href={routes.organizations.gen(data.organization._id)}>
							Xem chi tiết
							<ArrowRight className='h-5 ml-2 transition-all mr-2 group-hover:ml-4 group-hover:mr-0 ease-out' />
						</Link>
					</Button>
				</section>
			)}

			{isLoading && (
				<section className='border border-slate-100 rounded-2xl px-4 md:px-6 xl:px-4 py-6 flex items-center flex-col'>
					<Skeleton className='w-20 h-20 rounded-full object-cover' />
					<Skeleton className='h-5 mx-auto w-48 max-w-full mt-2' />
					<Skeleton className='mt-3 h-5 w-full text-sm text-center' />
					<Separator className='my-4' />

					<h4 className='text-sm font-medium w-full mb-3'>Thông tin liên hệ</h4>

					<div className='space-y-1 w-full'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
					</div>
					<Separator className='my-4' />
					<h4 className='text-sm font-medium w-full mb-3'>Mô tả</h4>

					<div className='space-y-1 w-full'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
					</div>

					<Button className='group mt-6' size='sm' variant='outline'>
						Xem chi tiết
						<ArrowRight className='h-5 ml-2 transition-all mr-2 group-hover:ml-4 group-hover:mr-0 ease-out' />
					</Button>
				</section>
			)}
		</>
	)
}
