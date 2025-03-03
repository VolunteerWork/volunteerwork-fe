'use client'
import volunteerWorksApi from '@/apis/volunteer-works'
import { Bin } from '@/assets/icon'
import { Button } from '@/components/ui/button'
import queryKeys from '@/configs/query-keys'
import useAuth from '@/hooks/use-auth'
import useProtectedRoute from '@/hooks/use-protected-route'
import { AccountRole } from '@/interfaces/account-role'
import { cn } from '@/lib/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	ArrowLeft,
	CalendarTick,
	Edit2,
	Note1,
	ProfileAdd,
} from 'iconsax-react'
import Link from 'next/link'
import { notFound, useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import routes from '@/configs/routes'

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

function OrganizeManage({ children }: { children: ReactNode }) {
	useProtectedRoute(AccountRole.ORGANIZATION)

	const router = useRouter()
	const pathName = usePathname()

	const { id } = useParams<{ id: string }>()

	const items = [
		{
			title: 'Chỉnh sửa hoạt động',
			icon: Edit2,
			link: routes.volunteerWorks.manage.edit.gen(id),
		},
		{
			title: 'Yêu cầu tham gia',
			icon: ProfileAdd,
			link: routes.volunteerWorks.manage.requestJoin.gen(id),
		},
		{
			title: 'Danh sách sinh viên',
			icon: Note1,
			link: routes.volunteerWorks.manage.members.gen(id),
		},
		{
			title: 'Quản lí sự kiện',
			icon: CalendarTick,
			link: routes.volunteerWorks.manage.events.gen(id),
		},
	]

	const { accountInfo } = useAuth()

	const { data, isSuccess, error } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	useEffect(() => {
		if (
			error ||
			(isSuccess && !data) ||
			(data && accountInfo && data.organization._id != accountInfo._id)
		) {
			notFound()
		}
	}, [accountInfo, data, error, isSuccess])

	const { toast } = useToast()
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationFn: volunteerWorksApi.deleteVolunteerWork,
		onSuccess() {
			toast({
				description: 'Xóa hoạt động tình nguyện thành công',
			})

			queryClient.refetchQueries({
				queryKey: queryKeys.volunteerByOrganization.gen(data?.organization._id),
			})

			router.push(routes.organizations.gen(data?.organization._id))
		},
		onError(error) {
			toast({
				title: 'Xóa hoạt động tình nguyện thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	return (
		<div className='flex'>
			<div className='grid grid-cols-12 container mx-auto  md:gap-5 sm:gap-10'>
				<div className='lg:col-span-3 md:col-span-1 sm:col-span-2 sm:w-full'>
					<div
						className={cn(
							'w-full flex flex-col gap-3 sm:gap-6 sm:sticky sm:top-[6rem]',
							'fixed max-sm:bg-white max-sm:shadow-inner max-sm:left-0 max-sm:bottom-0 max-sm:w-fit max-sm:flex-row max-sm:z-50 rounded-tr-xl',
						)}
					>
						<Button
							className='group xl:ml-6 w-fit group/animation text-black !bg-transparent px-0 relative mb-6 max-lg:hidden'
							asChild
						>
							<Link href={routes.volunteerWorks.gen(id)}>
								<ArrowLeft className='ml-2 h-5 transition-all mr-2 group-hover:mr-4 group-hover:ml-0 ease-out' />
								Quay lại
								<div className='absolute w-full bg-black h-px bottom-0 rounded-full transition-transform ease-in-out duration-500 scale-0 origin-right group-hover/animation:scale-100 group-hover/animation:origin-left'></div>
							</Link>
						</Button>

						{items.map((item, index) => {
							let Icon = item.icon

							return (
								<div
									key={index}
									className={cn(
										'flex items-center xl:pl-6 max-sm:py-4 max-sm:px-3 py-2 gap-4 relative cursor-pointer text-gray-700 font-medium',
										item.link == pathName
											? 'font-semibold text-primary-400'
											: '',
									)}
									onClick={() => router.push(item.link)}
								>
									<div
										className={cn(
											'flex',
											item.link == pathName
												? 'text-primary-400'
												: 'text-gray-700',
										)}
									>
										<Icon size={24} />
									</div>
									<p className='max-lg:hidden'>{item.title}</p>

									{item.link == pathName && (
										<div className='absolute sm:top-0 bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full right-0 sm:w-1 max-sm:h-1 rounded-l-full bg-primary-400'></div>
									)}
								</div>
							)
						})}
						<Dialog>
							<DialogTrigger>
								<div className='xl:ml-6 p-2 mt-6 flex-1 max-lg:hidden flex items-center justify-center gap-2 border border-solid text-red-500 border-red-500 rounded-lg hover:bg-red-50 transition-all cursor-pointer'>
									<Bin className='w-4 h-4' />
									<p className='max-lg:hidden'>Xóa hoạt động</p>
								</div>
								<div className='lg:hidden text-red-500 w-full sm:mt-6 max-sm:py-4 max-sm:px-3'>
									<Bin className='w-6 h-6' />
								</div>
							</DialogTrigger>
							<DialogContent className='max-w-[90%] w-[28rem]'>
								<DialogHeader>
									<DialogTitle className='leading-normal my-2 text-center'>
										Bạn có chắc chắn muốn xóa{' '}
										<strong>HOẠT ĐỘNG TÌNH NGUYỆN</strong> dưới đây không?
									</DialogTitle>
									<DialogDescription>
										Hành động này không thể được hoàn tác và sẽ dẫn đến việc
										loại bỏ sự kiện này khỏi hoạt động tình nguyện của bạn.
									</DialogDescription>
								</DialogHeader>

								<DialogFooter className='flex gap-2 mt-2'>
									<div
										className='py-2 px-4 rounded-md bg-red-500 transition-all hover:opacity-80 font-medium text-white flex-1 text-center cursor-pointer max-sm:order-2'
										onClick={() => mutate(id)}
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
				</div>
				<div className='lg:col-span-9 md:col-span-11 sm:col-span-10 col-span-12'>
					<div className='flex items-center'>
						<Button
							className='group xl:ml-6 group/animation lg:hidden text-black !bg-transparent px-0 relative'
							asChild
						>
							<Link href={routes.volunteerWorks.gen(id)}>
								<ArrowLeft className='ml-2 h-5 transition-all mr-2 group-hover:mr-4 group-hover:ml-0 ease-out' />
								Quay lại
								<div className='absolute w-full bg-black h-px bottom-0 rounded-full transition-transform ease-in-out duration-500 scale-0 origin-right group-hover/animation:scale-100 group-hover/animation:origin-left'></div>
							</Link>
						</Button>
					</div>
					<div className='lg:py-16 py-12 flex'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default OrganizeManage
