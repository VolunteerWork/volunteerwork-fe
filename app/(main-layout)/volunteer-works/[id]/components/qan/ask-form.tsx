'use client'

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
import Tiptap from '@/components/ui/tiptap'
import queryKeys from '@/configs/query-keys'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	question: z.string().min(1, 'Nội dung câu hỏi không được để trống'),
})

export default function AskForm() {
	const { id } = useParams<{ id: string }>()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			question: '',
		},
	})

	const queryClient = useQueryClient()

	const { toast } = useToast()

	const { mutate, isPending } = useMutation({
		mutationFn: volunteerWorksApi.addQuestion,
		onSuccess: () => {
			form.reset({ question: '' })
			toast({
				description: 'Đặt câu hỏi thành công',
			})
			queryClient.refetchQueries({ queryKey: queryKeys.volunteer.gen(id) })
		},
		onError: error => {
			toast({
				title: 'Đặt câu hỏi thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate({
			questionText: values.question,
			volunteerWorkId: id,
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{isPending && <Loader />}
				<FormField
					control={form.control}
					name='question'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Tiptap
									value={field.value}
									onChange={field.onChange}
									className='min-h-36'
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Alignment align='right' className='mt-4'>
					<Button>Đặt câu hỏi</Button>
				</Alignment>
			</form>
		</Form>
	)
}
