import volunteerWorksApi from '@/apis/volunteer-works'
import Alignment from '@/components/ui/alignment'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import Loader from '@/components/ui/loader'
import { Skeleton } from '@/components/ui/skeleton'
import Tiptap from '@/components/ui/tiptap'
import queryKeys from '@/configs/query-keys'
import routes from '@/configs/routes'
import useAuth from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import QuestionType from '@/interfaces/question'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CSSProperties, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	answer: z.string().min(1, 'Nội dung câu trả lời không được để trống'),
})

function Question({
	data,
	className,
	style,
}: {
	data: QuestionType
	className?: string
	style?: CSSProperties
}) {
	const { id } = useParams<{ id: string }>()

	const { accountInfo, isOrganization } = useAuth()

	const { data: organization } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			answer: '',
		},
	})

	const [rely, setRely] = useState(false)

	const { toast } = useToast()
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationFn: volunteerWorksApi.answerQuestion,
		onSuccess: () => {
			form.reset({ answer: '' })
			toast({
				description: 'Trả lời câu hỏi thành công',
			})
			queryClient.refetchQueries({ queryKey: queryKeys.volunteer.gen(id) })
		},
		onError: error => {
			toast({
				title: 'Trả lời câu hỏi thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate({
			answer: values.answer,
			questionId: data._id,
		})
	}

	return (
		<>
			{isPending && <Loader />}
			<div className={className} style={style}>
				<div>
					<div className='flex items-start'>
						<Link href={routes.profile.gen(data.studentId._id)}>
							<Image
								alt='avatar'
								src={data.studentId.avatarUrl}
								width={40}
								height={40}
								className='w-10 h-10 rounded-full object-cover'
							/>
						</Link>

						<div className='ml-4 pl-4 pr-8 py-4 rounded-lg bg-slate-100 flex-1'>
							<h3 className='text-sm font-medium mb-2'>
								<Link href={routes.profile.gen(data.studentId._id)}>
									{data.studentId.name}
								</Link>
							</h3>
							<div
								className='prose prose-sm prose-p:!my-1'
								dangerouslySetInnerHTML={{ __html: data.questionText }}
							></div>
						</div>
					</div>

					{accountInfo &&
						isOrganization &&
						organization &&
						!data.answer &&
						organization.organization._id == accountInfo._id && (
							<>
								<div className='mt-1 ml-14'>
									<button
										onClick={() => setRely(!rely)}
										className='text-xs font-medium text-primary-500'
									>
										Trả lời
									</button>
								</div>

								{rely && (
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(onSubmit)}
											className='pl-14 mt-6'
										>
											<FormField
												control={form.control}
												name='answer'
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Tiptap
																value={field.value}
																onChange={field.onChange}
																className='min-h-24'
																autofocus
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<Alignment align='right' className='mt-4 space-x-4'>
												<Button size='sm'>Trả lời</Button>
											</Alignment>
										</form>
									</Form>
								)}
							</>
						)}
				</div>

				{data.answer && organization && (
					<div className='pl-14 mt-6'>
						<div className='flex items-start'>
							<Image
								alt='avatar'
								src={organization?.organization.avatarUrl}
								width={40}
								height={40}
								className='w-10 h-10 rounded-full object-cover'
							/>

							<div className='ml-4 pl-4 pr-8 py-4 rounded-lg bg-slate-100 flex-1'>
								<h3 className='text-sm font-medium mb-2 line-clamp-1'>
									{organization.organization.name}
								</h3>
								<div
									className='prose prose-sm prose-p:!my-1'
									dangerouslySetInnerHTML={{ __html: data.answer }}
								></div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

Question.Skeleton = function QuestionSkeleton() {
	return (
		<div className='flex items-start'>
			<Skeleton className='w-10 h-10 rounded-full' />

			<Skeleton className='ml-4 px-4 py-3 rounded-lg h-24 w-full' />
		</div>
	)
}

export default Question
