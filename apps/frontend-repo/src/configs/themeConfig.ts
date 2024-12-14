import type { Mode } from '@core/types'

export type Config = {
  templateName: string
  settingsCookieName: string
  mode: Mode
  layoutPadding: number
  compactContentWidth: number
  disableRipple: boolean
}

const themeConfig: Config = {
  templateName: 'EBUDDY PTE. LTD',
  settingsCookieName: 'EBUDDY PTE. LTD',
  mode: 'light',
  layoutPadding: 24,
  compactContentWidth: 1440,
  disableRipple: false
}

export default themeConfig
