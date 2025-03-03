'use client'

import personsApi from '@/apis/persons'
import Point from '@/components/icons/point'
import queryKeys from '@/configs/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function Achievements() {
	const { id } = useParams<{ id: string }>()

	const { data } = useQuery({
		queryKey: queryKeys.accountInfo.gen(id),
		queryFn: () => personsApi.getInfo(id),
	})

	return (
		data && (
			<div className='px-9 py-7 space-y-6 border border-slate-200 rounded-xl'>
				<div>
					<h3 className='font-bold text-lg w-full mb-4'>Thành tựu</h3>

					<div className='space-y-4'>
						<div className='flex gap-4'>
							<p className='flex-1 font-medium text-sm'>Tham gia hoạt động:</p>
							<span>4</span>
						</div>
						<div className='flex gap-4'>
							<p className='flex-1 font-medium text-sm'>Điểm tích lũy:</p>
							<span className='flex items-center'>
								{data.totalPoints}
								<Point className='ml-1' />
							</span>
						</div>
					</div>
				</div>

				<div>
					<h3 className='font-bold text-lg w-full mb-4'>Danh hiệu</h3>

					<div className='flex flex-wrap gap-4'>
						{['🏅 TNV tích cực', '🎖️ TNV xuất sắc'].map((achieve, index) => {
							return (
								<div
									key={index}
									className='text-center text-xs flex items-center justify-center py-[0.5rem] px-4 text-black/60 font-medium rounded-full bg-slate-100'
								>
									{achieve}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	)
}
