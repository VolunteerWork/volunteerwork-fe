'use client'

import personsApi from '@/apis/persons'
import { Skeleton } from '@/components/ui/skeleton'
import queryKeys from '@/configs/query-keys'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'

const field = ['Họ và tên:', 'Giới tính:', 'Ngày sinh:', 'Trường:', 'Khoa:']

export default function Information() {
	const { id } = useParams<{ id: string }>()

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.accountInfo.gen(id),
		queryFn: () => personsApi.getInfo(id),
	})

	return (
		<>
			{data && (
				<div className='px-6 py-8 border border-slate-100 rounded-xl'>
					<h3 className='font-bold text-lg w-full mb-6'>Thông tin</h3>
					<div className='flex flex-col gap-4'>
						{[
							data.name,
							data.gender ? 'Nam' : 'Nữ',
							format(data.dob, 'd/M/yyyy'),
							data.school,
							data.faculty,
						].map((value, index) => {
							return (
								<div key={index} className='flex gap-4'>
									<p className='w-[5rem] font-medium text-sm'>{field[index]}</p>
									<p className='flex-1 text-right'>{value}</p>
								</div>
							)
						})}
					</div>
				</div>
			)}
			{isLoading && (
				<div className='px-6 py-8 border border-slate-100 rounded-xl'>
					<h3 className='font-bold text-lg w-full mb-6'>Thông tin</h3>
					<div className='flex flex-col gap-4'>
						{[...Array(5)].map((_, index) => {
							return <Skeleton key={index} className='w-full h-5'></Skeleton>
						})}
					</div>
				</div>
			)}
		</>
	)
}
