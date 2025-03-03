'use client'

import authApi from '@/apis/auth'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Loader from '@/components/ui/loader'
import routes from '@/configs/routes'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight } from 'iconsax-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	email: z
		.string()
		.min(1, 'Email không được để trống')
		.email('Email không hợp lệ'),
})

export default function Step1({
	onNextStep,
}: {
	onNextStep: (email: string) => void
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	})

	const { toast } = useToast()

	const { mutate, isPending } = useMutation({
		mutationFn: authApi.sendOtpCode,
		onSuccess() {
			toast({
				description: 'Mã xác thực đã được gửi đến email của bạn',
			})
			onNextStep(form.getValues('email'))
		},
		onError(error) {
			toast({
				title: 'Gửi mã xác thực thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values.email)
	}

	return (
		<Form {...form}>
			{isPending && <Loader />}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h1 className='text-2xl font-bold mb-2'>Khôi phục mật khẩu</h1>
				<h2 className='mb-6'>
					Nhập email dùng để đăng kí để khôi phục lại mật khẩu
				</h2>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='email'
									placeholder='example@gmail.com'
									autoFocus
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='mt-8'>
					Tiếp tục
					<ArrowRight className='ml-2 h-5' />
				</Button>
				<Button
					className='mt-6 w-full rounded-full group'
					size='lg'
					variant='outline'
					asChild
				>
					<Link href={routes.logIn}>
						<ArrowLeft className='mr-2 h-5 transition-all ease-out ml-2 group-hover:mr-4 group-hover:ml-0' />
						Quay lại đăng nhập
					</Link>
				</Button>
			</form>
		</Form>
	)
}
