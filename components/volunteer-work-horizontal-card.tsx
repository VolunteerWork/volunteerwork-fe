import routes from '@/configs/routes'
import VolunteerWork from '@/interfaces/volunteer-work'
import { cn, getEndDateOfVolunteerWork } from '@/lib/utils'
import { format, isBefore } from 'date-fns'
import { ArrowRight } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'
import { CSSProperties } from 'react'

interface VolunteerWorkHorizontalCardProps {
	data: VolunteerWork
	className?: string
	style?: CSSProperties
}

function VolunteerWorkHorizontalCard({
	data,
	className,
	style,
}: VolunteerWorkHorizontalCardProps) {
	return (
		<div className={cn('@container', className)} style={style}>
			<div className='flex @2xl:flex-row flex-col items-stretch'>
				<div className='@3xl:w-4/12 @2xl:w-6/12 w-full'>
					<Link
						href={routes.volunteerWorks.gen(data._id)}
						className='block aspect-w-16 @2xl:aspect-h-12 overflow-hidden aspect-h-9 rounded-lg'
					>
						<Image
							alt='banner'
							src={data.imageUrl}
							width={500}
							height={500}
							className='w-full h-full object-cover hover:scale-110 transition origin-center'
						/>
					</Link>
				</div>
				<div className='@2xl:ml-4 @2xl:mt-0 mt-4 @2xl:flex-1'>
					<h3 className='text-base font-medium h-12 line-clamp-2 mb-2'>
						<Link href={routes.volunteerWorks.gen(data._id)}>{data.title}</Link>
					</h3>
					<p className='text-sm'>
						Thời gian: {format(data.createdAt, 'd/M/yyyy')} -{' '}
						{format(getEndDateOfVolunteerWork(data), 'd/M/yyyy')}
					</p>
					<div className='flex items-center mt-3'>
						<Link href={routes.organizations.gen(data.organization._id)}>
							<Image
								alt='avatar'
								src={data.organization.avatarUrl}
								width={32}
								height={32}
								className='w-8 h-8 object-cover rounded-full'
							/>
						</Link>
						<div className='ml-3'>
							<h4 className='font-medium line-clamp-1'>
								<Link href={routes.organizations.gen(data.organization._id)}>
									{data.organization.name}
								</Link>
							</h4>
							<p className='text-sm line-clamp-1'>
								{data.organization.affiliatedUnit}
							</p>
						</div>
					</div>

					<div className='flex items-center justify-between mt-4'>
						<span
							className={cn(
								'py-1 px-3 bg-slate-100 rounded-md text-xs font-medium text-slate-700',
								isBefore(new Date(), getEndDateOfVolunteerWork(data)) &&
									'bg-primary-200',
							)}
						>
							{isBefore(new Date(), getEndDateOfVolunteerWork(data))
								? 'Đang diễn ra'
								: 'Đã kết thúc'}
						</span>

						<Link
							href={routes.volunteerWorks.gen(data._id)}
							className='text-primary-500 text-sm font-medium group flex items-center'
						>
							Xem chi tiết
							<ArrowRight className='h-4 ml-1 transition-all mr-1 group-hover:ml-2 group-hover:mr-0 ease-out' />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

VolunteerWorkHorizontalCard.Skeleton =
	function VolunteerWorkHorizontalCardSkeleton() {
		return (
			<div className='@container'>
				<div className='flex @2xl:flex-row flex-col items-stretch'>
					<div className='@3xl:w-4/12 @2xl:w-6/12 w-full'>
						<Skeleton className='aspect-w-16 @2xl:aspect-h-12 aspect-h-9 rounded-lg' />
					</div>
					<div className='@2xl:ml-4 @2xl:mt-0 mt-4 @2xl:flex-1'>
						<Skeleton className='h-6 w-full mb-1' />
						<Skeleton className='h-6 w-[50%] mb-2' />
						<Skeleton className='h-5 w-[80%]' />
						<div className='flex items-center mt-3'>
							<Skeleton className='w-8 h-8 rounded-full' />
							<div className='ml-3'>
								<Skeleton className='h-6 w-48 max-w-full' />
								<Skeleton className='h-5 mt-1 w-64 max-w-full' />
							</div>
						</div>

						<div className='flex items-center justify-between mt-4'>
							<Skeleton className={cn('py-1 px-3 h-6 w-28')} />

							<span className='text-primary-500 text-sm font-medium group flex items-center'>
								Xem chi tiết
								<ArrowRight className='h-4 ml-1 transition-all mr-1 group-hover:ml-2 group-hover:mr-0 ease-out' />
							</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

export default VolunteerWorkHorizontalCard
