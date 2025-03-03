import { ParticipantStatus } from '@/interfaces/participant'

const queryKeys = {
	account: ['account'],
	accountInfo: { gen: (id?: string) => ['accountInfo', id] },
	volunteerByOrganization: {
		gen: (id?: string) => ['volunteerByOrganization', id],
	},
	volunteer: {
		gen: (id?: string) => ['volunteer', id],
	},
	participantsByVolunteerWork: {
		gen: (id?: string, status?: ParticipantStatus) => [
			'participantsByVolunteerWork',
			id,
			status,
		],
	},
	volunteerWorks: ['volunteerWorks'],
	volunteerWorksPagination: {
		gen: (page?: number, limit?: number) => ['volunteerWorks', page, limit],
	},
	leaderboard: ['leaderboard'],
	organizations: ['organizations'],
	organizationsPagination: {
		gen: (page?: number, limit?: number) => ['organizations', page, limit],
	},
	personActivities: {
		gen: (studentId?: string) => ['personActivities', studentId],
	},
}

export default queryKeys
