import navigationItems from '@/configs/navigation-items'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Logo from './logo'


function Footer() {
	return (
		<div className='flex bg-footer'>
			<footer className='container flex flex-col items-center gap-8 pt-[4rem] pb-[2rem] mx-auto'>
				<Logo textWhite />

				<ul className='flex flex-wrap gap-x-9 text-base text-white justify-center font-light'>
					{navigationItems.map((route, index) => {
						return (
							<li className='h-8' key={index}>
								<Link
									href={route.href}
									className={cn(
										'h-full flex items-center relative group/animation py-2',
									)}
								>
									<div className='relative'>
										<div className='absolute w-full bg-white h-px -bottom-0.5 rounded-full transition-transform ease-in-out duration-500 scale-0 origin-right group-hover/animation:scale-100 group-hover/animation:origin-left'></div>
										{route.label}
									</div>
								</Link>
							</li>
						)
					})}
				</ul>

				<div className='flex gap-[1.5625rem]'>
					<div
						className='h-[2.25rem] w-[2.25rem] rounded-full bg-no-repeat bg-center bg-cover'
						style={{
							backgroundImage:
								'url("https://i.pinimg.com/474x/83/36/e9/8336e99e55ade0d73caed920867883c8.jpg")',
						}}
					></div>
					<div
						className='h-[2.25rem] w-[2.25rem] rounded-full bg-no-repeat bg-center bg-cover'
						style={{
							backgroundImage:
								'url("https://i.pinimg.com/474x/83/36/e9/8336e99e55ade0d73caed920867883c8.jpg")',
						}}
					></div>
					<div
						className='h-[2.25rem] w-[2.25rem] rounded-full bg-no-repeat bg-center bg-cover'
						style={{
							backgroundImage:
								'url("https://i.pinimg.com/474x/83/36/e9/8336e99e55ade0d73caed920867883c8.jpg")',
						}}
					></div>
				</div>

				<div className='h-px w-[70%] mx-auto bg-[#334155]'></div>

				<div className='text-white font-medium flex flex-wrap justify-center'>
					<span>Copyright ©2024 Team Tam Cừu Newbiesss.&nbsp;</span>
					<span>All Rights Reserved</span>
				</div>
			</footer>
		</div>
	)
}

export default Footer
