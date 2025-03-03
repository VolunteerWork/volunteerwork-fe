import { Metadata } from 'next'
import Organizations from './components/organizations'
import Search from './components/search'
import Works from './components/works'

export const metadata: Metadata = {
	title: 'Khám phá',
}

export default function ExplorePage() {
	return (
		<div>
			<Search />
			<Organizations />
			<Works />
		</div>
	)
}

