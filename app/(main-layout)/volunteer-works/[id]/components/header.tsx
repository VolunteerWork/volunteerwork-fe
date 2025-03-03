'use client'

import participantsApi from '@/apis/participants'
import volunteerWorksApi from '@/apis/volunteer-works'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { Skeleton } from '@/components/ui/skeleton'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import useAuth from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { cn, getEndDateOfVolunteerWork, getRandomTextAvatar } from '@/lib/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { differenceInSeconds, format, isBefore } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCountdown, useDocumentTitle } from 'usehooks-ts'

export default function Header() {
	const { id } = useParams<{ id: string }>()

	const { accountInfo, isOrganization } = useAuth()

	const { data, isSuccess, isLoading, error } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	const { data: participants, isLoading: isParticipantsLoading } = useQuery({
		queryKey: queryKeys.participantsByVolunteerWork.gen(id),
		queryFn: () =>
			participantsApi.getByVolunteerWork({
				volunteerWorkId: id,
			}),
	})

	const router = useRouter()
	const pathname = usePathname()

	const [count, { startCountdown, resetCountdown }] = useCountdown({
		countStart: data
			? differenceInSeconds(data.endRegisteredDate, new Date())
			: 0,
		intervalMs: 1000,
	})

	const queryClient = useQueryClient()

	const { toast } = useToast()

	const { mutate, isPending } = useMutation({
		mutationFn: participantsApi.joinVolunteerWork,
		onSuccess() {
			toast({
				description: 'Gửi yêu cầu đăng kí thành công',
			})
			queryClient.refetchQueries({
				queryKey: queryKeys.participantsByVolunteerWork.gen(id),
			})
		},
		onError(error) {
			toast({
				title: 'Đăng ký thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	useEffect(() => {
		if (error || (isSuccess && !data)) {
			notFound()
		}
	}, [data, error, isSuccess])

	useEffect(() => {
		if (data) {
			resetCountdown()
			startCountdown()
		}
	}, [data, resetCountdown, startCountdown])

	useDocumentTitle(data?.title || 'Chi tiết công việc tình nguyện', {
		preserveTitleOnUnmount: false,
	})

	return (
		<>
			{isPending && <Loader />}
			{data && participants && (
				<div className='mb-9'>
					<div className='max-lg:aspect-w-16 max-lg:aspect-h-8 max-sm:aspect-w-16 max-sm:aspect-h-9 mb-4'>
						<Image
							alt='banner'
							src={data.imageUrl}
							width={2048}
							height={2048}
							className='w-full lg:h-auto h-full object-cover rounded-2xl'
						/>
					</div>

					<h1 className='text-2xl font-semibold'>{data.title}</h1>

					<div className='flex items-center mt-2'>
						<span
							className={cn(
								'py-1.5 px-4 rounded-lg bg-amber-300 text-xs font-medium inline-block',
								!isBefore(new Date(), getEndDateOfVolunteerWork(data)) &&
									'bg-slate-200',
							)}
						>
							{isBefore(new Date(), getEndDateOfVolunteerWork(data))
								? 'Đang diễn ra'
								: 'Đã kết thúc'}
						</span>

						<p className='text-sm ml-4'>
							<strong className='font-medium'>Thời gian: </strong>
							{format(data.createdAt, 'd/M/yyyy')} -{' '}
							{format(getEndDateOfVolunteerWork(data), 'd/M/yyyy')}
						</p>
					</div>

					<div className='mt-3 flex items-center justify-between'>
						<div>
							<span className='text-sm'>
								Đã tham gia{' '}
								{
									participants.filter(
										participant =>
											participant.status === 'ACCEPTED' ||
											participant.status === 'FINISH',
									).length
								}
							</span>
							{participants.filter(
								participant =>
									participant.status === 'ACCEPTED' ||
									participant.status === 'FINISH',
							).length > 0 && (
								<div className='flex items-center -space-x-1.5 mt-1'>
									{participants
										.filter(
											participant =>
												participant.status === 'ACCEPTED' ||
												participant.status === 'FINISH',
										)
										.slice(0, 5)
										.map((participant, index) => (
											<Image
												key={index}
												alt='avatar'
												src={participant.studentId.avatarUrl}
												width={36}
												height={36}
												className='rounded-full object-cover w-9 h-9 border-2 border-white'
											/>
										))}
									{participants.filter(
										participant => participant.status === 'ACCEPTED',
									).length > 5 && (
										<Image
											alt='avatar'
											src={getRandomTextAvatar('...')}
											width={36}
											height={36}
											className='rounded-full object-cover w-9 h-9 border-2 border-white'
										/>
									)}
								</div>
							)}
						</div>

						<div className='flex flex-col items-center'>
							{accountInfo && accountInfo._id == data.organization._id ? (
								<Button asChild>
									<Link href={routes.volunteerWorks.manage.edit.gen(id)}>
										Quản lí
									</Link>
								</Button>
							) : accountInfo &&
							  participants &&
							  participants.find(
									participant => participant.studentId._id === accountInfo._id,
							  ) ? (
								<Button variant='outline'>
									{(() => {
										const status = participants.find(
											participant =>
												participant.studentId._id === accountInfo._id,
										)!.status

										return status === 'ACCEPTED' || status === 'FINISH'
											? 'Đã tham gia'
											: status === 'WAITING'
											? 'Đang chờ duyệt'
											: 'Bị từ chối'
									})()}
								</Button>
							) : (
								<Button
									disabled={count <= 0 || isOrganization}
									onClick={() => {
										if (!accountInfo) {
											router.push(routes.logIn + '?redirect=' + pathname)
											toast({
												description: 'Vui lòng đăng nhập để tham gia',
											})
											return
										}
										mutate(data._id)
									}}
								>
									Đăng ký ngay
								</Button>
							)}

							<span className='mt-1'>
								{count > 0
									? `${Math.floor(count / 86400)}:${Math.floor(
											(count % 86400) / 3600,
									  )}:${Math.floor((count % 3600) / 60)}:${count % 60}`
									: '00:00:00'}
							</span>
						</div>
					</div>
				</div>
			)}

			{(isLoading || isParticipantsLoading) && (
				<div className='mb-9'>
					<div className='max-lg:aspect-w-16 max-lg:aspect-h-8 max-sm:aspect-w-16 max-sm:aspect-h-9 mb-4'>
						<Skeleton className='w-full lg:aspect-w-16 lg:aspect-h-5 h-full object-cover rounded-2xl' />
					</div>

					<Skeleton className='h-8 w-96 max-w-full font-semibold' />

					<div className='flex items-center mt-2'>
						<Skeleton className='h-7 w-36' />

						<Skeleton className='h-5 w-72 max-w-full ml-4' />
					</div>

					<div className='mt-3 flex items-center justify-between'>
						<div>
							<Skeleton className='h-5 w-36' />
							<div className='flex items-center -space-x-1 mt-1'>
								{[...Array(5)].map((_, index) => (
									<Skeleton
										key={index}
										className='rounded-full object-cover w-9 h-9 border-2 border-white'
									/>
								))}
							</div>
						</div>

						<div className='flex flex-col items-center'>
							<Button>Đăng ký ngay</Button>
							<Skeleton className='mt-1 h-7 w-28' />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
