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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import Loader from '@/components/ui/loader'
import routes from '@/configs/routes'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight } from 'iconsax-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCountdown, useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

const formSchema = z.object({
	otpCode: z.string().min(1, 'Mã xác thực không được để trống'),
})

export default function ActiveAccountForm() {
	const [email, _, removeEmail] = useLocalStorage<string>('email', '')

	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			otpCode: '',
		},
	})

	const { toast } = useToast()

	console.log(email)

	const [count, { startCountdown, stopCountdown, resetCountdown }] =
		useCountdown({
			countStart: 30,
		})

	const { mutate, isPending } = useMutation({
		mutationFn: authApi.activeAccount,
		onSuccess: () => {
			removeEmail()
			toast({
				description: 'Xác thực tài khoản thành công',
			})
		},
		onError: error => {
			toast({
				title: 'Xác thực tài khoản thất bại',
				description: error.message,
				variant: 'destructive',
			})
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
		if (!email) {
			router.push(routes.logIn)
		}

		startCountdown()
		return () => {
			stopCountdown()
		}
	}, [email, removeEmail, router, startCountdown, stopCountdown])

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate({
			email,
			otpCode: values.otpCode,
		})
	}

	function resendOptCode() {
		resendCode(email)
		resetCountdown()
		startCountdown()
	}

	return (
		<Form {...form}>
			{isPending && <Loader />}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<h1 className='text-2xl font-bold mb-2'>Xác thực tài khoản</h1>
				<h2 className='mb-8'>
					Để tiếp tục, vui lòng nhập mã xác thực đã được gửi đến email của bạn
				</h2>
				<FormField
					control={form.control}
					name='otpCode'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>

							<FormMessage className='text-center' />
						</FormItem>
					)}
				/>
				<div className='flex justify-between items-center mt-10'>
					<Button className=''>
						Tiếp tục
						<ArrowRight className='ml-2 h-5' />
					</Button>

					<button
						disabled={count > 0}
						onClick={resendOptCode}
						className='text-primary-500 font-medium text-sm disabled:opacity-80 flex items-center'
					>
						{count > 0 && (
							<span className='text-xs text-primary-400 font-normal mr-1'>
								({count})
							</span>
						)}
						Gửi lại mã{' '}
					</button>
				</div>
				<Button
					className='mt-6 w-full rounded-full group'
					size='lg'
					variant='outline'
					asChild
				>
					<Link href={routes.logIn}>
						<ArrowLeft className='mr-2 h-5 transition-all ml-2 group-hover:mr-4 group-hover:ml-0 ease-out' />
						Quay lại đăng nhập
					</Link>
				</Button>
			</form>
		</Form>
	)
}
