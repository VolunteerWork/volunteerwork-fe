export class AuthError extends Error {
	constructor(message: string) {
		switch (true) {
			case message == 'Email and password are required':
				super('Email và mật khẩu không được để trống')
				break
			case /Email .* does not exist/.test(message):
				super('Email không tồn tại')
				break
			case message == 'Password is incorrect':
				super('Mật khẩu không đúng')
				break
			case message == 'The OTP code has been expired':
				super('Mã OTP đã hết hạn')
				break
			case message == 'The OTP code is incorrect':
				super('Mã OTP không đúng')
				break
			case message == 'The entered OTP code is incorrect':
				super('Mã OTP không đúng')
				break
			case message == 'This email has been used. Please choose another email':
				super('Email đã được sử dụng. Vui lòng chọn email khác')
				break
			default:
				super('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
		}
	}
}
