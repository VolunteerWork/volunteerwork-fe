import { AccountRole } from './account-role'

export default interface Account {
	_id: string
	email: string
	role: AccountRole
	isActive: boolean
} 
