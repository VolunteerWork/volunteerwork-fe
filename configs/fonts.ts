import { Montserrat, Merienda } from 'next/font/google'

const sans = Montserrat({
	subsets: ['latin', 'vietnamese'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	display: 'swap',
})

const merienda = Merienda({
	weight: ['400'],
	subsets: ['latin'],
})

const fonts = { sans, merienda }

export default fonts
