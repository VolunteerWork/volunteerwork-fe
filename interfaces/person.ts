import Account from './account'
import VolunteerWork from '@/interfaces/volunteer-work'


export interface Person {
	_id: string
	account: Account
	name: string
	faculty: string
	school: string
	gender: boolean
	totalPoints: number
	quote: string
	phoneNumber: string
	studentCode: string
	dob: Date
	avatarUrl: string
    attendedActivities: VolunteerWork[],
}
