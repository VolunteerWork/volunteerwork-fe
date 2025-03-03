'use client'

import useRedirectIfLoggedIn from '@/hooks/use-redirect-if-logged-in'
import { ReactNode, Suspense } from 'react'

function RedirectIfLoggedInLayoutInner({ children }: { children: ReactNode }) {
	useRedirectIfLoggedIn()

	return children
}

export default function RedirectIfLoggedInLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<Suspense>
			<RedirectIfLoggedInLayoutInner>{children}</RedirectIfLoggedInLayoutInner>
		</Suspense>
	)
}
