import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Activities from './components/activities'
import Information from './components/infomation'
import Overview from './components/overview'
import Top from './components/top'

export default function OrganizationDetailPage() {
	return (
		<div className='container pb-16 pt-6 flex items-start max-xl:flex-col-reverse gap-16 xl:gap-9'>
			<section className='xl:w-[30%] max-xl:w-full max-xl:max-w-[30rem] max-xl:mx-auto space-y-6 xl:sticky top-[6.5rem]'>
				<Overview />
			</section>

			<Separator className='xl:hidden' />

			<section className='max-xl:w-full xl:flex-1'>
				<Top />

				<Tabs defaultValue='info' className='w-ful'>
					<TabsList className='rounded-none bg-white p-0 justify-start space-x-3 md:space-x-9 mb-6 sticky top-[calc(6rem-2px)] pt-2 pb-3 mt-0 z-10'>
						<TabsTrigger
							className='!bg-transparent p-0 pb-2 rounded-none lg:flex-none md:px-6 px-0 sm:px-3 transition data-[state=active]:text-primary-500 after:content-[""] after:h-[1.2px] after:rounded-full after:absolute relative after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:ease-in data-[state=active]:after:w-full after:block after:bg-primary-500 after:w-0'
							value='info'
						>
							Thông tin
						</TabsTrigger>
						<TabsTrigger
							className='!bg-transparent p-0 pb-2 rounded-none lg:flex-none md:px-6 px-0 sm:px-3 transition data-[state=active]:text-primary-500 after:content-[""] after:h-[1.2px] after:rounded-full after:absolute relative after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:ease-in data-[state=active]:after:w-full after:block after:bg-primary-500 after:w-0'
							value='activities'
						>
							Hoạt động
						</TabsTrigger>
						<TabsTrigger
							className='!bg-transparent p-0 pb-2 rounded-none lg:flex-none md:px-6 px-0 sm:px-3 transition data-[state=active]:text-primary-500 after:content-[""] after:h-[1.2px] after:rounded-full after:absolute relative after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:ease-in data-[state=active]:after:w-full after:block after:bg-primary-500 after:w-0'
							value='posts'
						>
							Bài viết
						</TabsTrigger>
					</TabsList>

					<TabsContent value='info'>
						<Information />
					</TabsContent>

					<TabsContent value='activities'>
						<Activities />
					</TabsContent>
				</Tabs>
			</section>
		</div>
	)
}
