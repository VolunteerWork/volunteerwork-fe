'use client'

import { PersonalSignUpData } from '@/apis/auth'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/ui/date-picker'
import {
	Form,
	FormControl,
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
import routes from '@/configs/routes'
import { getRandomAvatar } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'iconsax-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, 'Họ và tên không được để trống'),
	email: z
		.string()
		.min(1, 'Email không được để trống')
		.email('Email không hợp lệ'),
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
})

export default function Step1({
	data,
	onNextStep,
}: {
	onNextStep: (data: PersonalSignUpData) => void
	data?: PersonalSignUpData
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data?.name ?? '',
			email: data?.account.email ?? '',
			dob: data?.dob ?? undefined,
			phoneNumber: data?.phoneNumber ?? '',
			faculty: data?.faculty ?? '',
			school: data?.school ?? '',
			studentCode: data?.studentCode ?? '',
			gender: data?.gender ? (data.gender === true ? 'male' : 'female') : '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { email, gender, ...rest } = values
		onNextStep({
			...rest,
			account: {
				email,
				password: '',
			},
			gender: gender === 'male',
			avatarUrl: getRandomAvatar(gender == 'male', rest.name),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='space-y-3'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Họ và tên</FormLabel>
								<FormControl>
									<Input placeholder='Phạm Hoàng Vinh' autoFocus {...field} />
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
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='example@gmail.com'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button className='w-full mt-10' size='lg'>
					Tiếp tục
				</Button>
				<Button
					className='w-full mt-6 rounded-full group'
					size='lg'
					variant='outline'
					asChild
				>
					<Link href={routes.logIn}>
						<ArrowLeft className='h-5 mr-2 transition-all ml-2 group-hover:mr-4 group-hover:ml-0 ease-out' />
						Quay lại Đăng nhập
					</Link>
				</Button>
			</form>
		</Form>
	)
}
