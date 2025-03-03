'use client'

import participantsApi from '@/apis/participants'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useIntersectionObserver } from 'usehooks-ts'

export default function Activities() {
	const { id } = useParams<{ id: string }>()

	const { ref, isIntersecting } = useIntersectionObserver({
		threshold: 0,
		freezeOnceVisible: true,
	})

	const { data } = useQuery({
		queryKey: queryKeys.personActivities.gen(id),
		queryFn: () => participantsApi.getActivities(id),
	})

	return (
		<div className='w-full'>
			<h2 className='font-bold text-xl w-full mb-16'>Hoạt động gần đây</h2>
			{data && <div ref={ref} />}
			<div className='max-w-[40rem] mx-auto pl-8 md:pl-24 py-4 relative before:content-[""] before:block before:w-0.5 before:h-full before:rounded-full before:bg-slate-200 before:absolute before:top-0 before:left-0 space-y-16'>
				{data &&
					data.map((activity, index) => (
						<div
							key={index}
							style={{
								transitionDelay: index * 200 + 'ms',
							}}
							className={cn(
								'w-full py-6 px-6 pr-8 border border-slate-200 rounded-2xl relative before:content-[""] before:block before:absolute before:h-px before:w-8 md:before:w-24 before:right-full before:top-1/3 before:bg-slate-200 after:content-[""] after:block after:absolute after:h-3 after:w-3 after:rounded-full after:bg-primary-400 after:top-1/3 after:-translate-y-1/2 after:-left-8 md:after:-left-24 after:-translate-x-1/2 flex transition translate-x-36 opacity-0 duration-500 ease-out',
								isIntersecting && 'opacity-100 translate-x-0',
							)}
						>
							<Link
								href={routes.organizations.gen(activity.volunteerWorkId._id)}
							>
								<Image
									alt='banner'
									src={activity.volunteerWorkId.imageUrl}
									width={64}
									height={64}
									className='w-16 h-16 object-cover rounded-xl'
								/>
							</Link>
							<div className='ml-6 flex flex-col'>
								<h4 className='font-medium text-base'>
									<Link
										href={routes.organizations.gen(
											activity.volunteerWorkId._id,
										)}
									>
										{activity.volunteerWorkId.title}{' '}
									</Link>
									<small className='font-normal'>
										({format(new Date(activity.createdAt), 'dd/MM/yyyy')})
									</small>
								</h4>
								<span className='text-xs bg-slate-100 px-2 rounded-md w-fit font-medium py-px mb-2'>
									Đã tham gia
								</span>
								<span className='text-sm'>
									Điểm đánh giá: {activity.rating}
								</span>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}
