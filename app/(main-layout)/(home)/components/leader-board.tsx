'use client'

import Crown from '@/components/icons/crown'
import Point from '@/components/icons/point'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useIntersectionObserver } from 'usehooks-ts'
import personsApi from '@/apis/persons'
import { useQuery } from '@tanstack/react-query'
import { Person } from '@/interfaces/person'
import queryKeys from '@/configs/query-keys'


function Top3({ data }: { data: Person[] }) {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0.5,
		freezeOnceVisible: true,
	})

	return (
		<div
			ref={ref}
			className='flex items-end justify-center gap-2 h-[21.875rem]'
		>
			{data.map((user, index) => (
				<div
					key={index}
					className={cn(
						'flex flex-col items-center sm:w-48 w-1/3',
						['order-2', 'order-1', 'order-3'][index],
					)}
				>
					{index == 0 && <Crown className='w-12' />}
					<div className='relative'>
						<Image
							alt='avatar'
							src={user.avatarUrl}
							width={128}
							height={256}
							className={cn(
								'object-cover w-[5.5rem] h-[5.5rem] rounded-full border-[3px]',
								index == 0 && 'w-24 h-24',
								['border-amber-400', 'border-sky-500', 'border-green-500'][
									index
								],
							)}
						/>
						<div
							className={cn(
								'absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[calc(50%-3px)] w-5 h-5 rounded-md rotate-45 flex items-center justify-center',
								['bg-amber-400', 'bg-sky-500', 'bg-green-500'][index],
							)}
						>
							<span className='-rotate-45 text-white font-medium text-xs'>
								{index + 1}
							</span>
						</div>
					</div>
					<div
						className={cn(
							'bg-slate-100 w-full h-16 -mt-8 rounded-tl-3xl rounded-tr-3xl pt-14 transition-all duration-1000 ease-out',
							index == 0 && 'bg-slate-200',
							isIntersecting && 'h-48',
							isIntersecting && index == 0 && 'h-64',
						)}
					>
						<div
							className={cn(
								'opacity-0 duration-1000 ease-out flex flex-col items-center px-4',
								isIntersecting && 'opacity-100',
							)}
						>
							<h4 className='text-center text-sm font-medium mb-2'>
								{user.name}
							</h4>
							<span
								className={cn(
									'flex items-center text-lg font-semibold',
									['text-amber-400', 'text-sky-500', 'text-green-500'][index],
								)}
							>
								{user.totalPoints}
								<Point className='ml-1 text-current' />
							</span>

							<span className='mt-2'>{user.attendedActivities.length}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

function Top10({ data }: { data: Person[] }) {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0,
		freezeOnceVisible: true,
	})

	return (
		<div className='mt-24 mx-auto max-w-[50rem]'>
			<div className='pl-[8rem] max-md:hidden pr-8 flex items-center justify-between mb-4 font-medium'>
				<span>Họ và tên</span>
				<div className='w-1/2 flex items-center'>
					<span className='flex flex-1 justify-center text-center'>
						Số HĐ tham gia
					</span>
					<span className='flex flex-1 justify-center text-center'>Điểm</span>
				</div>
			</div>

			<div ref={ref} className='space-y-6'>
				{data.map((user, index) => (
					<div
						key={index}
						style={{
							transitionDelay: 100 * index + 'ms',
						}}
						className={cn(
							'flex items-center -translate-x-64 opacity-25 transition duration-1000 ease-out',
							isIntersecting && 'translate-x-0 opacity-100',
						)}
					>
						<span className='text-xl mr-8 max-md:hidden text-primary-400'>
							#{index + 4}
						</span>
						<div className='flex items-center max-md:flex-1 max-md:bg-slate-50 max-md:px-4 max-md:py-4 rounded-xl'>
							<Image
								alt='avatar'
								src='https://picsum.photos/64'
								width={64}
								height={64}
								className='w-10 h-10 object-cover rounded-full'
							/>
							<div className='md:hidden flex-1 ml-3'>
								<h4 className='text-sm font-medium'>{user.name}</h4>
								<div className='flex items-center mt-1'>
									<span>12</span>
									<span className='flex items-center text-primary-400 ml-4'>
										{user.totalPoints}
										<Point className='ml-2' />
									</span>
								</div>
							</div>
							<div className='flex-1 md:hidden flex items-center justify-end'>
								<span className='text-primary-400 text-lg'>#{index + 4}</span>
							</div>
						</div>
						<div className='flex max-md:hidden flex-1 items-center justify-between ml-6 bg-slate-50 rounded-xl px-8 py-6'>
							<h4 className='font-medium'>{user.name}</h4>
							<div className='w-1/2 flex items-center'>
								<div className='flex-1 flex justify-center'>{user.attendedActivities.length}</div>
								<div className='flex-1 flex justify-center'>
									<span className='flex items-center text-primary-400 font-medium'>
										{user.totalPoints}
										<Point className='ml-2' />
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default function LeaderBoard() {
	const { data } = useQuery({
		queryKey: queryKeys.leaderboard,
		queryFn: () => personsApi.getTop10(),
	})

	const top3 = data ? data.slice(0, 3) : []
	const top10 =  data ? data.slice(3, 10) : []

	return (
		<section className='py-16'>
			<div className='container'>
				<h2 className='text-3xl font-bold text-center mb-12'>
					Các cá nhân hoạt động xuất sắc
				</h2>

				{top3.length > 0 && <Top3 data={top3} />}

				{top10.length > 0 && <Top10 data={top10} />}
			</div>
		</section>
	)
}
