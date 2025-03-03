'use client'

import lottieAnimations from '@/assets/lottie-animations'
import LottieAnimation from '@/components/lottie-animation'

function RightImage() {
    const sizeOfIllustrator = (width: number, height: number) => {
		if (width <= 1280) {
            return 500
        } 
        return 700
	}

    return (
        <LottieAnimation lottie={lottieAnimations.register} sizeOfIllustrator={sizeOfIllustrator}/>
    )
}

export default RightImage