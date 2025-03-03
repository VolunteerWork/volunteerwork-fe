'use client'

import Alignment from '@/components/ui/alignment'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/date-picker'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import patterns from '@/configs/patterns'
import useAuth from '@/hooks/use-auth'
import { Person } from '@/interfaces/person'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AvatarUpdate from '../components/avatar-update'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import personsApi from '@/apis/persons'
import { useToast } from '@/hooks/use-toast'
import queryKeys from '@/configs/query-keys'
import Loader from '@/components/ui/loader'

const formSchema = z.object({
	name: z.string().min(1, 'Họ và tên không được để trống'),
	dob: z.date({
		required_error: 'Ngày sinh không được để trống',
	}),
	phoneNumber: z
		.string()
		.min(1, 'Số điện thoại không được để trống')
		.regex(patterns.phoneNumber, 'Số điện thoại không hợp lệ'),
	gender: z.string().min(1, 'Giới tính không được để trống'),
	school: z.string().min(1, 'Trường không được để trống'),
	faculty: z.string().min(1, 'Khoa không được để trống'),
	studentCode: z.string().min(1, 'Mã sinh viên không được để trống'),
	quote: z.string().optional(),
})

export default function PersonForm() {
	const { accountInfo } = useAuth()
	const data = accountInfo as Person

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data?.name,
			dob: new Date(data?.dob),
			phoneNumber: data?.phoneNumber,
			faculty: data?.faculty,
			gender: data?.gender ? 'male' : 'female',
			school: data?.school,
			studentCode: data?.studentCode,
			quote: data?.quote || '',
		},
	})

	const { toast } = useToast()
	const queryClient = useQueryClient()

	const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
		mutationFn: personsApi.uploadAvatar,
		onSuccess() {
			toast({
				description: 'Cập nhật ảnh đại diện thành công',
			})
			queryClient.refetchQueries({ queryKey: queryKeys.account })
		},
		onError(error) {
			toast({
				title: 'Cập nhật ảnh đại diện thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	const { mutate, isPending } = useMutation({
		mutationFn: personsApi.update,
		onSuccess() {
			toast({
				description: 'Cập nhật thông tin cá nhân thành công',
			})
			queryClient.refetchQueries({ queryKey: queryKeys.account })
		},
		onError(error) {
			toast({
				title: 'Cập nhật thông tin cá nhân thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate({ ...values, gender: values.gender === 'male' })
	}

	return (
		data && (
			<div>
				{(isUploading || isPending) && <Loader />}
				<AvatarUpdate initialAvatar={data.avatarUrl} onSubmit={uploadAvatar} />

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Họ và tên</FormLabel>
										<FormControl>
											<Input placeholder='Phạm Hoàng Vinh' {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex space-x-4'>
								<FormField
									control={form.control}
									name='dob'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>Ngày sinh</FormLabel>
											<DatePicker field={field} />

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='gender'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>Giới tính</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='-- Chọn giới tính --' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='male'>Nam</SelectItem>
													<SelectItem value='female'>Nữ</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='school'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Trường</FormLabel>
										<FormControl>
											<Input
												placeholder='Trường Đại học Công nghệ Thông tin'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='faculty'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Khoa</FormLabel>
										<FormControl>
											<Input
												placeholder='Khoa Khoa học và Kĩ thuật Thông tin'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex space-x-3'>
								<FormField
									control={form.control}
									name='studentCode'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mã sinh viên</FormLabel>
											<FormControl>
												<Input placeholder='XXXXXXXX' {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='phoneNumber'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Số điện thoại</FormLabel>
											<FormControl>
												<Input placeholder='XXX-XXXX-XXXX' {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='quote'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Lời châm ngôn
											<span className='font-light'> (tùy chọn)</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder='Hãy làm điều bạn thích, và thích điều bạn làm.'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Alignment align='right' className='mt-10'>
							<Button size='lg'>Cập nhật</Button>
						</Alignment>
					</form>
				</Form>
			</div>
		)
	)
}
