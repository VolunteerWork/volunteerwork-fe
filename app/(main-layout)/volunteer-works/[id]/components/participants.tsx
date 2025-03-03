'use client'

import participantsApi from '@/apis/participants'
import Point from '@/components/icons/point'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useIntersectionObserver } from 'usehooks-ts'

export default function Participants() {
	const { id } = useParams<{ id: string }>()

	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0,
		freezeOnceVisible: true,
	})

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.participantsByVolunteerWork.gen(id),
		queryFn: () =>
			participantsApi.getByVolunteerWork({
				volunteerWorkId: id,
			}),
	})

	return (
		<section>
			<h3 className='font-semibold text-lg mb-6'>Tình nguyện viên tham gia</h3>

			<div ref={ref} className='grid grid-cols-2 md:grid-cols-3 gap-5'>
				{data && data.length === 0 && (
					<p className='text-center'>Chưa có tình nguyện viên nào</p>
				)}

				{data &&
					data.filter(
						participant =>
							participant.status === 'ACCEPTED' ||
							participant.status === 'FINISH',
					).length > 0 &&
					data
						.filter(
							participant =>
								participant.status === 'ACCEPTED' ||
								participant.status === 'FINISH',
						)
						.map((participant, index) => (
							<div
								key={index}
								style={{
									transitionDelay: 200 * index + 'ms',
								}}
								className={cn(
									'flex flex-col items-center px-4 py-6 border border-slate-100 rounded-xl transition duration-500 ease-out translate-y-36 opacity-0',
									isIntersecting && 'translate-y-0 opacity-100',
								)}
							>
								<Link href={routes.profile.gen(participant.studentId._id)}>
									<Image
										alt='avatar'
										src={participant.studentId.avatarUrl}
										width={64}
										height={64}
										className='w-16 h-16 object-cover rounded-full'
									/>
								</Link>
								<h3 className='mt-3 text-sm font-medium'>
									<Link href={routes.profile.gen(participant.studentId._id)}>
										{participant.studentId.name}
									</Link>
								</h3>
								<span className='flex items-center mt-2'>
									{participant.studentId.totalPoints}
									<Point className='ml-1' />
								</span>
								<Button asChild className='mt-6' variant='outline' size='sm'>
									<Link href={routes.profile.gen(participant.studentId._id)}>
										Xem chi tiết
									</Link>
								</Button>
							</div>
						))}

				{isLoading &&
					[...Array(6)].map((_, index) => (
						<div
							key={index}
							className={cn(
								'flex flex-col items-center px-4 py-6 border border-slate-100 rounded-xl',
							)}
						>
							<Skeleton className='w-16 h-16 rounded-full' />
							<Skeleton className='h-5 w-40 mt-3' />
							<Skeleton className='w-10 h-5 mt-2' />
							<Button className='mt-6' variant='outline' size='sm'>
								Xem chi tiết
							</Button>
						</div>
					))}
			</div>
		</section>
	)
}
