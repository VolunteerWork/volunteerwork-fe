'use client'
import { cn } from '@/lib/utils'
import {
	Briefcase,
	CalendarEdit,
	FavoriteChart,
	I3DRotate,
	Profile2User,
	SearchStatus,
} from 'iconsax-react'
import { useIntersectionObserver } from 'usehooks-ts'

const target = [
	{
		icon: Briefcase,
		title: 'Nâng cao hiệu quả quản lý',
		description:
			'Tạo ra một môi trường trực tuyến dễ sử dụng và truy cập, hỗ trợ tổ chức và quản lý hiệu quả các hoạt động tình nguyện, bao gồm đăng ký tham gia, quản lý tình nguyện viên, theo dõi tiến độ hoạt động, đánh giá kết quả.',
	},

	{
		icon: Profile2User,
		title: 'Kết nối hiệu quả',
		description:
			'Kết nối các tổ chức/cá nhân có nhu cầu với nguồn lực tình nguyện từ sinh viên. Hỗ trợ các tổ chức phi lợi nhuận, tổ chức tình nguyện đăng tải thông tin về các dự án tình nguyện và tìm kiếm tình nguyện viên một cách nhanh chóng.',
	},

	{
		icon: SearchStatus,
		title: 'Hỗ trợ tiếp cận thông tin',
		description:
			'Cung cấp thông tin và nguồn lực hữu ích về các sự kiện tình nguyện, giúp sinh viên dễ dàng tìm kiếm và tham gia các hoạt động tình nguyện phù hợp với sở thích, năng lực và thời gian sẵn có của của bản thân.',
	},

	{
		icon: CalendarEdit,
		title: 'Hỗ trợ theo dõi lịch trình',
		description:
			'Dễ dàng theo dõi và quản lý hồ sơ hoạt động tình nguyện của bản thân, quản lý thời gian và tiến độ tham gia hoạt động, dễ dàng theo dõi và quản lý lịch trình tình nguyện của mình.',
	},

	{
		icon: I3DRotate,
		title: 'Đơn giản hóa việc đăng ký',
		description:
			'Đăng ký trở nên thuận tiện hơn với việc sử dụng thông tin cá nhân đã có không cần phải nhập lại, tích hợp biểu mẫu trực tiếp vào trang web với giao diện thân thiện và nhanh chóng.',
	},

	{
		icon: FavoriteChart,
		title: 'Thúc đẩy phong trào tình nguyện',
		description:
			'Tạo ra một cộng đồng trực tuyến đầy đủ và đa dạng các hoạt động tình nguyện, thúc đẩy tinh thần xã hội và trách nhiệm công dân cho sinh viên, tạo dựng môi trường chia sẻ kinh nghiệm và học hỏi lẫn nhau, giúp rèn luyện kỹ năng và đóng góp cho cộng đồng.',
	},
]

const positionOfGrid = [
	'sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-2',
	'sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-2',
	'xl:col-start-1 xl:col-end-2 xl:row-start-2 xl:row-end-4 sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-3',
	'xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-4 sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-4',
	'xl:col-start-3 xl:col-end-4 xl:row-start-2 xl:row-end-4 sm:col-start-3 sm:col-end-5 sm:row-start-2 sm:row-end-3',
	'xl:col-start-4 xl:col-end-5 xl:row-start-2 xl:row-end-4 sm:col-start-3 sm:col-end-5 sm:row-start-3 sm:row-end-4',
]

function Target() {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0.1,
		freezeOnceVisible: true,
	})

	return (
		<div className='container'>
			<p className='font-bold lg:text-4xl text-2xl text-center md:pb-16 pb-12 uppercase'>
				Mục tiêu của chúng tôi
			</p>

			<div
				ref={ref}
				className='grid sm:grid-cols-4 sm:grid-rows-[repeat(3)] grid-cols-1 md:gap-10 gap-6'
			>
				{target.map((item, index) => {
					const Icon = item.icon

					return (
						<div
							key={index}
							style={{
								transitionDelay: 100 * index + 'ms',
							}}
							className={cn(
								'flex flex-col gap-5 border border-primary-200 rounded-lg p-8 opacity-0 translate-y-36',
								positionOfGrid[index],
								isIntersecting &&
									'opacity-100 translate-y-0 transition-all duration-1000 ease-out',
							)}
						>
							<div className='flex justify-center items-center bg-primary-100 p-3 w-fit rounded-lg'>
								<Icon size={32} color='#66A5AE' variant='Bold' />
							</div>

							<p className='font-semibold sm:text-xl text-lg'>{item.title}</p>
							<p className=''>{item.description}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Target
