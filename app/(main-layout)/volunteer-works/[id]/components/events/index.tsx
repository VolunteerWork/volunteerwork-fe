'use client'

import volunteerWorksApi from '@/apis/volunteer-works'
import { Separator } from '@/components/ui/separator'
import queryKeys from '@/configs/query-keys'
import useAuth from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useIntersectionObserver } from 'usehooks-ts'
import AddEvent from './add-event'
import { format, isAfter } from 'date-fns'

export default function Events() {
	const { id } = useParams<{ id: string }>()

	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0,
		freezeOnceVisible: true,
	})

	const { accountInfo, isOrganization } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	return (
		<section>
			<div className='flex items-center justify-between mb-16'>
				<h3 className='font-semibold text-lg'>Sự kiện</h3>

				{accountInfo &&
				isOrganization &&
				data &&
				accountInfo._id == data.organization._id ? (
					<AddEvent />
				) : (
					<div />
				)}
			</div>

			{data && data.events.length > 0 && <div ref={ref} />}
			<div
				className={cn(
					'space-y-16 flex flex-col ml-0 md:ml-36 pl-9 md:pl-24 lg:pl-36 before:content-[""] before:block relative before:absolute before:w-0.5 before:h-0 before:rounded-full before:bg-slate-200 before:left-0 before:top-0 before:transition-all before:duration-500 before:ease-in',
					isIntersecting && 'before:h-full',
				)}
			>
				{data &&
					data.events.length > 0 &&
					data.events.map((event, index) => (
						<div
							key={index}
							data-label={'Đang diễn ra'}
							className={cn(
								isAfter(new Date(), event.startDate) &&
									isAfter(event.endDate, new Date()) &&
									'before:content-[attr(data-label)] before:inline-block before:py-2 before:px-2 before:text-center before:bg-primary-400 relative before:right-[calc(100%+3.25rem)]  md:before:right-[calc(100%+7rem)] lg:before:right-[calc(100%+10rem)] before:absolute before:w-[8rem] before:top-6 before:!rounded-tr-none before:font-medium before:text-white before:text-sm before:rounded-lg after:content-[""] after:inline-block after:border-y-[0.5rem] after:border-x-[1.5rem] after:!border-t-primary-400 after:border-transparent after:absolute after:top-6 lg:after:right-[calc(100%+8.75rem)] md:after:right-[calc(100%+5.75rem)] after:right-[calc(100%+2rem)] transition duration-700 ease-out -translate-x-36 opacity-0 max-md:after:hidden max-md:before:hidden',
								isIntersecting && 'opacity-100 translate-x-0',
							)}
						>
							<div
								style={{
									transitionDelay: 200 * index + 'ms',
								}}
								className={cn(
									'p-4 border border-slate-100 rounded-xl relative before:content-[""] before:block before:h-px lg:before:w-36 md:before:w-24 before:w-9 before:absolute before:rounded-full before:bg-slate-200 before:right-full before:top-6 after:content-[""] after:block after:w-3 after:h-3 after:rounded-full after:absolute after:bg-primary-400 lg:after:right-[calc(100%+9rem)] md:after:right-[calc(100%+6rem)] after:right-[calc(100%+2.25rem)] after:top-6 after:-translate-y-1/2 after:translate-x-1/2 transition opacity-0 translate-x-full ease-out duration-700',
									isIntersecting && 'translate-x-0 opacity-100',
								)}
							>
								<h4>{event.title}</h4>
								<Separator className='my-2' />
								<p className='text-sm mb-2'>{event.description}</p>
								<ul className='text-sm space-y-2'>
									<li>
										<strong className='font-medium'>Bắt đầu:</strong>{' '}
										{format(event.startDate, 'd/M/yyyy H:m:s')}
									</li>
									<li>
										<strong className='font-medium'>Kết thúc:</strong>{' '}
										{format(event.endDate, 'd/M/yyyy H:m:s')}
									</li>
								</ul>
								{isAfter(new Date(), event.startDate) &&
									isAfter(event.endDate, new Date()) && (
										<span className='md:hidden bg-primary-400 py-1 px-4 rounded-md text-xs text-white font-medium mt-4 inline-block'>
											Đang diễn ra
										</span>
									)}
							</div>
						</div>
					))}
			</div>
		</section>
	)
}
