'use client'

import organizationsApi from '@/apis/organizations'
import queryKeys from '@/configs/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function Information() {
	const { id } = useParams<{ id: string }>()

	const { data } = useQuery({
		queryKey: queryKeys.accountInfo.gen(id),
		queryFn: () => organizationsApi.getInfo(id),
	})

	return (
		data && (
			<div className='space-y-8 mx-auto max-w-[45rem]'>
				<section>
					<h3 className='font-semibold text-lg mb-4'>Giới thiệu</h3>

					<div
						className='prose prose-sm max-w-none'
						dangerouslySetInnerHTML={{ __html: data.description }}
					></div>
				</section>

				<section>
					<h3 className='font-semibold text-lg mb-4'>Đơn vị trực thuộc</h3>

					<p className='prose prose-sm'>{data.affiliatedUnit}</p>
				</section>

				<section>
					<h3 className='font-semibold text-lg mb-4'>Thông tin liên hệ</h3>

					<div
						className='prose prose-sm max-w-none'
						dangerouslySetInnerHTML={{ __html: data.contactInfo }}
					></div>
				</section>
			</div>
		)
	)
}
