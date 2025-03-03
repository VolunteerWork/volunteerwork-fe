'use client'

import OrganizationCard from '@/components/organization-card'
import Alignment from '@/components/ui/alignment'
import { Button } from '@/components/ui/button'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'iconsax-react'
import Link from 'next/link'
import { useIntersectionObserver } from 'usehooks-ts'
import organizationsApi from '@/apis/organizations'
import VolunteerWorkVerticalCard from '@/components/volunteer-work-vertical-card'

function Organizations() {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0,
		freezeOnceVisible: true,
	})

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.organizations,
		queryFn: () => organizationsApi.getOrganizations({ page: 1, limit: 3 }),
	})

	return (
		<section className='container py-16'>
			<h2 className='text-3xl font-bold mb-14 text-center'>
				Các tổ chức tình nguyện
			</h2>

			{data && <div ref={ref} />}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{data &&
					data.data.map((organization, index) => (
						<OrganizationCard
							data={organization}
							key={index}
							style={{
								transitionDelay: 150 * index + 'ms',
							}}
							className={cn(
								'ease-out duration-500 opacity-0 translate-y-36',
								isIntersecting && 'translate-y-0 opacity-100',
							)}
						/>
					))}

				{isLoading && [
					[...Array(6)].map((_, index) => (
						<OrganizationCard.Skeleton key={index} />
					)),
				]}
			</div>

			<Alignment align='center' className='mt-16'>
				<Button variant='outline' className='rounded-full group' asChild>
					<Link href={routes.explore.organizations}>
						Xem thêm
						<ArrowRight className='h-5 ml-2 mr-2 group-hover:ml-4 group-hover:mr-0 transition-all ease-out' />
					</Link>
				</Button>
			</Alignment>
		</section>
	)
}

export default Organizations
