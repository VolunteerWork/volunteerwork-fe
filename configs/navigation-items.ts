import routes from './routes'

const navigationItems = [
	{
		label: 'Trang chủ',
		href: routes.home,
	},
	{
		label: 'Giới thiệu',
		href: routes.about,
	},
	{
		label: 'Khám phá',
		href: routes.explore.default,
	},
	{
		label: 'Tin tức',
		href: routes.news,
	},
	{
		label: 'Cộng đồng',
		href: routes.community,
	},
]

export default navigationItems
