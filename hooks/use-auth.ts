'use client'

import organizationsApi from '@/apis/organizations'
import personsApi from '@/apis/persons'
import { Organization } from '@/interfaces/organization'
import { Person } from '@/interfaces/person'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useToast } from './use-toast'
import queryKeys from '@/configs/query-keys'
import authApi from '@/apis/auth'
import { AccountRole } from '@/interfaces/account-role'

export default function useAuth() {
	const [isLoggedIn, setIsLoggedIn, removeIsLoggedIn] = useLocalStorage(
		'isLoggedIn',
		false,
	)
	const [isOrganization, setIsOrganization, removeIsOrganization] =
		useLocalStorage('isOrganization', false)

	const { toast } = useToast()

	const { data: accountInfo, error } = useQuery<
		Person | Organization | undefined
	>({
		queryKey: queryKeys.account,
		queryFn: isOrganization ? organizationsApi.getMe : personsApi.getMe,
		enabled: isLoggedIn,
	})

	const queryClient = useQueryClient()

	const { mutate: logIn, isPending: isLoggingIn } = useMutation({
		mutationFn: authApi.logIn,
		onSuccess: data => {
			toast({
				description: 'Đăng nhập thành công',
			})
			setIsLoggedIn(true)
			setIsOrganization(data!.role === AccountRole.ORGANIZATION)
		},
		onError: error => {
			toast({
				title: 'Đăng nhập thất bại',
				description: error.message,
				variant: 'destructive',
			})
		},
	})

	const { mutate: logOut } = useMutation({
		mutationFn: authApi.logOut,
		onSuccess: () => {
			removeIsLoggedIn()
			removeIsOrganization()
			queryClient.removeQueries({ queryKey: queryKeys.account })
		},
	})

	useEffect(() => {
		if (error) {
			toast({
				title: 'Phiên đăng nhập đã hết hạn',
				description: 'Vui lòng đăng nhập lại',
				variant: 'destructive',
			})
			logOut()
		}
	}, [error, logOut, removeIsLoggedIn, removeIsOrganization, toast])

	return {
		isLoggedIn: isLoggedIn && !!accountInfo,
		accountInfo,
		isOrganization,
		logOut,
		logIn,
		isLoggingIn,
	}
}
