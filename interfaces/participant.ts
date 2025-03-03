import { Person } from "./person"
import VolunteerWork from "./volunteer-work"

export type ParticipantStatus = 'ACCEPTED' | 'UNACCEPTED' | 'WAITING' | 'FINISH'
export interface Participant {
	_id: string
	studentId: Person
	volunteerWorkId: VolunteerWork
	status: ParticipantStatus
	feedback: string
	rating: number
	receivedCoins: number
	createdAt: Date
}
