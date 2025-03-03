import VolunteerWork from '@/interfaces/volunteer-work'
import { type ClassValue, clsx } from 'clsx'
import { min } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import * as XLSX from 'xlsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function splitName(name: string) {
	const [firstName, ...lastName] = name.split(/\s+/)
	return {
		firstName,
		lastName: lastName.join(' '),
	}
}

export function getRandomAvatar(gender: boolean, username: string) {
	return `https://avatar.iran.liara.run/public/${
		gender ? 'boy' : 'girl'
	}?username=${username}`
}

export function getRandomTextAvatar(username: string) {
	return `https://avatar.iran.liara.run/username?username=${username}`
}

export function getEndDateOfVolunteerWork(volunteerWork: VolunteerWork) {
	return min(
		[
			volunteerWork.endRegisteredDate,
			...volunteerWork.events.map(e => e.endDate),
		].filter(Boolean),
	)
}

export function exportToExcel(
	rows: object[],
	sheetName: string,
	fileName: string,
) {
	const worksheet = XLSX.utils.json_to_sheet(rows)

	const workbook = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
	XLSX.writeFile(workbook, fileName, { compression: true })
}
