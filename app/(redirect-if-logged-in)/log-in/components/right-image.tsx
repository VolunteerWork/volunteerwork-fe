'use client'

import lottieAnimations from '@/assets/lottie-animations'
import LottieAnimation from '@/components/lottie-animation'

function RightImage() {
    const sizeOfIllustrator = (width: number, height: number) => {
		if (width <= 1280) {
            return 400
        } else {
            return 500
        }
	}

    return (
        <LottieAnimation lottie={lottieAnimations.login} sizeOfIllustrator={sizeOfIllustrator}/>
    )
}

export default RightImage