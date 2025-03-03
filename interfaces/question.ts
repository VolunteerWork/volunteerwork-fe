import { Person } from './person'

export default interface Question {
	_id: string
	questionText: string
	answer: string
	createdAt: Date
	studentId: Person
}
