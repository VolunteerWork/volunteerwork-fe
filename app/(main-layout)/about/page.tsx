import { Metadata } from 'next'
import Introduce from './components/introduce'
import Target from './components/target'
import Application from './components/application'

export const metadata: Metadata = {
	title: 'Giới thiệu',
}

function About() {
	return (
		<main className='flex  flex-col gap-32 pt-16 pb-8'>
			{/* Phần giới thiệu */}
			<Introduce />

			{/* Phần mục tiêu  */}
			<Target />

			{/* Phần ứng dụng */}
			<Application />
		</main>
	)
}

export default About
