'use client'

import Alignment from '@/components/ui/alignment'
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
import routes from '@/configs/routes'
import useAuth from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	email: z
		.string()
		.min(1, 'Email không được để trống')
		.email('Email không hợp lệ'),
	password: z
		.string()
		.min(1, 'Mật khẩu không được để trống')
		.min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
})

export default function Personal() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const { toast } = useToast()
	const { logIn, isLoggingIn } = useAuth()

	function onSubmit(values: z.infer<typeof formSchema>) {
		logIn(values)
	}

	return (
		<Form {...form}>
			{isLoggingIn && <Loader />}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='space-y-4'>
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
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mật khẩu</FormLabel>
								<FormControl>
									<Input type='password' placeholder='********' {...field} />
								</FormControl>

								<FormMessage />

								<Alignment align='right'>
									<Link
										href={routes.forgetPassword}
										className='text-primary-500 font-medium'
									>
										Quên mật khẩu?
									</Link>
								</Alignment>
							</FormItem>
						)}
					/>
				</div>

				<Button className='w-full mt-10' size='lg'>
					Đăng nhập
				</Button>
				<Button
					className='w-full mt-6 rounded-full'
					size='lg'
					variant='outline'
					asChild
				>
					<Link href={routes.signUp}>Tạo tài khoản mới</Link>
				</Button>
			</form>
		</Form>
	)
}
