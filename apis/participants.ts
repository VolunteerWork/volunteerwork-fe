import { ParticipantsError } from '@/errors/participants-error'
import { Participant, ParticipantStatus } from '@/interfaces/participant'
import httpClient, { handleError } from '@/lib/http-client'

class ParticipantsApi {
	async getByVolunteerWork(data: {
		volunteerWorkId: string
		status?: ParticipantStatus
	}) {
		try {
			return await httpClient.post<Participant[]>(
				'/participant/participants',
				data,
			)
		} catch (error) {
			handleError(error, ParticipantsError)
		}
	}

	async joinVolunteerWork(id: string) {
		try {
			return await httpClient.post<Participant>(
				'/participant/joinVolunteerWork',
				{
					volunteerWorkId: id,
				},
			)
		} catch (error) {
			handleError(error, ParticipantsError)
		}
	}

	async acceptParticipant(data: {
		participantId: string
		isAccepted: boolean
	}) {
		try {
			return await httpClient.post<Participant>(
				'/participant/acceptParticipant',
				data,
			)
		} catch (error) {
			handleError(error, ParticipantsError)
		}
	}

	async giveFeedback(data: {
		participantId: string
		feedback: string
		rating: number
	}) {
		try {
			return await httpClient.post<Participant>('/participant/feedback', data)
		} catch (error) {
			handleError(error, ParticipantsError)
		}
	}

	async getActivities(studentId: string) {
		try {
			return await httpClient.get<Participant[]>(
				'/participant/finishedParticipants/' + studentId,
			)
		} catch (error) {
			handleError(error, ParticipantsError)
		}
	}
}

const participantsApi = new ParticipantsApi()
export default participantsApi
