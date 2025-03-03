'use client'

import volunteerWorksApi from '@/apis/volunteer-works'
import Alignment from '@/components/ui/alignment'
import { Button } from '@/components/ui/button'
import VolunteerWorkVerticalCard from '@/components/volunteer-work-vertical-card'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useIntersectionObserver } from 'usehooks-ts'

export default function Works() {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0.2,
		freezeOnceVisible: true,
	})

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.volunteerWorksPagination.gen(1, 3),
		queryFn: () => volunteerWorksApi.get({ page: 1, limit: 3 }),
	})
	console.log(data)
	return (
		<section className='py-16 bg-slate-50'>
			<div className='container'>
				<h2 className='text-3xl font-bold text-center mb-12'>
					Các hoạt động nổi bật
				</h2>

				{data && <div ref={ref} />}
				<div className='grid lg:grid-cols-3 grid-cols-2 gap-8'>
					{data &&
						data.data.map((item, index) => (
							<VolunteerWorkVerticalCard
								key={index}
								data={item}
								style={{
									transitionDelay: 150 * index + 'ms',
								}}
								className={cn(
									'transition translate-y-36 opacity-0 duration-500 ease-out',
									isIntersecting && 'translate-y-0 opacity-100',
								)}
								showDetail={false}
							/>
						))}

					{isLoading && [
						[...Array(3)].map((_, index) => (
							<VolunteerWorkVerticalCard.Skeleton key={index} />
						)),
					]}
				</div>

				<Alignment align='center' className='mt-16'>
					<Button asChild>
						<Link href={routes.explore.default}>Khám phá thêm</Link>
					</Button>
				</Alignment>
			</div>
		</section>
	)
}
