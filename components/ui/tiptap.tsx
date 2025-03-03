'use client'

import { cn } from '@/lib/utils'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'

interface TiptapProps {
	className?: string
	onChange?: (value: string) => void
	value?: string
	defaultValue?: string
	autofocus?: boolean
}

const Tiptap = ({
	className,
	onChange,
	value,
	defaultValue = '',
	autofocus,
}: TiptapProps) => {
	const [first, setFirst] = useState(true)

	const editor = useEditor({
		extensions: [StarterKit],
		content: '<p></p>',
		editorProps: {
			attributes: {
				class: cn(
					'prose prose-sm w-full rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 max-w-none [&_:where(p):not(:where([class~="not-prose"],[class~="not-prose"]_*))]:my-0.5 [&_:where(.prose-sm_>_:first-child):not(:where([class~="not-prose"],[class~="not-prose"]_*))]:!mt-0 [&_:where(.prose-sm_>_:last-child):not(:where([class~="not-prose"],[class~="not-prose"]_*))]:!mb-0',
					className,
				),
			},
		},
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			if (onChange) {
				onChange(html)
			}
		},
	})

	useEffect(() => {
		if (editor && value && first) {
			editor.commands.setContent(value)
			setFirst(false)
		}
	}, [editor, first, value])

	return (
		<>
			{editor && (
				<BubbleMenu
					className='bg-white border text-sm border-slate-100 py-1 px-4 space-x-3 rounded-md shadow-md'
					tippyOptions={{ duration: 100 }}
					editor={editor}
				>
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={cn(
							editor.isActive('bold') && 'is-active',
							'font-medium',
						)}
					>
						Bold
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={cn(editor.isActive('italic') && 'is-active', 'italic')}
					>
						Italic
					</button>
					<button
						type='button'
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={cn(
							editor.isActive('strike') && 'is-active',
							'line-through',
						)}
					>
						Strike
					</button>
				</BubbleMenu>
			)}

			<EditorContent editor={editor} />
		</>
	)
}

export default Tiptap
