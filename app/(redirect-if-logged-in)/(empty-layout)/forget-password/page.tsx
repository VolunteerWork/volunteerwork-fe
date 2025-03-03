import { Metadata } from 'next'
import ForgetPasswordForm from './components/forget-password-form'

export const metadata: Metadata = {
	title: 'Khôi phục mật khẩu',
}

export default function ForgetPasswordPage() {
	return <ForgetPasswordForm />
}
