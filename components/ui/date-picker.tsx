import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'iconsax-react'
import { Button } from './button'
import { Calendar } from './calendar'
import { FormControl } from './form'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface DatePickerProps {
	field: {
		value: Date
		onChange: (...event: any[]) => void
	}
	placeholder?: string
}

export default function DatePicker({
	field,
	placeholder = '__/__/____',
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant={'outline'}
						className={cn(
							'flex h-12 w-full rounded-lg border text-black border-slate-200 !bg-slate-50 px-6 text-sm font-normal',
							!field.value && 'text-slate-400',
						)}
					>
						{field.value ? (
							format(field.value, 'd/M/yyyy')
						) : (
							<span>{placeholder}</span>
						)}
						<CalendarIcon className='ml-auto h-5 text-slate-400' />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={field.value}
					onSelect={field.onChange}
					disabled={date => date > new Date() || date < new Date('1900-01-01')}
					initialFocus
					fromDate={new Date('1900-01-01')}
					toDate={new Date()}
					captionLayout='dropdown'
				/>
			</PopoverContent>
		</Popover>
	)
}
