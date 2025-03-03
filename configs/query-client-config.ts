import { QueryClientConfig } from '@tanstack/react-query'

const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 1000 * 60 * 5,
		},
	},
}

export default queryClientConfig
