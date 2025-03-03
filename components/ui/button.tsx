import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-none  disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary-400 text-white hover:bg-primary-400/90',
				outline:
					'border border-primary-500 bg-transparent hover:bg-primary-50 text-primary-500',
				secondary: 'bg-primary-100 text-primary-700 hover:bg-primary-100/90',
				ghost: 'hover:bg-slate-100',
				destructive: 'bg-red-200 text-red-800 hover:bg-red-200/90',
			},
			size: {
				default: 'h-10 px-6',
				lg: 'h-12 px-9',
				sm: 'h-9 px-4',
				icon: 'w-10 h-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
