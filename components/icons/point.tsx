import { cn } from '@/lib/utils'

export default function Point({ className }: { className?: string }) {
	return (
		<svg
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={cn('w-3 text-amber-400', className)}
		>
			<path
				d='M8.69065 0V3.39568C10.8777 3.74101 12.6043 5.64029 12.6043 7.94245C12.6043 10.4748 10.5324 12.5468 8 12.5468C5.58273 12.5468 3.6259 10.705 3.39568 8.34532H0C0.230216 12.6043 3.68345 16 8 16C12.4317 16 16 12.4317 16 8C16 3.79856 12.777 0.402878 8.69065 0Z'
				fill='currentColor'
			/>
			<path d='M7.76978 0H0V3.33813H7.76978V0Z' fill='currentColor' />
			<path
				d='M5.98561 4.20142H0V7.5971H5.98561V4.20142Z'
				fill='currentColor'
			/>
		</svg>
	)
}
