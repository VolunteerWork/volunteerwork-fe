import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface PaginatedResponse<T> {
	data: T[]
	pagination: {
		total: number
		currentPage: number
	}
}

class HttpClient {
	baseUrl: string
	instance: AxiosInstance

	constructor() {
		this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
		this.instance = axios.create({
			baseURL: this.baseUrl,
			withCredentials: true,
		})
	}

	private getUrl(endpoint: string) {
		return `${this.baseUrl}${endpoint}`
	}

	async get<T = any>(endpoint: string, config?: AxiosRequestConfig) {
		const response = await this.instance.get<T>(this.getUrl(endpoint), config)
		return response.data
	}

	async post<T = any>(
		endpoint: string,
		data?: object,
		config?: AxiosRequestConfig,
	) {
		const response = await this.instance.post<T>(
			this.getUrl(endpoint),
			data,
			config,
		)
		return response.data
	}

	async patch<T = any>(
		endpoint: string,
		data?: object,
		config?: AxiosRequestConfig,
	) {
		const response = await this.instance.patch<T>(
			this.getUrl(endpoint),
			data,
			config,
		)
		return response.data
	}

	async delete<T = any>(endpoint: string, config?: AxiosRequestConfig) {
		const response = await this.instance.delete<T>(
			this.getUrl(endpoint),
			config,
		)
		return response.data
	}
}

export function handleError(
	error: any,
	ErrorClass?: new (message: string) => Error,
) {
	if (axios.isAxiosError<string>(error)) {
		console.log(error)
		if (error.response) {
			if (error.response.status >= 500 && error.response.status < 600) {
				throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
			}

			const message = error.response.data
			if (ErrorClass) {
				throw new ErrorClass(message)
			} else {
				throw new Error(message)
			}
		} else {
			throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
		}
	} else {
		throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
	}
}

const httpClient = new HttpClient()

export default httpClient
