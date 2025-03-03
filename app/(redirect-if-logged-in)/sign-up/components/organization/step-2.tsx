'use client'

import authApi, {
	OrganizationSignUpData
} from '@/apis/auth'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Loader from '@/components/ui/loader'
import patterns from '@/configs/patterns'
import routes from '@/configs/routes'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft } from 'iconsax-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

const formSchema = z
	.object({
		password: z
			.string()
			.min(1, 'Mật khẩu không được để trống')
			.min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
			.regex(
				patterns.password,
				'Mật khẩu phải chứa ít nhất 1 chữ số, 1 chữ thường, 1 chữ hoa',
			),
		confirmPassword: z
			.string()
			.min(1, 'Xác nhận mật khẩu không được để trống')
			.min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Mật khẩu không khớp',
		path: ['confirmPassword'],
	})

export default function Step2({
	data,
	onPrevStep,
}: {
	data: OrganizationSignUpData
	onPrevStep: () => void
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	})

	const setEmail = useLocalStorage('email', '')[1]

	const { toast } = useToast()

	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationFn: authApi.organizationSignUp,
		onSuccess: () => {
			setEmail(data.account.email)
			router.push(routes.activeAccount)
		},
		onError: error => {
			toast({
				title: 'Đăng ký thất bại',
				description: error.message,
			})
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		const finalData = {
			...data,
			account: { ...data.account, password: values.password },
		}
		mutate(finalData)
	}

	return (
		<Form {...form}>
			{isPending && <Loader />}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mật khẩu</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='********'
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
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nhập lại mật khẩu</FormLabel>
								<FormControl>
									<Input type='password' placeholder='********' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button className='w-full mt-10' size='lg'>
					Đăng ký
				</Button>
				<Button
					className='w-full mt-6 rounded-full group'
					size='lg'
					variant='outline'
					onClick={onPrevStep}
				>
					<ArrowLeft className='h-5 mr-2 transition-all ml-2 group-hover:mr-4 group-hover:ml-0 ease-out' />
					Quay lại
				</Button>
			</form>
		</Form>
	)
}
