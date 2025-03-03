import { cn } from '@/lib/utils'

export default function ConcentricCircles({
	className,
}: {
	className?: string
}) {
	return (
		<div
			className={cn(
				'[&_div]:rounded-full [&_div]:border [&_div]:border-primary-300/50 [&_div]:flex [&_div]:items-center [&_div]:justify-center',
				className,
			)}
		>
			<div className='w-80 h-80'>
				<div className='w-64 h-64'>
					<div className='w-48 h-48'>
						<div className='w-32 h-32'>
							<div className='w-16 h-16'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
