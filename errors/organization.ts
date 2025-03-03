export class OrganizationError extends Error {
	constructor(message: string) {
		switch (true) {
			case message == 'VolunteerWork of the event does not exist':
				super('Hoạt động tình nguyện không tồn tại')
				break
			default:
				super('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
		}
	}
}
