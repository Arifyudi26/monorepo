import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}', '../../packages/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('@repo/ui/src/@core/tailwind/plugin')],
  theme: {
    extend: {}
  }
}

export default config
