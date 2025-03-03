import { Metadata } from 'next'
import ActiveAccountForm from './components/active-account-form'

export const metadata: Metadata = {
	title: 'Xác thực tài khoản',
}

export default function ActiveAccountPage() {
	return <ActiveAccountForm />
}
