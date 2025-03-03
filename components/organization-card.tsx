import { Organization } from '@/interfaces/organization'
import { cn, getRandomTextAvatar } from '@/lib/utils'
import { ArrowRight } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { CSSProperties } from 'react'
import routes from '@/configs/routes'
import { Skeleton } from './ui/skeleton'
import Alignment from './ui/alignment'

interface OrganizationCardProps {
	className?: string
	style?: CSSProperties
	data: Organization
}

function OrganizationCard({ className, style, data }: OrganizationCardProps) {
	return (
		<div
			className={cn(
				'overflow-hidden flex flex-col items-center rounded-2xl border border-slate-100 px-4 py-6',
				className,
			)}
			style={style}
		>
			<Image
				alt='avatar'
				src={
					data?.avatarUrl
						? data.avatarUrl
						: getRandomTextAvatar('CLB Tình nguyện Sinh viên UIT')
				}
				width={80}
				height={80}
				className='w-20 h-20 rounded-full object-cover'
			/>
			<h3 className='font-semibold line-clamp-2 mt-3 text-center'>
				{data.name}
			</h3>
			<p className='text-center text-xs mt-2 line-clamp-2'>
				{data.affiliatedUnit}
			</p>
			<Link
				href={routes.organizations.gen(data._id)}
				className='text-primary-500 mt-6 font-medium group flex items-center'
			>
				Xem chi tiết
				<ArrowRight className='h-5 ml-2 transition-all mr-2 group-hover:ml-4 group-hover:mr-0 ease-out' />
			</Link>
		</div>
	)
}

OrganizationCard.Skeleton = function OrganizationCardSkeleton() {
	return (
		<div
			className={
				'overflow-hidden flex flex-col items-center rounded-2xl border border-slate-100 px-4 py-6'
			}
		>
			<Skeleton className='w-20 h-20 rounded-full' />
			<Skeleton className='mt-3 h-5 w-full'></Skeleton>
			<Skeleton className='h-4 mt-2 w-[80%]'></Skeleton>
			<span className='text-primary-500 mt-6 font-medium group flex items-center'>
				Xem chi tiết
				<ArrowRight className='h-5 ml-2 transition-all mr-2 group-hover:ml-4 group-hover:mr-0 ease-out' />
			</span>
		</div>
	)
}

export default OrganizationCard
