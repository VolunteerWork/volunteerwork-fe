'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import navigationItems from '@/configs/navigation-items'
import routes from '@/configs/routes'
import useAuth from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { Add, HambergerMenu } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Point from './icons/point'
import Logo from './logo'
import { Button } from './ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { Person } from '@/interfaces/person'
import { Organization } from '@/interfaces/organization'

interface DropdownItem {
	label: string
	href?: string
	onClick?: () => void
}

function Header() {
	const pathName = usePathname()

	const { accountInfo, logOut, isOrganization } = useAuth()

	const personDropdownItems: DropdownItem[] = [
		{
			label: 'Trang cá nhân',
			href: routes.profile.gen(accountInfo?._id),
		},
		{
			label: 'Cài đặt',
			href: routes.settings,
		},
		{
			label: 'Hoạt động của tôi',
		},
	]

	const organizationDropdownItems: DropdownItem[] = [
		{
			label: 'Trang tổ chức',
			href: routes.organizations.gen(accountInfo?._id),
		},
		{
			label: 'Thêm chiến dịch mới',
			href: routes.newWork,
		},
		{
			label: 'Quản lý chiến dịch',
			// href: routes.
		},
		{
			label: 'Cài đặt',
			href: routes.settings,
		},
		{
			label: 'Thống kê',
		},
	]

	return (
		<div className='h-[6rem] grid place-items-center fixed inset-x-0 bg-white z-50'>
			<header className='h-[2.75rem] container flex justify-between'>
				<Sheet>
					<SheetTrigger asChild>
						<div className='h-full aspect-square flex justify-center items-center lg:hidden cursor-pointer'>
							<HambergerMenu size='32' color='#000000' />
						</div>
					</SheetTrigger>
					<SheetContent
						side='left'
						className='p-10 !pt-8 flex flex-col gap-10 overflow-y-auto'
					>
						<div className='flex items-center justify-between'>
							<Logo />

							<SheetClose asChild>
								<div className='bg-primary-100 p-0.5 cursor-pointer rounded-lg opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800'>
									<Add size='30' color='#498891' className='rotate-45' />
								</div>
							</SheetClose>
						</div>

						<div className='flex flex-col gap-7'>
							<ul className='flex flex-col gap-2 font-medium text-base'>
								{navigationItems.map((route, index) => {
									return (
										<li className='h-full' key={index}>
											<SheetClose asChild>
												<Link
													href={route.href}
													className={cn(
														'h-full flex items-center relative group/animation py-2',
													)}
												>
													<div className='relative'>
														<div className='absolute w-full bg-black h-px -bottom-0.5 rounded-full transition-transform ease-in-out duration-500 scale-0 origin-right group-hover/animation:scale-100 group-hover/animation:origin-left'></div>
														{route.label}
													</div>
												</Link>
											</SheetClose>
										</li>
									)
								})}
							</ul>

							{!accountInfo ? (
								<Link href={routes.logIn}>
									<Button className='w-full'>Tham gia ngay</Button>
								</Link>
							) : (
								<Button variant={'outline'} onClick={() => logOut()}>
									Đăng xuất
								</Button>
							)}
						</div>
					</SheetContent>
				</Sheet>

				<Logo className='max-sm:hidden' />

				<ul className='flex gap-9 font-medium text-base max-lg:hidden'>
					{navigationItems.map((route, index) => {
						return (
							<li className='h-full' key={index}>
								<Link
									href={route.href}
									className={cn(
										'h-full flex items-center',
										route.href == pathName ||
											(route.href != '/' && pathName.startsWith(route.href))
											? 'text-primary-400 font-semibold'
											: '',
									)}
								>
									{route.label}
								</Link>
							</li>
						)
					})}
				</ul>

				<div className='flex items-center'>
					{accountInfo == null ? (
						<Link href={routes.logIn}>
							<Button variant='outline'>Tham gia ngay</Button>
						</Link>
					) : (
						<div className='flex items-center'>
							{!isOrganization && (
								<span className='flex max-md:hidden items-center mr-4 py-1 font-medium px-2 rounded-full bg-slate-100 text-xs'>
									{(accountInfo as Person).totalPoints}{' '}
									<Point className='ml-1 h-2.5' />
								</span>
							)}
							<DropdownMenu>
								<DropdownMenuTrigger className='outline-none'>
									<Image
										alt='avatar'
										src={accountInfo.avatarUrl}
										width={44}
										height={44}
										className='h-11 w-11 rounded-full object-cover select-none'
									/>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuLabel className='py-4 px-3 flex items-start'>
										<Image
											alt='avatar'
											src={accountInfo.avatarUrl}
											width={36}
											height={36}
											className='h-9 w-9 rounded-full object-cover'
										/>
										<div className='ml-3'>
											<h3 className='text-sm leading-5 font-medium line-clamp-1'>
												{accountInfo.name}
											</h3>

											{!isOrganization && (
												<span className='flex font-normal mt-1 items-center'>
													{(accountInfo as Person).totalPoints}{' '}
													<Point className='ml-1' />
												</span>
											)}
											{isOrganization && (
												<div className='text-xs font-normal line-clamp-1'>
													{(accountInfo as Organization).affiliatedUnit}
												</div>
											)}
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{(isOrganization
										? organizationDropdownItems
										: personDropdownItems
									).map((item, index) => {
										const Comp = item.href ? Link : 'button'

										return (
											<DropdownMenuItem key={index} asChild>
												<Comp href={item?.href || ''} onClick={item?.onClick}>
													{item.label}
												</Comp>
											</DropdownMenuItem>
										)
									})}
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => logOut()}>
										Đăng xuất
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}
				</div>
			</header>
		</div>
	)
}

export default Header
