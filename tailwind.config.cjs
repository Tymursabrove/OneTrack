/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const config = {

	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				// Main Background color

				color: {
					DEFAULT: '#111A2D',
					'2': '#2B3240',
					'3': '#050E13',
				},
				red: {
					DEFAULT: '#E14343'
				},
				grey: colors.gray,
				grey: {
					DEFAULT: '#8B939E',
					2: '#B7B7B7',
					3: '#293142',
					4: '#6F6E6E',
					5: '#858181',
					6: '#949494',

				},
				blue: {
					DEFAULT: '#1978d3',
					heading: '#1978d3',
					3: '#88C5FF',
					4: '#5AAEFC',
					5: '#46A6FF',
					6: '#BEE0FF',
					7: '#007DF2',
					8: '#1F7ED6',
				},


				green: {
					DEFAULT: '#16CCAC',
					1: '#029178',
					2: '#CBF6EE',
					3: '#16CCAC',
				},
				yellow: {
					DEFAULT: '#F9AF35'
				},
				purple: {
					DEFAULT: '#DF9EFF',
					2: '#CA6CF9',
					3: '#A221E1',
				}
			},
			fontSize: {
				mi: ".65rem",
				md: ".9375rem",
				"2.5xl": "1.75rem",
				"3.5xl": "2rem",
				"4.5xl": "2.5rem",
				"5.5xl": "3.5rem",
				"6.5xl": ["4rem", "1.10"],
				"7.5xl": ["5rem", "1.5"],
				"8.5xl": ["6.5rem", "1.5"],
			},

			backgroundPosition: {
				'center-center': 'center center ',
				'center-bottom': 'center bottom',
				'center-top': 'center top'
			},
			backgroundImage: {
				main: 'radial-gradient(50% 50% at 50% 50%, #0C1F3D 8.33%, #0A1217 100%)',
				// main: 'url(/images/adsource-main-bg.svg)',
				// main: 'url(/images/main-bg.svg)',
				"range-thumb": "url(/src/svg/range-thumb.svg)",
				"range-thumb-gray": "url(/src/svg/range-thumb-gray.svg)",
				bglinear:'linear-gradient(50.68deg, #080808 25.2%, #111A2D 72.44%)',
				'bglinear-2':'linear-gradient(87.2deg, #080808 34.36%, #111A2D 77.37%, #1379C4 98.16%)',
				'bglinear-3':'linear-gradient(116.02deg, rgba(136, 134, 134, 0.4) 0%, rgba(170, 170, 170, 0.3) 100%)',
				'bglinear-4':'linear-gradient(135deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.20) 100%)', 
              	'bglinear-5':'linear-gradient(116deg, rgba(133, 129, 129, 0.05) -11%,rgba(170, 170, 170, 0.2) 116%)',
              	'bglinear-6':'linear-gradient(90deg, #10161F 0%, #1F2731 50.52%, #10161F 100%);',
				'linear-blue': 'linear-gradient(135deg, rgba(0, 125, 242, 0.40) 0%, #46A6FF 100%)',
				'linear-green': 'linear-gradient(135deg, rgba(0, 139, 114, 0.20) 0%, rgba(17, 193, 162, 0.90) 100%)',
				'linear-green-2': 'linear-gradient(135deg, rgba(0, 139, 114, 0.40) 0%, #11C1A2 100%)',
				'linear-red': 'linear-gradient(135deg, rgba(134, 10, 10, 0.40) 0%, #E14343 100%)',
				'linear-red-2': 'linear-gradient(135deg, rgba(134, 10, 10, 0.20) 0%, rgba(225, 67, 67, 0.90) 100%)',
				'linear-orange': 'linear-gradient(135deg, rgba(207, 137, 22, 0.40) 0%, #EEB85F 100%)',
				'table-head':'linear-gradient(90deg, #333B43 0%, #515C67 52.08%, #333B43 100%)',
				// 'table-head':'linear-gradient(90deg, #333B43 0%, #515C67 52.08%, #333B43 100%)',
				'radial-blue-3':'radial-gradient(98.40% 50.00% at 50.00% 51.11%, #46A6FF 0%, #003A71 100%)',


				range:
					'linear-gradient(to bottom, rgba(37,43,60,0.98) 0%,rgba(29,36,54,0.98) 11%,rgba(29,37,55,0.98) 85%,rgba(34,41,59,0.98) 96%,rgba(39,46,63,0.98) 100%)',
				dropdown:
					'linear-gradient(116.02deg, rgba(170, 170, 170, 0.35) 0%, rgba(170, 170, 170, 0.2) 100%)',


				'dropdown-2':
					'linear-gradient(116.02deg, rgba(121, 121, 121, 0.1) 0%, rgba(170, 170, 170, 0.2) 100%)',
				'blue-box-22333': 'linear-gradient(104.64deg, #007DF2 0%, #46A6FF 100%)',
				'blue-box-1': 'linear-gradient(104.64deg, #007DF2 0%, #46A6FF 100%)',
				'blue-box': 'linear-gradient(135deg, #007DF2 0%, #46A6FF 100%)',
				glass:
					'linear-gradient(116.02deg, rgba(196, 196, 196, 0.25) 0%, rgba(196, 196, 196, 0.1) 100%)',
				linear:
					'linear-gradient(116.02deg, rgba(196, 196, 196, 0.05) 0%, rgba(196, 196, 196, 0.02) 100%)',
				'linear-2': 'linear-gradient(270deg, #B7B7B7 0.27%, rgba(183, 183, 183, 0) 99.72%)',
				'linear-3': 'linear-gradient(116.02deg, rgba(133, 129, 129, 0.05) 0%, rgba(170, 170, 170, 0.2) 100%)',
				'glass-light ':
					'linear-gradient(116.02deg, rgba(104, 104, 104, 0.25) 0%, rgba(142, 142, 142, 0.1) 100%)',
				'glass-straight':
					'linear-gradient(116.02deg, rgba(104, 104, 104, 0.25) 0%, rgba(142, 142, 142, 0.25) 100%)',
				'radial-blue-light':
					'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #88C5FF 0%, #5AAEFC 100%)',
				'radial-blue': 'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #46A6FF 0%, #007DF2 100%)',
				'radial-blue-2':
					'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #46A6FF 0%, #007DF2 0.01%, #004A8F 100%)',
				'radial-green': 'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #61F5DB 0%, #16CCAC 100%)',
				'radial-green-2':
					'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #11C1A2 0%, #008B72 100%)',
				'radial-green-3':
					'radial-gradient(ellipse at center, #11c1a2 0%,#008b72 100%)',
				'radial-red': 'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #E14343 0%, #BD1616 100%)',
				'radial-red-light':
					'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #F77A7A 0%, #EB4141 100%)',
				'radial-purple': 'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #C663F7 0%, #A221E1 100%)',
				'glass-purple': 'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #C663F7 0%, #A221E1 100%)',
				'radial-purple-dark':
					'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #A929E8 0%, #6F01A5 100%)',
				'radial-purple-light':
					'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #DF9EFF 0%, #CA6CF9 100%)',
				'stroke-blue-purple':
					'linear-gradient(123.66deg, #007DF2 0%, rgba(0, 125, 242, 0) 52.6%, #A221E1 100%)',
				'radial-yellow':
					'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #FBD28E 0%, #F9AF35 100%)',
				'radial-yellow-2':
					'radial-gradient(63.52% 63.52% at 68.03% 31.76%, #EEB85F 0%, #CF8916 100%)',
				'red-yellow-green': 'linear-gradient(90deg, #BD1616 0%, #F9AF35 50%, #11C1A2 100%)',
				'green-yellow-red': 'linear-gradient(to right, #11c1a2 0%,#f9af35 50%,#bd1616 100%)',
				'ig': 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
				'radial-circle': 'radial-gradient(ellipse at center, rgba(0,125,242,0.5) 65.91%,rgba(0,74,143,1) 100%);',
				'radial-circle-inside': 'radial-gradient(ellipse at center, rgba(70,166,255,0.1) 43%,rgba(0,125,242,0.4) 100%)',
				'table-heading': 'linear-gradient(98.15deg, rgba(70, 166, 255, 0.12) 12.52%, rgba(0, 125, 242, 0) 95.48%)',
				'table-top-bdr': 'linear-gradient(90deg, #007DF2 0%, rgba(217, 217, 217, 0) 92.55%)',

				'purple-box': 'linear-gradient(270deg, #C663F7 0%, rgba(162, 33, 225, 0.5) 100%)',
				'purple-box-2': 'linear-gradient(270deg, #A929E8 0%, rgba(111, 1, 165, 0.5) 100%)',
				'purple-box-3': 'linear-gradient(270deg, #DF9EFF 0%, rgba(202, 108, 249, 0.5) 100%)',
				'blue-box-2': 'linear-gradient(270deg, #46A6FF 0%, rgba(0, 125, 242, 0.5) 100%)',
				'blue-box-3': 'linear-gradient(270deg, #007DF2 0.01%, rgba(0, 74, 143, 0.5) 100%)',
				'blue-box-4': 'linear-gradient(270deg, #88C5FF 0%, rgba(90, 174, 252, 0.5) 100%)',
				'green-box': 'linear-gradient(270deg, #11C1A2 0.01%, rgba(0, 139, 114, 0.5) 100%)',
				'green-box-2': 'linear-gradient(270deg, #61F5DB 0%, rgba(22, 204, 172, 0.5) 100%)',
				'radial-gray': 'radial-gradient(ellipse at center, rgba(221,221,221,0.1) 0%,rgba(152,152,152,0.1) 100%)',
				'purple-text': 'linear-gradient(104.64deg, #46A6FF 0%, #C670F0 100%)'
			},

			backdropBlur: {
				'2.5xl': '50px',
				'4xl': '72px',
				'5xl': '80px',
				'6xl': '96px',
				'7xl': '100px'
			},

			boxShadow: {
				sidebar: '0px 4px 20px rgba(0, 0, 0, 0.6)',
				'timeline-badge': '0px 0px 4px 0px rgba(0, 0, 0, 0.50)',
				checkbox: '-2px 0px 10px rgba(0, 0, 0, 0.35)',
				'glass-dropdown': '8px 8px 24px #000000, 8px 8px 24px #000000, 0px 4px 20px rgba(0, 0, 0, 0.6), inset -2px -2px 4px rgba(255, 255, 255, 0.1), inset 2px 2px 4px rgba(0, 0, 0, 0.1)',

				'glass-2': '0px 4px 20px rgba(0, 0, 0, 0.6), inset -2px -2px 4px rgba(255, 255, 255, 0.1), inset 2px 2px 4px rgba(0, 0, 0, 0.1)',
				green: '0px 0px 18px 0px #008B72, 0px 4px 20px 0px rgba(0, 0, 0, 0.60), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
				glass:
					'0px 4px 20px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.1), inset 2px 2px 4px rgba(0, 0, 0, 0.1)',

				dropdown:
					'4px 4px 10px rgba(0, 0, 0, 0.7), 0px 4px 20px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.1), inset 2px 2px 4px rgba(0, 0, 0, 0.1)',
				'dropdown-2': '4px 4px 10px rgba(0, 0, 0, 0.7)',
				'glow-blue': '0px 0px 20px rgba(0, 125, 242, 0.8)',
				'glow-green': '0px 0px 20px rgba(0, 139, 114, 0.8)',
				'glow-red': '0px 0px 20px rgba(189, 22, 22, 0.8)',
				'blue-shine': '0px 0px 4px rgba(0, 125, 242, 0.8)',
				metaInside:
					'inset 0px -4px 8px rgba(0, 0, 0, 0.5)',
				navbar: '15px 0px 47px -11px rgba(0,0,0,0.46)',
				thumbnail: '0px 15px 15px rgba(0, 0, 0, 0.2)',
				circle: '0px 0px 16px rgba(28, 141, 248, 0.25)',
				button: 'inset 2px 2px 4px 0px rgba(0, 0, 0, 0.1), inset -2px -2px 4px 0px rgba(255, 255, 255, 0.1), 0px 4px 20px 0px rgba(0, 0, 0, 0.6)',

			},

			scale: {
				101: '1.01'
			},

			dropShadow: {
				1: '0px 0px 4px rgba(0, 0, 0, 0.5)',
				'circle-inside': '0px 0px 16px rgba(113, 186, 254, 0.25)',
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite',
			},

			borderWidth: {
				3: '3px',
				5: '5px',
				6: '6px',
				7: '7px',
				8: '8px',
				9: '9px',
				10: '10px',
			},
			ringWidth: {
				3: '3px',
				5: '5px',
				6: '6px'
			},
			spacing: {
				15: '3.75rem',
				18: '4.5rem',
				22: '5.5rem',
				26: '6.5rem',
				30: '7.5rem',
				34: '8.5rem',
				38: '9.5rem',
				42: '10.5rem',
				46: '11.5rem',
				50: '12.5rem',
				54: '13.5rem',
				58: '14.5rem',
				62: '15.5rem',
				66: '16.5rem',
				70: '17.5rem',
				74: '18.5rem',
				78: '19.5rem',
				82: '20.5rem',
				86: '21.5rem',
				90: '22.5rem',
				94: '23.5rem',
				98: '24.5rem',
				102: '25.5rem',
				106: '26.5rem',
				110: '27.5rem',
				120: '30rem',
				130: '32.5rem',
				140: '35rem',
				150: '37.5rem',
				160: '40rem'
			},

			opacity: {
				1: '0.01',
				2: '0.02',
				3: '0.03',
				4: '0.04',
				15: '0.15'
			},

			gridTemplateColumns: {
				13: 'repeat(13, minmax(0, 1fr))',
				14: 'repeat(14, minmax(0, 1fr))',
				15: 'repeat(15, minmax(0, 1fr))',
				16: 'repeat(16, minmax(0, 1fr))',
				17: 'repeat(17, minmax(0, 1fr))',
				18: 'repeat(18, minmax(0, 1fr))',
				19: 'repeat(19, minmax(0, 1fr))',
				20: 'repeat(20, minmax(0, 1fr))',
			},

			gridColumn: {
				'span-13': 'span 13 / span 13',
				'span-14': 'span 14 / span 14',
				'span-15': 'span 15 / span 15',
				'span-16': 'span 16 / span 16',
				'span-17': 'span 17 / span 17',
				'span-18': 'span 18 / span 18',
				'span-19': 'span 19 / span 19',
				'span-20': 'span 20 / span 20'
			},

			minWidth: (theme) => ({
				...theme('spacing')
			}),

			minHeight: (theme) => ({
				...theme('spacing')
			}),

			maxWidth: (theme) => ({
				...theme("spacing"),
			}),
			maxWidth: {
				inherit: 'inherit'
			},

			maxHeight: (theme) => ({
				...theme('spacing')
			}),

			maxHeight: {
				inherit: 'inherit'
			},

			zIndex: {
				'9': '9',
				'99': '99',
				'99': '99',
				'999': '999',
				'9999': '9999',
			},

			keyframes: {
				shimmer: {
					'100%': {
						transform: 'translateX(100%)'
					}
				}
			}
		},

		screens: {
			mv: '360px',
			// => @media (min-width: 480px) { ... }

			xs: '480px',
			// => @media (min-width: 480px) { ... }

			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			ml: '992px', // Medium Large
			// => @media (min-width: 992px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			sl: '1199px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }

			'3xl': '1921px'
			// => @media (min-width: 1920px) { ... }
		}
	},

	plugins: [
		plugin(function ({ addBase, components, theme }) {
			addBase({
				'html, body': {
					backgroundColor: theme('colors.color.DEFAULT'),
				}
			});
		}),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),

	]
};
module.exports = config;
