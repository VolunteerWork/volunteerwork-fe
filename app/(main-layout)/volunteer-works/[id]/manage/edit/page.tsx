'use client'

import volunteerWorksApi, {
	VolunteerWorkUpdateData,
} from '@/apis/volunteer-works'
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
import queryKeys from '@/configs/query-keys'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ImageUploading from 'react-images-uploading'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImageListType } from 'react-images-uploading'
import { z } from 'zod'
import Image from 'next/image'
import { format } from 'date-fns'

const formSchema = z.object({
	title: z.string().min(1, 'Tên hoạt động không được để trống'),
	description: z.string().min(1, 'Mô tả không được để trống'),
	receivedCoins: z
		.number()
		.int()
		.min(1, 'Số lượng điểm nhận được phải lớn hơn 0')
		.max(20, 'Số lượng điểm nhận được phải nhỏ hơn 20'),
	contactInfo: z.string().min(1, 'Thông tin liên hệ không được để trống'),
	benefits: z.string().min(1, 'Quyền lợi tham gia không được để trống'),
	requirements: z.string().min(1, 'Đối tượng tham gia không được để trống'),
	endRegisteredDate: z.string({
		required_error: 'Ngày kết thúc đăng ký không được để trống',
	}),
})

export default function UpdateVolunteerWork() {
	const { id } = useParams<{ id: string }>()

	const [image, setImage] = useState<ImageListType>([])

	const { data } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: data?.title,
			description: data?.description,
			endRegisteredDate: data
				? format(data.endRegisteredDate, "yyyy-MM-dd'T'HH:mm")
				: '',
			receivedCoins: data?.receivedCoins,
			contactInfo: data?.contactInfo,
			benefits: data?.benefits,
			requirements: data?.requirements,
		},
	})

	const router = useRouter()
	const { toast } = useToast()

	const { mutate, isPending } = useMutation({
		mutationFn: ({
			data,
			file,
		}: {
			data: VolunteerWorkUpdateData
			file?: File
		}) => volunteerWorksApi.update(data, file),
		onSuccess: data => {
			toast({
				description: 'Cập nhật hoạt động tình nguyện thành công',
			})
			queryClient.refetchQueries({
				queryKey: queryKeys.volunteer.gen(id),
			})
			setImage([])
		},
		onError: error => {
			toast({
				title: 'Cập nhật thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate({
			data: {
				...values,
				endRegisteredDate: new Date(values.endRegisteredDate),
				_id: id,
			},
			file: image[0]?.file,
		})
	}

	return (
		<div className='mx-auto max-w-[50rem]'>
			<h1 className='text-center text-3xl font-bold mb-16'>
				Chỉnh sửa hoạt động tình nguyện
			</h1>

			{isPending && <Loader />}

			<ImageUploading
				multiple
				value={image}
				onChange={value => setImage(value)}
				dataURLKey='data_url'
			>
				{({
					imageList,
					onImageUpload,
					onImageRemove,
				}) =>
					data && (
						<div className='mb-16'>
							<Image
								alt='banner'
								src={imageList[0] ? imageList[0]['data_url'] : data.imageUrl}
								width={1280}
								height={1280}
								className='w-full object-cover h-auto rounded-lg border border-slate-200'
							/>

							<Alignment align='right' className='mt-3'>
								{imageList[0] ? (
									<Button
										variant='destructive'
										size='sm'
										onClick={() => onImageRemove(0)}
									>
										Xóa
									</Button>
								) : (
									<Button variant='secondary' size='sm' onClick={onImageUpload}>
										Đổi
									</Button>
								)}
							</Alignment>
						</div>
					)
				}
			</ImageUploading>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
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
											<Input type='number' {...field} />
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
										Đối tượng mà hoạt động tình nguyện hướng đến. Ví dụ: số
										lượng, trường học, v.v.
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
					</div>

					<Alignment align='right' className='mt-16'>
						<Button size='lg'>Cập nhật</Button>
					</Alignment>
				</form>
			</Form>
		</div>
	)
}
