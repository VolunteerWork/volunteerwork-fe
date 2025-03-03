'use client'

import { OrganizationSignUpData } from '@/apis/auth'
import Tiptap from '@/components/ui/tiptap'
import { Button } from '@/components/ui/button'
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
import routes from '@/configs/routes'
import { getRandomTextAvatar } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'iconsax-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, 'Tên tổ chức không được để trống'),
	email: z
		.string()
		.min(1, 'Email không được để trống')
		.email('Email không hợp lệ'),
	affiliatedUnit: z.string().min(1, 'Đơn vị trực thuộc không được để trống'),
	description: z.string().min(1, 'Mô tả không được để trống'),
	contactInfo: z.string().min(1, 'Thông tin liên hệ không được để trống'),
})

export default function Step1({
	data,
	onNextStep,
}: {
	onNextStep: (data: OrganizationSignUpData) => void
	data?: OrganizationSignUpData
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data?.name ?? '',
			email: data?.account.email ?? '',
			affiliatedUnit: data?.affiliatedUnit ?? '',
			description: data?.description ?? '',
			contactInfo: data?.contactInfo ?? '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		const { email, ...rest } = values
		onNextStep({
			...rest,
			account: {
				email,
				password: '',
			},
			avatarUrl: getRandomTextAvatar(values.name),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='space-y-5'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên tổ chức</FormLabel>

								<FormControl>
									<Input
										placeholder='Đội Công Tác Xã Hội'
										autoFocus
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='affiliatedUnit'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Đơn vị trực thuộc</FormLabel>
								<FormControl>
									<Input
										placeholder='Trường Đại học Công nghệ Thông tin'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Đơn vị trực thuộc của tổ chức (ví dụ: trường, khoa, ...)
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mô tả</FormLabel>
								<FormControl>
									<Tiptap
										value={field.value}
										onChange={field.onChange}
										className='min-h-36'
									/>
								</FormControl>
								<FormDescription>
									Mô tả tổ chức, hoạt động của tổ chức, mục tiêu, ...
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='contactInfo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Thông tin liên hệ</FormLabel>
								<FormControl>
									<Tiptap
										value={field.value}
										onChange={field.onChange}
										className='min-h-36'
									/>
								</FormControl>
								<FormDescription>
									Thông tin liên hệ của tổ chức (email, điện thoại, địa chỉ,
									...)
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

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
