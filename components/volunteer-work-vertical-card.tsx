import { ArrowRight } from 'iconsax-react'
import Image from 'next/image'
import { CSSProperties } from 'react'
import Alignment from './ui/alignment'
import Link from 'next/link'
import VolunteerWork from '@/interfaces/volunteer-work'
import { format, isBefore } from 'date-fns'
import { cn, getEndDateOfVolunteerWork } from '@/lib/utils'
import routes from '@/configs/routes'
import { Skeleton } from './ui/skeleton'

interface VolunteerWorkVerticalCardProps {
	data: VolunteerWork
	className?: string
	style?: CSSProperties
	showDetail?: boolean
}

function VolunteerWorkVerticalCard({
	data,
	className,
	style,
	showDetail = true,
}: VolunteerWorkVerticalCardProps) {
	return (
		<div style={style} className={className}>
			<div className='aspect-w-16 aspect-h-10 rounded-2xl overflow-hidden border border-primary-50'>
				<Link href={routes.volunteerWorks.gen(data._id)}>
					<Image
						alt='thumb'
						src={data.imageUrl}
						width={500}
						height={312}
						className='object-cover w-full h-full transition hover:scale-110 ease-in'
					/>
				</Link>
			</div>
			<div className='flex items-center justify-between mt-4'>
				<div
					className={cn(
						'inline-block text-xs font-medium py-0.5 px-2 rounded-md bg-amber-200',
						!isBefore(new Date(), getEndDateOfVolunteerWork(data)) &&
							'bg-slate-200',
					)}
				>
					{isBefore(new Date(), getEndDateOfVolunteerWork(data))
						? 'Đang diễn ra'
						: 'Đã kết thúc'}
				</div>
				<div className='text-xs'>
					{format(data.createdAt, 'd/M/yyyy')} -{' '}
					{format(getEndDateOfVolunteerWork(data), 'd/M/yyyy')}
				</div>
			</div>
			<h3 className='text-lg font-semibold mt-2 line-clamp-2 h-14 transition hover:text-primary-500'>
				<Link href={routes.volunteerWorks.gen(data._id)}>{data.title}</Link>
			</h3>

			<h3 className='text-sm mt-2 line-clamp-1'>
				<Link href={routes.organizations.gen(data.organization._id)}>
					{data.organization.name}
				</Link>
			</h3>

			{showDetail && (
				<div
					className='line-clamp-3 text-[0.8125rem] mt-3 font-light prose prose-sm prose-p:!my-0'
					dangerouslySetInnerHTML={{ __html: data.description }}
				></div>
			)}
			<Alignment align='right' className='mt-6'>
				<Link
					href={routes.volunteerWorks.gen(data._id)}
					className='text-primary-500 font-medium group flex items-center'
				>
					Xem chi tiết
					<ArrowRight className='h-5 ml-2 transition-all mr-2 group-hover:ml-4 group-hover:mr-0 ease-out' />
				</Link>
			</Alignment>
		</div>
	)
}

VolunteerWorkVerticalCard.Skeleton =
	function VolunteerWorkVerticalCardSkeleton() {
		return (
			<div>
				<div className='aspect-w-16 aspect-h-10 rounded-2xl overflow-hidden border border-primary-50'>
					<Skeleton className='object-cover w-full h-full transition hover:scale-110 ease-in' />
				</div>

				<div className='flex items-center justify-between mt-4'>
					<Skeleton className={cn('w-36 h-5')} />
					<Skeleton className='h-4 w-36' />
				</div>

				<Skeleton className='h-6 w-full mt-2' />

				<Skeleton className='w-full h-5 mt-2' />

				<div className='mt-3 space-y-1'>
					<Skeleton className='w-full h-4 mt-2' />
					<Skeleton className='w-full h-4 mt-2' />
					<Skeleton className='w-full h-4 mt-2' />
				</div>

				<Alignment align='right' className='mt-6'>
					<span className='text-primary-500 font-medium group flex items-center'>
						Xem chi tiết
						<ArrowRight className='h-5 ml-2 transition-all mr-2 group-hover:ml-4 group-hover:mr-0 ease-out' />
					</span>
				</Alignment>
			</div>
		)
	}

export default VolunteerWorkVerticalCard
