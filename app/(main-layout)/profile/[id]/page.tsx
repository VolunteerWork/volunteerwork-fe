import Activities from './components/activities'
import Header from './components/header'
import Information from './components/information'
import Quote from './components/quote'

function Profile() {
	return (
		<div className='space-y-14'>
			<Header />

			<div className='container grid grid-cols-6 max-lg:grid-rows-[repeat(2)] gap-6'>
				<div className='col-span-2 max-lg:row-start-1 max-lg:col-span-6 flex flex-col gap-6'>
					<div className='flex justify-center mb-5'>
						<Quote className='w-[18.25rem] max-lg:w-[25rem]' />
					</div>

					<Information />
				</div>

				<div className='col-span-4 max-lg:row-start-2 max-lg:col-span-6 flex flex-col items-center gap-12'>
					<Activities />
				</div>
			</div>
		</div>
	)
}

export default Profile
