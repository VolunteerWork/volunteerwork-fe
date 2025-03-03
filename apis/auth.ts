import { AuthError } from '@/errors/auth-error'
import Account from '@/interfaces/account'
import { Person } from '@/interfaces/person'
import httpClient, { handleError } from '@/lib/http-client'

export interface PersonalSignUpData {
	name: string
	school: string
	faculty: string
	gender: boolean
	phoneNumber: string
	studentCode: string
	dob: Date
	account: {
		email: string
		password: string
	}
	avatarUrl: string
}

export interface OrganizationSignUpData {
	name: string
	affiliatedUnit: string
	description: string
	contactInfo: string
	account: {
		email: string
		password: string
	}
	avatarUrl: string
}

class AuthApi {
	async personSignUp(data: PersonalSignUpData) {
		try {
			await httpClient.post('/auth/registryStudent', data)
		} catch (error) {
			handleError(error, AuthError)
		}
	}

	async organizationSignUp(data: OrganizationSignUpData) {
		try {
			await httpClient.post('/auth/registryOrganization', data)
		} catch (error) {
			handleError(error, AuthError)
		}
	}

	async logIn({ email, password }: { email: string; password: string }) {
		try {
			return await httpClient.post<Account>('/auth/login', { email, password })
		} catch (error) {
			handleError(error, AuthError)
		}
	}

	async sendOtpCode(email: string) {
		try {
			await httpClient.get('/auth/sendOTPcode', {
				params: {
					email,
				},
			})
		} catch (error) {
			handleError(error, AuthError)
		}
	}

	async activeAccount({ email, otpCode }: { email: string; otpCode: string }) {
		try {
			await httpClient.post('/auth/activeAccount', { email, otpCode })
		} catch (error) {
			handleError(error, AuthError)
		}
	}

	async changePassword({
		email,
		newPassword,
		otpCode,
	}: {
		email: string
		otpCode: string
		newPassword: string
	}) {
		try {
			await httpClient.post('/auth/changePassword', {
				email,
				otpCode,
				newPassword,
			})
		} catch (error) {
			handleError(error, AuthError)
		}
	}

	async logOut() {
		try {
			await httpClient.get('/auth/logout')
		} catch (error) {
			handleError(error, AuthError)
		}
	}
}

const authApi = new AuthApi()
export default authApi
