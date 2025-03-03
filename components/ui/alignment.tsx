interface AlignmentProps {
	children: React.ReactNode
	className?: string
	align?: 'center' | 'left' | 'right'
}

export default function Alignment({
	children,
	align = 'left',
	className,
}: AlignmentProps) {
	return (
		<div
			className={`w-full flex ${
				align === 'center'
					? 'justify-center'
					: align === 'left'
					? 'justify-start'
					: 'justify-end'
			} ${className}`}
		>
			{children}
		</div>
	)
}
