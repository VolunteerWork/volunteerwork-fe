import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'

export default function AvatarUpdate({
	initialAvatar,
	onSubmit,
}: {
	initialAvatar: string
	onSubmit?: (file: File) => void
}) {
	const [avatar, setAvatar] = useState<ImageListType>([])

	return (
		<ImageUploading
			value={avatar}
			onChange={value => setAvatar(value)}
			dataURLKey='data_url'
		>
			{({ imageList, onImageUpload, onImageRemove }) => (
				<div className='flex items-center flex-col mb-16'>
					<Image
						alt='avatar'
						src={imageList[0] ? imageList[0]['data_url'] : initialAvatar}
						width={144}
						height={144}
						className='w-36 h-36 object-cover rounded-full'
					/>

					{imageList[0] ? (
						<div className='flex items-center space-x-3'>
							<Button
								variant='secondary'
								size='sm'
								className='mt-4'
								onClick={() => {
									if (onSubmit && imageList[0].file) {
										onSubmit(imageList[0].file)
										onImageRemove(0)
									}
								}}
							>
								Lưu
							</Button>
							<Button
								variant='destructive'
								size='sm'
								className='mt-4'
								onClick={() => onImageRemove(0)}
							>
								Xóa
							</Button>
						</div>
					) : (
						<Button
							variant='secondary'
							size='sm'
							className='mt-4'
							onClick={onImageUpload}
						>
							Đổi
						</Button>
					)}
				</div>
			)}
		</ImageUploading>
	)
}
