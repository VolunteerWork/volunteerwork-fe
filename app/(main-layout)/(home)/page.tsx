import { Metadata } from 'next'
import Introduction from './components/introduction'
import LeaderBoard from './components/leader-board'
import Works from './components/works'

export const metadata: Metadata = {
	title: 'Trang chủ',
}

export default function Home() {
	return (
		<main>
			<Introduction />
			<Works />

			<LeaderBoard />
		</main>
	)
}
