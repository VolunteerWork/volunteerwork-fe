import { PersonError } from '@/errors/person-error'
import { Person } from '@/interfaces/person'
import httpClient, { handleError } from '@/lib/http-client'

class PersonsApi {
	async getMe() {
		try {
			return await httpClient.get<Person>('/student/me')
		} catch (error) {
			handleError(error, PersonError)
		}
	}

	async getInfo(id: string) {
		try {
			return await httpClient.get<Person>(`/student/${id}`)
		} catch (error) {
			handleError(error, PersonError)
		}
	}

	async uploadAvatar(file: File) {
		try {
			const formData = new FormData()
			formData.append('image', file)
			return await httpClient.post('/student/upload-avatar', formData)
		} catch (error) {
			handleError(error, PersonError)
		}
	}

	async update(
		data: Partial<
			Omit<Person, '_id' | 'account' | 'totalPoints' | 'avatarUrl'>
		>,
	) {
		try {
			return await httpClient.put('/student', data)
		} catch (error) {}
	}

	async getTop10() {
		try {
			return await httpClient.get<Person[]>('/student/top-10-students')
		} catch (error) {
			handleError(error, PersonError)
		}
	}
}

const personsApi = new PersonsApi()
export default personsApi
