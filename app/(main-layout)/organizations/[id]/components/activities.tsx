'use client'

import organizationsApi from '@/apis/organizations'
import volunteerWorksApi from '@/apis/volunteer-works'
import Alignment from '@/components/ui/alignment'
import { Button } from '@/components/ui/button'
import VolunteerWorkHorizontalCard from '@/components/volunteer-work-horizontal-card'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import useAuth from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useIntersectionObserver } from 'usehooks-ts'

export default function Activities() {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0,
		freezeOnceVisible: true,
	})

	const { id } = useParams<{ id: string }>()

	const { data: organization } = useQuery({
		queryKey: queryKeys.accountInfo.gen(id),
		queryFn: () => organizationsApi.getInfo(id),
	})

	const { accountInfo } = useAuth()

	const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: queryKeys.volunteerByOrganization.gen(id),
			queryFn: ({ pageParam }) =>
				volunteerWorksApi.getVolunteerWorksByOrganizationId({
					organizationId: id,
					...pageParam,
				}),
			initialPageParam: { page: 1, limit: 10 },
			getNextPageParam: lastPage => {
				if (
					lastPage &&
					lastPage.pagination.currentPage <
						Math.ceil(lastPage.pagination.total / 10)
				) {
					return { page: lastPage.pagination.currentPage + 1, limit: 10 }
				}
			},
		})

	return (
		<section>
			<div className='flex items-center justify-between mb-10'>
				<h3 className='font-semibold text-lg'>Các hoạt động của tổ chức</h3>

				{organization && accountInfo && organization._id == accountInfo._id ? (
					<Button size='sm' variant='secondary' asChild>
						<Link href={routes.newWork}> Thêm</Link>
					</Button>
				) : (
					<div />
				)}
			</div>

			{data && <div ref={ref} />}
			<div className='space-y-14'>
				{data &&
					data.pages
						.map(page => page!.data)
						.flat()
						.map((data, index) => (
							<VolunteerWorkHorizontalCard
								style={{
									transitionDelay: index * 200 + 'ms',
								}}
								className={cn(
									'opacity-0 duration-500 ease-out translate-y-36 transition',
									isIntersecting && 'opacity-100 translate-y-0',
								)}
								data={{ ...data, organization: organization! }}
								key={index}
							/>
						))}

				{isLoading &&
					[1, 2, 3].map((_, index) => (
						<VolunteerWorkHorizontalCard.Skeleton key={index} />
					))}

				{isFetchingNextPage && <VolunteerWorkHorizontalCard.Skeleton />}

				{hasNextPage && !isFetchingNextPage && (
					<Alignment align='center' className='mt-8'>
						<Button onClick={() => fetchNextPage()} variant='ghost'>
							Xem thêm
						</Button>
					</Alignment>
				)}
			</div>
		</section>
	)
}
