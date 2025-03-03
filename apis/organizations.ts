import { OrganizationError } from '@/errors/organization'
import { Organization } from '@/interfaces/organization'
import httpClient, { PaginatedResponse, handleError } from '@/lib/http-client'

class OrganizationsApi {
	async getMe() {
		try {
			return await httpClient.get<Organization>('/organization/loginedInfo')
		} catch (error) {
			handleError(error, OrganizationError)
		}
	}

	async getInfo(id: string) {
		try {
			return await httpClient.get<Organization>(
				'/organization/organizationInfo',
				{
					params: {
						organizationId: id,
					},
				},
			)
		} catch (error) {
			handleError(error, OrganizationError)
		}
	}

	async uploadAvatar(file: File) {
		try {
			const formData = new FormData()
			formData.append('image', file)
			return await httpClient.post('/organization/uploadAvatar', formData)
		} catch (error) {
			handleError(error, OrganizationError)
		}
	}

	async update(
		data: Partial<
			Omit<Organization, '_id' | 'account' | 'isVerified' | 'avatarUrl'>
		>,
	) {
		try {
			return await httpClient.post('/organization/updateOrganization', data)
		} catch (error) {}
	}

	async getOrganizations(data: { limit: number; page: number }) {
		try {
			return await httpClient.post<PaginatedResponse<Organization>>(
				'/organization/organizations',
				data,
			)
		} catch (error) {
			handleError(error)
		}
	}
}

const organizationsApi = new OrganizationsApi()
export default organizationsApi
