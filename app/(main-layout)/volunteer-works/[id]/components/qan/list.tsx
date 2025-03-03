import volunteerWorksApi from '@/apis/volunteer-works'
import queryKeys from '@/configs/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Question from './question'
import { useIntersectionObserver } from 'usehooks-ts'
import { cn } from '@/lib/utils'

export default function List() {
	const { id } = useParams<{ id: string }>()

	const { data, isLoading } = useQuery({
		queryKey: queryKeys.volunteer.gen(id),
		queryFn: () => volunteerWorksApi.getInfo(id),
	})

	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0,
		freezeOnceVisible: true,
	})

	return (
		<>
			{data && <div ref={ref} />}
			<div className='space-y-8'>
				{data &&
					data.questions.map((question, index) => (
						<Question
							className={cn(
								'opacity-0 -translate-x-36 duration-500 ease-out transition',
								isIntersecting && 'opacity-100 translate-x-0',
							)}
							style={{
								transitionDelay: 200 * index + 'ms',
							}}
							key={index}
							data={question}
						/>
					))}

				{isLoading &&
					[...Array(5)].map((_, index) => <Question.Skeleton key={index} />)}
			</div>
		</>
	)
}
