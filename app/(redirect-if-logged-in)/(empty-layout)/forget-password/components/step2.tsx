'use client'

import authApi from '@/apis/auth'
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
import { ArrowLeft, ArrowRight } from 'iconsax-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCountdown } from 'usehooks-ts'
import { z } from 'zod'

const formSchema = z.object({
	newPassword: z
		.string()
		.min(1, 'Mật khẩu không được để trống')
		.min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
		.regex(
			patterns.password,
			'Mật khẩu phải chứa ít nhất 1 chữ số, 1 chữ thường, 1 chữ hoa',
		),
	otpCode: z
		.string()
		.min(1, 'Mã xác thực không được để trống')
		.regex(patterns.otpCode, 'Mã xác thực không hợp lệ'),
})

export default function Step2({
	email,
	onPrevStep,
}: {
	email: string
	onPrevStep: () => void
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			newPassword: '',
			otpCode: '',
		},
	})

	const [count, { startCountdown, stopCountdown, resetCountdown }] =
		useCountdown({
			countStart: 30,
		})

	const { toast } = useToast()
	const router = useRouter()

	const { mutate , isPending} = useMutation({
		mutationFn: authApi.changePassword,
		onError(error) {
			toast({
				title: 'Đặt lại mật khẩu thất bại',
				description: error.message,
			})
		},
		onSuccess() {
			toast({
				description: 'Đặt lại mật khẩu thành công',
			})
			router.push(routes.logIn)
		},
	})

	const { mutate: resendCode } = useMutation({
		mutationFn: authApi.sendOtpCode,
		onSuccess() {
			toast({
				description: 'Mã xác thực đã được gửi đến email của bạn',
			})
		},
	})

	useEffect(() => {
		startCountdown()
		return () => {
			stopCountdown()
		}
	}, [startCountdown, stopCountdown])

	function resendOtpCode() {
		resendCode(email)
		resetCountdown()
		startCountdown()
	}

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate({
			email,
			...values,
		})
	}

	return (
		<Form {...form}>
			{isPending && <Loader />}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h1 className='text-2xl font-bold mb-2'>Đặt lại mật khẩu</h1>
				<h2 className='mb-6'>
					Mã xác thực đã được gửi đến email{' '}
					<span className='text-sm font-medium'>{email}</span>
				</h2>

				<div className='space-y-4'>
					<FormField
						control={form.control}
						name='newPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mật khẩu mới</FormLabel>
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
					<div>
						<FormField
							control={form.control}
							name='otpCode'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mã xác thực</FormLabel>
									<FormControl>
										<Input placeholder='XXXXXXXX' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className='flex items-center justify-between mt-8'>
					<Button className=''>
						Tiếp tục
						<ArrowRight className='ml-2 h-5' />
					</Button>

					<button
						disabled={count > 0}
						onClick={resendOtpCode}
						className='text-primary-500 font-medium text-sm disabled:opacity-80 flex items-center'
					>
						{count > 0 && (
							<span className='text-xs text-primary-400 font-normal mr-1'>
								({count})
							</span>
						)}
						Gửi lại mã
					</button>
				</div>
				<Button
					className='mt-6 w-full rounded-full group'
					size='lg'
					variant='outline'
					type='button'
					onClick={onPrevStep}
				>
					<ArrowLeft className='mr-2 h-5 transition-all ease-out ml-2 group-hover:mr-4 group-hover:ml-0' />
					Quay lại
				</Button>
			</form>
		</Form>
	)
}
