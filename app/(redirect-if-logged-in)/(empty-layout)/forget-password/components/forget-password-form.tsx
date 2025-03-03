'use client'

import { useStep } from 'usehooks-ts'
import Step1 from './step1'
import { useState } from 'react'
import Step2 from './step2'

export default function ForgetPasswordForm() {
	const [currentStep, { goToNextStep, goToPrevStep }] = useStep(2)
	const [email, setEmail] = useState('')

	return (
		<div>
			{currentStep === 1 ? (
				<Step1
					onNextStep={email => {
						setEmail(email)
						goToNextStep()
					}}
				/>
			) : (
				<Step2 email={email} onPrevStep={() => goToPrevStep()} />
			)}
		</div>
	)
}
