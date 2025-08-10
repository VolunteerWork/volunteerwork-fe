import { VolunteerWorkError } from '@/errors/volunteer-work-error'
import VolunteerWork from '@/interfaces/volunteer-work'
import httpClient, { PaginatedResponse, handleError } from '@/lib/http-client'

type CreateData = Omit<
	VolunteerWork,
	| '_id'
	| 'imageUrl'
	| 'createdAt'
	| 'events'
	| 'organization'
	| 'questions'
	| 'events'
>

export type VolunteerWorkUpdateData = Partial<
	Omit<
		VolunteerWork,
		'imageUrl' | 'organization' | 'createdAt' | 'events' | 'questions'
	>
>

interface AddEventData {
	title: string
	description: string
	startDate: Date
	endDate: Date
	volunteerWorkId: string
}

class VolunteerWorksApi {
	async createNew({ data, image }: { data: CreateData; image: File }) {
		try {
			const formData = new FormData()
			formData.append('jsonData', JSON.stringify(data))
			formData.append('image', image)

			return await httpClient.post<VolunteerWork>(
				'/volunteerwork',
				formData,
			)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async getInfo(id: string) {
		try {
			return await httpClient.get<VolunteerWork>(
				`/volunteerwork/${id}`
			)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async getVolunteerWorksByOrganizationId(data: {
		organizationId: string
		page: number
		limit: number
	}) {
		try {
			return await httpClient.post<PaginatedResponse<VolunteerWork>>(
				`/volunteerwork/org/${data.organizationId}`,
				data,
			)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async get(data: { limit: number; page: number }) {
		try {
			return await httpClient.post<PaginatedResponse<VolunteerWork>>(
				'/volunteerwork/all',
				data,
			)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async addQuestion(data: { questionText: string; volunteerWorkId: string }) {
		try {
			return await httpClient.post('/volunteerwork/add-question', data)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async answerQuestion(data: { questionId: string; answer: string }) {
		try {
			return await httpClient.post('/volunteerwork/answer-question', data)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async addEvent(data: AddEventData) {
		try {
			return await httpClient.post('/volunteerwork/new-event', data)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async update(data: VolunteerWorkUpdateData, file?: File) {
		try {
			const formData = new FormData()
			formData.append('jsonData', JSON.stringify(data))
			if (file) {
				formData.append('image', file)
			}

			return await httpClient.put(
				'/volunteerwork',
				formData,
			)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async deleteEvent(eventId: string) {
		try {
			return await httpClient.delete('/volunteerwork/delete-event/' + eventId)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}

	async deleteVolunteerWork(volunteerWorkId: string) {
		try {
			return await httpClient.delete(
				`/volunteerwork/${volunteerWorkId}`,
			)
		} catch (error) {
			handleError(error, VolunteerWorkError)
		}
	}
}

const volunteerWorksApi = new VolunteerWorksApi()
export default volunteerWorksApi
