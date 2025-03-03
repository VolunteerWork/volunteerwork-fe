'use client'

import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { ArrowRight2, DocumentDownload } from 'iconsax-react'
import Image from 'next/image'

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

import participantsApi from '@/apis/participants'
import { Bin } from '@/assets/icon'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Feedback from './components/feedback'
import { exportToExcel } from '@/lib/utils'
import volunteerWorksApi from '@/apis/volunteer-works'
import { format } from 'date-fns'

function Member() {
	const { id } = useParams<{ id: string }>()

	const { data } = useQuery({
		queryKey: queryKeys.participantsByVolunteerWork.gen(id),
		queryFn: () =>
			participantsApi.getByVolunteerWork({
				volunteerWorkId: id,
			}),
	})

	const { data: volunteerWork } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	return (
		<div className='w-full'>
			<div className='mb-16'>
				<h1 className='text-center text-3xl font-bold'>
					Danh sách sinh viên tham gia
				</h1>
				<p className='text-center mt-2'>
					(&nbsp;
					{data
						? data.filter(
								participant =>
									participant.status == 'ACCEPTED' ||
									participant.status === 'FINISH',
						  ).length
						: 0}{' '}
					sinh viên )
				</p>
			</div>

			<div className='flex flex-col justify-center items-center gap-5'>
				<div className='max-w-[50rem] w-full flex'>
					<Button
						onClick={() =>
							data &&
							volunteerWork &&
							exportToExcel(
								data
									.filter(
										participant =>
											participant.status == 'ACCEPTED' ||
											participant.status === 'FINISH',
									)
									.map((participant, index) => ({
										STT: index + 1,
										'Họ và tên': participant.studentId.name,
										'Ngày sinh': format(
											participant.studentId.dob,
											'dd/MM/yyyy',
										),
										'Giới tính': participant.studentId.gender ? 'Nam' : 'Nữ',
										'Số điện thoại': participant.studentId.phoneNumber,
										Trường: participant.studentId.school,
										Khoa: participant.studentId.faculty,
										MSSV: participant.studentId.studentCode,
										'Ngày tham gia': format(
											participant.createdAt,
											'dd/MM/yyyy',
										),
										'Trạng thái':
											participant.status === 'ACCEPTED' ? '' : 'Đã hoàn thành',
										'Điểm đánh giá': participant.rating || 'Chưa đánh giá',
									})),
								'Danh sách thành viên',
								`Danh sách thành viên_${volunteerWork.title}.xlsx`,
							)
						}
						className='ml-auto'
						variant={'secondary'}
					>
						<DocumentDownload
							size={16}
							variant='Bold'
							className='mr-2 text-primary-500'
						/>
						Xuất file excel
					</Button>
				</div>
				<div className='flex flex-col max-w-[50rem] w-full'>
					{data &&
						data
							.filter(
								participant =>
									participant.status == 'ACCEPTED' ||
									participant.status === 'FINISH',
							)
							.map((member, index) => {
								return (
									<div
										key={index}
										className='flex items-center max-md:flex-wrap max-md:gap-y-4 py-4 px-5 border-b border-solid border-black/10'
									>
										<p className='md:w-12 w-6 text-center mr-2 font-medium text-base'>
											{index + 1}
										</p>

										<div className='flex items-center gap-4 lg:w-[21.875rem] w-[19.875rem] max-md:flex-1'>
											<Link href={routes.profile.gen(member.studentId._id)}>
												<Image
													src={member.studentId.avatarUrl}
													alt=''
													height={512}
													width={512}
													className='w-12 h-12 rounded-full'
												/>
											</Link>
											<Link
												href={routes.profile.gen(member.studentId._id)}
												className='font-medium text-sm'
											>
												{member.studentId.name}
											</Link>
										</div>

										<div className=' flex items-center justify-between gap-5 ml-auto max-md:pl-8 max-md:order-1 max-md:w-full'>
											{member.rating ? (
												<span>Đã đánh giá</span>
											) : (
												<Feedback data={member} />
											)}

											<Dialog>
												<DialogTrigger>
													<div className='flex items-center text-sm gap-2 px-4 py-2 border border-solid border-red-600 text-red-600 hover:bg-red-100/50 transition-all cursor-pointer rounded-xl w-full max-md:order-1'>
														<Bin className='w-4 h-4 md:hidden' />
														<span className='max-md:hidden'>Xóa</span>
													</div>
												</DialogTrigger>
												<DialogContent className='max-w-[90%] w-[28rem]'>
													<DialogHeader>
														<DialogTitle className='leading-normal mt-2'>
															Bạn có chắc chắn muốn xóa sinh viên dưới đây
															không?
														</DialogTitle>
														<div className='flex flex-col items-center gap-4 py-4'>
															<Image
																src={member.studentId.avatarUrl}
																alt=''
																height={512}
																width={512}
																className='w-14 h-14 rounded-full'
															/>
															<p className='font-semibold text-base'>
																{member.studentId.name}
															</p>
														</div>
														<DialogDescription>
															Hành động này không thể được hoàn tác và sẽ dẫn
															đến việc loại bỏ sinh viên khỏi hoạt động tình
															nguyện này của bạn.{' '}
														</DialogDescription>
													</DialogHeader>

													<DialogFooter className='flex gap-2 mt-2'>
														<div className='py-2 px-4 rounded-xl bg-red-500 transition-all hover:opacity-80 font-medium text-white flex-1 text-center cursor-pointer max-sm:order-2'>
															Chắc chắn
														</div>
														<DialogClose asChild>
															<div className='py-2 px-4 rounded-xl border border-solid border-gray-300 transition-all hover:bg-gray-100/50  font-medium flex-1 text-center cursor-pointer max-sm:order-1'>
																Hủy
															</div>
														</DialogClose>
													</DialogFooter>
												</DialogContent>
											</Dialog>
										</div>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Link
														href={routes.profile.gen(member.studentId._id)}
														className='flex ml-2 p-2 rounded-xl bg-white hover:bg-gray-100/80 transition-all cursor-pointer'
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

// function Rating() {
// 	const [ratingClick, setRatingClick] = useState<number>(0)
// 	const [ratingHover, setRatingHover] = useState<number>(0)

// 	const handleHover = (rate: number) => {
// 		setRatingHover(rate)
// 	}

// 	const handleClick = (rate: number) => {
// 		setRatingClick(rate)
// 	}

// 	const handleLeaveHover = () => {
// 		setRatingHover(ratingClick)
// 	}

// 	return (
// 		<div className='flex'>
// 			{[...Array(5)].map((_, index) => {
// 				return (
// 					<TooltipProvider>
// 						<Tooltip>
// 							<TooltipTrigger>
// 								<Flash
// 									key={index}
// 									size={18}
// 									variant='Bold'
// 									className='transition-all cursor-pointer hover:scale-[1.15]'
// 									color={index + 1 <= ratingHover ? '#fbbf24' : '#000000'}
// 									onMouseEnter={() => handleHover(index + 1)}
// 									onMouseLeave={handleLeaveHover}
// 									onClick={() => handleClick(index + 1)}
// 								/>
// 							</TooltipTrigger>
// 							<TooltipContent>
// 								<p>{rate[index]}</p>
// 							</TooltipContent>
// 						</Tooltip>
// 					</TooltipProvider>
// 				)
// 			})}
// 		</div>
// 	)
// }

export default Member
