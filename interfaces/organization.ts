import Account from "./account"

export interface Organization {
	_id: string
	account: Account
	name: string
	affiliatedUnit: string
	description: string
	isVerified: boolean
	avatarUrl: string
	contactInfo: string
}
