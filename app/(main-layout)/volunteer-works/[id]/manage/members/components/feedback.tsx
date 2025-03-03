'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

import participantsApi from '@/apis/participants'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Participant } from '@/interfaces/participant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import Alignment from '@/components/ui/alignment'
import Loader from '@/components/ui/loader'
import queryKeys from '@/configs/query-keys'
import { useParams } from 'next/navigation'

const formSchema = z.object({
	feedback: z.string().min(1, 'Nội dung đánh giá không được để trống'),
	rating: z.coerce
		.number()
		.int()
		.min(0, 'Điểm đánh giá phải từ 0 đến 10')
		.max(10, 'Điểm đánh giá phải từ 0 đến 10'),
})

export default function Feedback({ data }: { data: Participant }) {
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const { id } = useParams<{ id: string }>()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			feedback: '',
			rating: 10,
		},
	})

	const { mutate, isPending } = useMutation({
		mutationFn: participantsApi.giveFeedback,
		onSuccess() {
			toast({
				description: 'Đánh giá tình nguyện viên thành công',
			})
			queryClient.refetchQueries({
				queryKey: queryKeys.participantsByVolunteerWork.gen(id),
			})
		},
		onError(error) {
			toast({
				title: 'Đánh giá tình nguyện viên thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate({ participantId: data._id, ...values })
	}

	return (
		<>
			{isPending && <Loader />}
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline' size='sm'>
						Đánh giá
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='leading-normal mt-2'>
							Đánh giá tình nguyện viên
						</DialogTitle>
						<div className='flex flex-col items-center gap-4 py-4'>
							<Image
								src={data.studentId.avatarUrl}
								alt=''
								height={512}
								width={512}
								className='w-14 h-14 rounded-full'
							/>
							<p className='font-semibold text-base'>{data.studentId.name}</p>
						</div>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
							<FormField
								control={form.control}
								name='feedback'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Đánh giá</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Nhập phần đánh giá tình nguyện viên tại đây'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='rating'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Điểm</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='10'
												min={0}
												max={10}
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<Alignment align='right'>
								<Button type='submit'>Đánh giá</Button>
							</Alignment>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}
