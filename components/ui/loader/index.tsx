'use client'

import { useScrollLock } from 'usehooks-ts'
import styles from './loader.module.css'

export default function Loader() {
	useScrollLock()

	return (
		<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-[99999]'>
			<div className={styles.loader}></div>
		</div>
	)
}
