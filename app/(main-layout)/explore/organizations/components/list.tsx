'use client'
import organizationsApi from '@/apis/organizations'
import OrganizationCard from '@/components/organization-card'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import queryKeys from '@/configs/query-keys'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

function MakeList() {
	const router = useRouter()
	const [page, setPage] = useState(1)

	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0,
		freezeOnceVisible: true,
	})

	const searchParams = useSearchParams()
	const searchPage = searchParams.get('page') || '1'

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.organizationsPagination.gen(page, 9),
		queryFn: () => organizationsApi.getOrganizations({ page, limit: 9 }),
	})

	useEffect(() => {
		if (searchPage) {
			if (Number(searchPage) < 1) {
				router.push('?page=1')
			} else if (
				data &&
				Number(searchPage) > Math.ceil(data.pagination.total / 9)
			) {
				router.push('?page=' + Math.ceil(data.pagination.total / 9))
			} else {
				setPage(Number(searchPage))
			}
		}
	}, [data, router, searchPage])

	return (
		<div>
			<div>
				{data && <div ref={ref} />}
				<div className='grid grid-cols-3 gap-6'>
					{data &&
						data.data.map((organization, index) => (
							<OrganizationCard
								style={{
									transitionDelay: index * 200 + 'ms',
								}}
								className={cn(
									'opacity-0 duration-500 ease-out translate-y-36 transition',
									isIntersecting && 'opacity-100 translate-y-0',
								)}
								key={index}
								data={organization}
							/>
						))}

					{isLoading &&
						[...Array(9)].map((_, index) => (
							<OrganizationCard.Skeleton key={index} />
						))}
				</div>
			</div>
			{data && (
				<Pagination className='mt-16'>
					<PaginationContent>
						{page > 1 && (
							<PaginationItem>
								<PaginationPrevious
									className='cursor-pointer'
									onClick={() => router.push('?page=' + (page - 1))}
								/>
							</PaginationItem>
						)}

						{[
							[...Array(Math.ceil(data.pagination.total / 9))].map(
								(_, index) => (
									<PaginationItem key={index}>
										<PaginationLink
											isActive={page == index + 1}
											className='cursor-pointer'
											onClick={() => router.push('?page=' + (index + 1))}
										>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								),
							),
						]}

						{page < Math.ceil(data.pagination.total / 9) && (
							<PaginationItem>
								<PaginationNext
									className='cursor-pointer'
									onClick={() => router.push('?page=' + (page + 1))}
								/>
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			)}
		</div>
	)
}

function List() {
	return (
		<Suspense>
			<MakeList />
		</Suspense>
	)
}

export default List
