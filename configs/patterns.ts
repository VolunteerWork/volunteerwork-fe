const patterns = {
	password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	otpCode: /^\d{6}$/,
	phoneNumber: /^\d{10}$/,
	
}

export default patterns
