'use client'

import { OrganizationSignUpData } from '@/apis/auth'
import { useState } from 'react'
import Step1 from './step-1'
import Step2 from './step-2'

export default function Organization() {
	const [data, setData] = useState<OrganizationSignUpData>()

	const [step, setStep] = useState(1)

	return step === 1 ? (
		<Step1
			onNextStep={data => {
				setData(data)
				setStep(2)
			}}
			data={data}
		/>
	) : (
			<Step2 data={data!} onPrevStep={() => {
				setStep(1)
		}} />
	)
}
