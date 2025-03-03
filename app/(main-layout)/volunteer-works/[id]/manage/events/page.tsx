'use client'
import { Bin } from '@/assets/icon'
import { cn } from '@/lib/utils'
import { ArrowDown2, ArrowUp2 } from 'iconsax-react'
import { useState } from 'react'
import AddEvent from '../../components/events/add-event'

import volunteerWorksApi from '@/apis/volunteer-works'
import queryKeys from '@/configs/query-keys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'

import { Event } from '@/interfaces/volunteer-work'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import Loader from '@/components/ui/loader'

function Events() {
	const { id } = useParams<{ id: string }>()

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	return (
		<div className='max-w-[50rem] mx-auto w-full'>
			<h1 className='text-center text-3xl font-bold mb-16'>
				Quản lí sự kiện tình nguyện
			</h1>

			<div>
				<div className='flex justify-between items-center mb-8'>
					<p className='font-semibold text-lg'>Sự kiện</p>
					<AddEvent />
				</div>
				{data?.events && data.events.length > 0 && (
					<div className='flex flex-col gap-2'>
						<div className='flex justify-between items-center font-medium text-black/60 py-4 px-5 bg-gray-50 rounded-lg'>
							<p className='lg:w-[26.25rem] w-[23rem]'>Tên sự kiện</p>
							<div className='flex justify-between items-center max-lg:hidden'>
								<p className='w-[8.5rem]'>Bắt đầu</p>
								<p className='w-[8.5rem]'>Kết thúc</p>
							</div>
							<div className='p-2 border border-solid border-red-500 rounded-lg hover:bg-red-50 transition-all cursor-pointer self-start opacity-0'>
								<Bin className='w-4 h-4 text-red-500' />
							</div>
						</div>
						{data.events.map((event, index) => {
							return <EventItem key={index} event={event} />
						})}
					</div>
				)}
			</div>
		</div>
	)
}

function EventItem({ event }: { event: Event }) {
	const { id } = useParams<{ id: string }>()

	const [more, setMore] = useState<boolean>(false)

	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, isPending } = useMutation({
		mutationFn: volunteerWorksApi.deleteEvent,
		onSuccess() {
			toast({
				description: 'Xóa sự kiện thành công',
			})
			queryClient.refetchQueries({
				queryKey: queryKeys.volunteer.gen(id),
			})
		},
		onError(error) {
			toast({
				title: 'Xóa sự kiện thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	return (
		<div className='border-solid border border-gray-100 rounded-xl px-5 pt-4 relative'>
			{isPending && <Loader />}
			<div className='flex justify-between lg:items-center items-start'>
				<div>
					<p className='xl:w-[26.25rem] w-[23rem] max-lg:flex-1 font-medium'>
						{event.title}
					</p>
					<div className='lg:hidden mt-2'>
						<p>
							<span className='font-medium'>Bắt đầu: </span>{' '}
							{format(event.startDate, 'd/M/yyyy H:m:s')}
						</p>
						<p>
							<span className='font-medium'>Kết thúc: </span>{' '}
							{format(event.endDate, 'd/M/yyyy H:m:s')}
						</p>
					</div>
				</div>
				<div className='flex justify-between items-center max-lg:hidden'>
					<p className='w-[8.5rem]'>
						{format(event.startDate, 'd/M/yyyy H:m:s')}
					</p>
					<p className='w-[8.5rem]'>
						{format(event.endDate, 'd/M/yyyy H:m:s')}
					</p>
				</div>
				<Dialog>
					<DialogTrigger>
						<div className='p-2 border border-solid border-red-500 rounded-lg hover:bg-red-50 transition-all cursor-pointer'>
							<Bin className='w-4 h-4 text-red-500' />
						</div>
					</DialogTrigger>
					<DialogContent className='max-w-[90%] w-[28rem]'>
						<DialogHeader>
							<DialogTitle className='leading-normal mt-2 text-center'>
								Bạn có chắc chắn muốn xóa sự kiện dưới đây không?
							</DialogTitle>
							<DialogDescription>
								Hành động này không thể được hoàn tác và sẽ dẫn đến việc loại bỏ
								sự kiện này khỏi hoạt động tình nguyện của bạn.
							</DialogDescription>
						</DialogHeader>

						<DialogFooter className='flex gap-2 mt-2'>
							<div
								onClick={() => mutate(event._id)}
								className='py-2 px-4 rounded-md bg-red-500 transition-all hover:opacity-80 font-medium text-white flex-1 text-center cursor-pointer max-sm:order-2'
							>
								Chắc chắn
							</div>
							<DialogClose asChild>
								<div className='py-2 px-4 rounded-md border border-solid border-gray-300 transition-all hover:bg-gray-100/50  font-medium flex-1 text-center cursor-pointer max-sm:order-1'>
									Hủy
								</div>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			{!more && (
				<div
					className='flex w-full justify-center py-3 cursor-pointer'
					onClick={() => setMore(!more)}
				>
					<ArrowDown2 size={16} />
				</div>
			)}
			<div
				className={cn(
					'h-0 overflow-hidden transition-all',
					more && 'h-fit mt-4 border-t border-solid border-gray-100 pt-4',
				)}
			>
				<p className='font-semibold mb-2'>Nội dung</p>
				{event.description}
				<div
					className='flex w-full justify-center py-3 cursor-pointer'
					onClick={() => setMore(!more)}
				>
					<ArrowUp2 size={16} />
				</div>
			</div>
		</div>
	)
}

export default Events
