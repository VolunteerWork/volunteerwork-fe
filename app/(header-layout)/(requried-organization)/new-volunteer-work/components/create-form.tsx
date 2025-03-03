'use client'

import volunteerWorksApi from '@/apis/volunteer-works'
import Alignment from '@/components/ui/alignment'
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
import Loader from '@/components/ui/loader'
import Tiptap from '@/components/ui/tiptap'
import routes from '@/configs/routes'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	title: z.string().min(1, 'Tên hoạt động không được để trống'),
	description: z.string().min(1, 'Mô tả không được để trống'),
	receivedCoins: z.coerce
		.number()
		.int()
		.min(1, 'Số lượng điểm nhận được phải lớn hơn 0')
		.max(50, 'Số lượng điểm nhận được phải nhỏ hơn 20'),
	contactInfo: z.string().min(1, 'Thông tin liên hệ không được để trống'),
	benefits: z.string().min(1, 'Quyền lợi tham gia không được để trống'),
	requirements: z.string().min(1, 'Đối tượng tham gia không được để trống'),
	image: z.custom((file) => {
		if (typeof window !== 'undefined' && file instanceof File) {
		  return file.size < 5000000 || 'Kích thước ảnh không được vượt quá 5MB';
		}
		return 'Ảnh banner không được để trống';
	}),
	endRegisteredDate: z
		.string()
		.min(1, 'Ngày kết thúc đăng ký không được để trống'),
})

export default function CreateForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			endRegisteredDate: '',
			receivedCoins: 10,
			contactInfo: '',
			benefits: '',
			requirements: '',
		},
	})

	const router = useRouter()
	const { toast } = useToast()

	const { mutate, isPending } = useMutation({
		mutationFn: volunteerWorksApi.createNew,
		onSuccess: data => {
			toast({
				description: 'Tạo hoạt động tình nguyện thành công',
			})
			router.push(routes.volunteerWorks.gen(data!._id))
		},
		onError: error => {
			toast({
				title: 'Tạo hoạt động tình nguyện thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	function onSubmit({
		image,
		endRegisteredDate,
		...data
	}: z.infer<typeof formSchema>) {
		mutate({
			data: { ...data, endRegisteredDate: new Date(endRegisteredDate) },
			image,
		})
	}

	return (
		<Form {...form}>
			{isPending && <Loader />}
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto max-w-[50rem]'
			>
				<div className='space-y-6'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên hoạt động</FormLabel>
								<FormControl>
									<Input
										placeholder='Chiến dịch tăng cường học tập cho trẻ em vùng sâu vùng xa'
										autoFocus
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex items-center space-x-4'>
						<FormField
							control={form.control}
							name='endRegisteredDate'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày kết thúc đăng ký</FormLabel>
									<FormControl>
										<Input type='datetime-local' {...field} />
									</FormControl>
									<FormDescription>
										Ngày kết thúc đăng ký tham gia hoạt động tình nguyện
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='receivedCoins'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số lượng điểm nhận được</FormLabel>
									<FormControl>
										<Input
											placeholder='10'
											type='number'
											min={1}
											max={50}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Số lượng điểm nhận được sau khi hoàn thành hoạt động
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

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
										className='min-h-64'
									/>
								</FormControl>
								<FormDescription>
									Mô tả chi tiết về hoạt động tình nguyện như mục tiêu, nội
									dung, v.v.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='benefits'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quyền lợi tham gia</FormLabel>
								<FormControl>
									<Tiptap
										value={field.value}
										onChange={field.onChange}
										className='min-h-36'
									/>
								</FormControl>
								<FormDescription>
									Quyền lợi mà người tham gia hoạt động sẽ nhận được sau khi
									hoàn thành.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='requirements'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Đối tượng tham gia</FormLabel>
								<FormControl>
									<Tiptap
										value={field.value}
										onChange={field.onChange}
										className='min-h-36'
									/>
								</FormControl>
								<FormDescription>
									Đối tượng mà hoạt động tình nguyện hướng đến. Ví dụ: số lượng,
									trường học, v.v.
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
									Thông tin liên hệ của tổ chức hoặc người phụ trách hoạt động
									tình nguyện như số điện thoại, email, v.v.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div>
						<FormField
							control={form.control}
							name='image'
							render={({ field: { value, onChange, ...props } }) => (
								<FormItem>
									<FormLabel>Ảnh banner</FormLabel>
									<FormControl>
										<Input
											{...props}
											onChange={event =>
												onChange(event.target.files && event.target.files[0])
											}
											type='file'
											accept='image/jpg,image/jpeg,image/png,image/webp'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{form.getValues('image') && (
							<div className='mt-4'>
								<label className='text-sm font-medium mb-2'>Xem trước</label>
								<Image
									alt='banner'
									src={URL.createObjectURL(form.getValues('image'))}
									width={1280}
									height={1280}
									className='w-full object-cover h-auto rounded-lg border border-slate-200'
								/>
							</div>
						)}
					</div>
				</div>

				<Alignment align='right' className='mt-16'>
					<Button size='lg'>Đăng kí</Button>
				</Alignment>
			</form>
		</Form>
	)
}
