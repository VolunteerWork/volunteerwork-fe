import Providers from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import fonts from '@/configs/fonts'
import { cn } from '@/lib/utils'
import config from '@/tailwind.config'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

export const metadata: Metadata = {
	title: 'Volunteer Connect',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='vi'>
			<Providers>
				<body className={cn(fonts.sans.className, 'text-[0.9375rem]')}>
					<NextTopLoader
						color={config.theme.extend.colors.primary[400]}
						shadow={false}
					/>
					<ReactQueryDevtools initialIsOpen={false} />
					<Toaster />
					{children}
				</body>
			</Providers>
		</html>
	)
}
