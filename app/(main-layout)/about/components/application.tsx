'use client'
import { cn } from '@/lib/utils'
import { TickCircle } from 'iconsax-react'
import LottieAnimation from '../../../../components/lottie-animation'
import { useIntersectionObserver } from 'usehooks-ts'
import lottieAnimations from '@/assets/lottie-animations'

interface ApplicationItemType {
	title: string,
	description: string[],
    illustrator: any,
}

const application: ApplicationItemType[] = [
	{
		title: 'Tìm kiếm, đánh giá và đăng kí hoạt động',
		description: [
			'Cung cấp chức năng tìm kiếm để sinh viên có thể tìm thấy các hoạt động tình nguyện dựa trên địa điểm, thời gian, lĩnh vực quan tâm, hoặc tổ chức cụ thể.',
			'Cung cấp thông tin chi tiết về các tổ chức tổ chức hoạt động tình nguyện và các dự án cụ thể mà sinh viên có thể tham gia.',
			'Cho phép sinh viên đăng ký tham gia hoạt động tình nguyện trực tuyến thông qua hệ thống và quản lý trạng thái đăng ký của mình.',
			' Sinh viên có thể đánh giá và phản hồi về trải nghiệm của họ. Các đánh giá này có thể giúp cải thiện chất lượng của các hoạt động tương lai.',
		],
		illustrator: lottieAnimations.search,
	},

	{
		title: 'Quản lí hồ sơ cá nhân của tình nguyện viên.',
		description: [
			'Sinh viên có thể đăng nhập vào hệ thống và quản lý thông tin cá nhân hoạt động tình nguyện của mình.',
			'Cho phép cập nhật thông tin cá nhân và kỹ năng khi cần thiết.',
			'Có thể xem báo cáo đánh giá hoạt động của sinh viên.',
		],
		illustrator: lottieAnimations.manageProfile,
	},

	{
		title: 'Quản lý lịch trình các hoạt động tình nguyện của sinh viên',
		description: [
			'Gửi thông báo và nhắc nhở đến sinh viên về các hoạt động tình nguyện sắp diễn ra, các thay đổi về đăng ký, hoặc thông tin quan trọng khác.',
			'Cho phép sinh viên xem lịch các hoạt động tình nguyện sắp tới của mình để sắp xếp thời gian cho phù hợp.',
			'Hệ thống sẽ tự động gửi email tới sinh viên trước ngày tình nguyện để nhắc nhở.',
		],
		illustrator: lottieAnimations.manageSchedule,
	},

	{
		title: 'Quản lý hoạt động tình nguyện',
		description: [
			'Cho phép tổ chức hoặc cá nhân tạo ra và quản lý các sự kiện tình nguyện, bao gồm cập nhật thông tin, quản lý đăng ký,…',
			'Giúp ban tổ chức hoạt động tình quyện theo dõi các thành viên. Xuất ra báo cáo một cách nhanh chóng.',
			'Cung cấp các công cụ để tổ chức và quản lý có thể thống kê và tạo báo cáo về hoạt động tình nguyện, bao gồm số lượng sinh viên tham gia, thời lượng hoạt động, và hiệu suất.',
		],
		illustrator: lottieAnimations.manangeVolunteerWork,
	},

	{
		title: 'Gamification',
		description: [
			'Sinh viên có thể nhận điểm thưởng cho việc tham gia các hoạt động tình nguyện, hoàn thành các mục tiêu và giúp đỡ người khác. Điểm thưởng có thể được đổi thành các phần thưởng như huy hiệu hoặc quà tặng.',
			'Sinh viên có thể nhận huy hiệu cho việc đạt được các thành tựu khác nhau, chẳng hạn như tham gia một số lượng nhất định các hoạt động tình nguyện. Huy hiệu có thể được hiển thị trên trang hồ sơ của sinh viên.',
			'Hiển thị bảng xếp hạng cho các sinh viên dựa trên số lần tham gia hoạt động, hoặc điểm số tích lũy. Điều này sẽ tạo ra một yếu tố cạnh tranh làm tăng động lực',
		],
		illustrator: lottieAnimations.gamification,
	},
]

function Application() {
	return (
		<div className='container'>
			<div className='font-bold lg:text-4xl text-2xl text-center pb-10 !leading-normal upperca'>
				Khám phá ứng dụng của <br />
				<span className='text-primary-400'>Volunteer Connect</span>
			</div>

			<div className='flex flex-col max-lg:gap-y-20'>
				{/* <Lottie options={defaultOptions}/> */}
				{application.map((item, index) => {
					return (
						<ApplicationItem key={index} item={item} index={index}/>
					)
				})}
			</div>
		</div>
	)
}

function ApplicationItem({item, index}: {item: ApplicationItemType, index: number}) {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0.2,
		freezeOnceVisible: true,
	})

	const sizeOfIllustrator = (width: number, height: number) => {
		if (width < 1024 && width >= 768) {
			return 300
		} else if (width < 768) {
			return 250
		} else {
			return 400
		}
	}

	return (
		<div
			ref={ref}
			className={cn(
				'flex justify-between items-center gap-x-20 gap-y-2 max-md:flex-wrap opacity-0 translate-y-36',
				index % 2 == 0 ? '' : 'flex-row-reverse',
				isIntersecting && 'opacity-100 transition-all translate-y-0 duration-1000 ease-out'
			)}
		>
			<LottieAnimation lottie={item.illustrator} sizeOfIllustrator={sizeOfIllustrator}/>

			<div className='flex flex-col gap-4 md:flex-1'>
				<p className='sm:text-[1.375rem] text-lg font-bold'>{item.title}</p>

				<div className='flex flex-col gap-2'>
					{item.description.map((idea, index) => {
						return (
							<div key={index} className='flex items-start gap-3'>
								<TickCircle
									size={20}
									color='#71BE4C'
									variant='Outline'
									className='mt-0.5'
								/>

								<p className='flex-1'>{idea}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Application
