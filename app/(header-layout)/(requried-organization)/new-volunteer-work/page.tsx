import { Metadata } from 'next'
import CreateForm from './components/create-form'

export const metadata: Metadata = {
	title: 'Tạo hoạt động tình nguyện mới',
}

export default function NewWorkPage() {
	return (
		<div className='container py-16'>
			<h1 className='text-center text-3xl font-bold mb-16'>
				Tạo hoạt động tình nguyện mới
			</h1>

			<CreateForm />
		</div>
	)
}
