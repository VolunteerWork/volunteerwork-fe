import OrganizationCard from '@/components/organization-card'
import { Metadata } from 'next'
import List from './components/list'

export const metadata: Metadata = {
	title: 'Tổ chức tình nguyện',
}

export default function ExploreOrganizationsPage() {
	return (
		<div className='container py-16'>
			<h2 className='text-3xl font-bold mb-14 text-center'>
				Các tổ chức tình nguyện
			</h2>

			<List />
		</div>
	)
}
