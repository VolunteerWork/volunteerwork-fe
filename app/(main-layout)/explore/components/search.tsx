import { SearchNormal1 } from 'iconsax-react'

export default function Search() {
	return (
		<section className='container py-16 flex items-center flex-col'>
			<h2 className='text-4xl font-bold mb-4 text-center'>Khám phá</h2>
			<h3 className='mb-14'>Khám phá các tổ chức, hoạt động yêu thích </h3>

			<div className='flex items-center bg-slate-50 border border-slate-200 max-w-[50rem] w-full p-1 md:p-1.5 md:rounded-2xl rounded-xl'>
				<input
					placeholder='Tìm kiếm hoạt động theo tên, trường, đơn vị tổ chức, ...'
					className='outline-none bg-transparent flex-1 px-4 md:px-6'
				/>
				<button className='flex items-center justify-center h-9 md:h-10 px-4 md:px-6 bg-primary-200 rounded-lg md:rounded-xl'>
					<SearchNormal1 className='h-4 md:h-5' />
				</button>
			</div>

			<div className='flex items-center flex-wrap mb-2 justify-center space-x-3 mt-8'>
				{['UIT', 'MHX', 'XTN', 'CTXH', 'KTX'].map((label, index) => (
					<span
						key={index}
						className='bg-primary-200 text-primary-700 py-1 px-4 rounded-full cursor-pointer transition hover:bg-primary-200/90'
					>
						{label}
					</span>
				))}
			</div>
		</section>
	)
}
