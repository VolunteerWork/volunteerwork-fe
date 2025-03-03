import type { Config } from 'tailwindcss'

export const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '1rem',
		},
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' },
				},
				'wave1': {
					'0%': { backgroundPositionX: '0' },
					'100%': { backgroundPositionX: '1000px' },
				},
				'wave2': {
					'0%': { backgroundPositionX: '0' },
					'100%': { backgroundPositionX: '-1000px' },
				},
				'run-left-to-right': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite',
				'wave1': 'wave1 ease-linear infinite',
				'wave2': 'wave2 ease-linear infinite',
				'run-left-to-right': 'run-left-to-right 2s ease-linear infinite'
			},

			colors: {
				primary: {
					'50': '#f2f8f9',
					'100': '#deedef',
					'200': '#c1dee0',
					'300': '#96c5ca',
					'400': '#66a5ad',
					'500': '#498891',
					'600': '#3f707b',
					'700': '#385d66',
					'800': '#344f56',
					'900': '#2f444a',
					'950': '#1b2b31',
				},
				footer: '#1E293B',
			},
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/container-queries'),
	],
} satisfies Config

export default config
