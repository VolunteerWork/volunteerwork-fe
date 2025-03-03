'use client'
import { useDeviceSize } from '@/hooks'
import Lottie from 'react-lottie'

function LottieAnimation({lottie, sizeOfIllustrator}: {lottie: any, sizeOfIllustrator: (ag0: number, ag1: number) => number}) {
    const [deviceWidth, deviceHeight] = useDeviceSize()

	let size = sizeOfIllustrator(deviceWidth, deviceHeight)

	return (
		<Lottie
			options={{
				loop: true,
				autoplay: true,
				animationData: lottie,
			}}
			height={size}
			width={size}
		/>
	)
}

export default LottieAnimation
