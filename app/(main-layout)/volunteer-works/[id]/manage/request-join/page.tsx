'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { ArrowRight2 } from 'iconsax-react'
import Image from 'next/image'

import participantsApi from '@/apis/participants'
import { Tick, XMark } from '@/assets/icon'
import Loader from '@/components/ui/loader'
import queryKeys from '@/configs/query-keys'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import routes from '@/configs/routes'

function Join() {
	const { id } = useParams<{ id: string }>()

	const { data } = useQuery({
		queryKey: queryKeys.participantsByVolunteerWork.gen(id, 'WAITING'),
		queryFn: () =>
			participantsApi.getByVolunteerWork({
				volunteerWorkId: id,
				status: 'WAITING',
			}),
	})

	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutate, isPending } = useMutation({
		mutationFn: participantsApi.acceptParticipant,
		onSuccess(data) {
			toast({
				description:
					data?.status === 'ACCEPTED'
						? 'Đã chấp nhận yêu cầu tham gia'
						: 'Đã từ chối yêu cầu tham gia',
			})
			queryClient.refetchQueries({
				queryKey: queryKeys.participantsByVolunteerWork.gen(id, 'WAITING'),
			})
			queryClient.refetchQueries({
				queryKey: queryKeys.participantsByVolunteerWork.gen(id),
			})
		},
		onError(error) {
			toast({
				title: 'Phản hồi yêu cầu tham gia thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	return (
		<div className='w-full'>
			{isPending && <Loader />}
			<h1 className='text-center text-3xl font-bold mb-16'>Yêu cầu tham gia</h1>

			<div className='flex justify-center'>
				<div className='flex flex-col max-w-[50rem] w-full'>
					<div className='flex items-center mb-4 font-medium text-black/60 py-4 px-5 bg-gray-50 rounded-lg'>
						<p className='xl:w-[21.875rem] sm:w-[19.875rem]'>Họ và tên</p>
						<p className='max-lg:hidden'>Ngày gửi yêu cầu</p>
					</div>
					{data &&
						data.map((request, index) => {
							return (
								<div
									key={index}
									className='flex max-sm:gap-y-4 max-sm:justify-between max-sm:flex-wrap items-center py-4 px-5 border-b border-solid border-black/10'
								>
									<div className='flex items-center gap-4 xl:w-[21.875rem] w-[19.875rem] max-sm:flex-1 max-w-full'>
										<Link href={routes.profile.gen(request.studentId._id)}>
											<Image
												src={request.studentId.avatarUrl}
												alt=''
												height={512}
												width={512}
												className='w-12 h-12 rounded-full'
											/>
										</Link>
										<div className='max-lg:self-stretch flex flex-col justify-between'>
											<Link
												href={routes.profile.gen(request.studentId._id)}
												className='font-medium text-sm'
											>
												{request.studentId.name}
											</Link>
											<p className='font-light text-sm lg:hidden'>
												Ngày gửi: {format(request.createdAt, 'd/M/yyyy')}
											</p>
										</div>
									</div>

									<p className='text-gray-700 max-lg:hidden'>
										{format(request.createdAt, 'd/M/yyyy')}
									</p>

									<div className='flex max-sm:w-full items-center sm:gap-4 max-sm:gap-2 sm:ml-auto max-sm:flex-wrap max-sm:order-3'>
										<button
											onClick={() =>
												mutate({ participantId: request._id, isAccepted: true })
											}
											className='flex justify-center max-sm:flex-1 items-center text-sm gap-2 px-4 py-2 border border-solid border-green-600 text-green-600 hover:bg-green-100/50 transition-all cursor-pointer rounded-xl'
										>
											<Tick className='w-4 h-4 md:hidden text-green-600' />
											<span className='max-md:hidden max-sm:block text-nowrap'>
												Đồng ý
											</span>
										</button>

										<button
											onClick={() =>
												mutate({
													participantId: request._id,
													isAccepted: false,
												})
											}
											className='flex justify-center max-sm:flex-1 items-center text-sm gap-2 px-4 py-2 border border-solid border-red-600 text-red-600 hover:bg-red-100/50 transition-all cursor-pointer rounded-xl'
										>
											<XMark className='w-4 h-4 md:hidden' />
											<span className='max-md:hidden max-sm:block text-nowrap'>
												Từ chối
											</span>
										</button>
									</div>

									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												<Link
													href={routes.profile.gen(request.studentId._id)}
													className='flex ml-4 p-2 rounded-xl bg-white hover:bg-gray-100/80 transition-all cursor-pointer max-sm:order-1'
												>
													<ArrowRight2 size={16} />
												</Link>
											</TooltipTrigger>
											<TooltipContent>
												<p>Xem thông tin</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default Join
