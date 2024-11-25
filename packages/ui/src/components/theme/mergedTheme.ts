import { deepmerge } from '@mui/utils'
import type { Theme } from '@mui/material/styles'

import type { Settings } from '@repo/ui/src/@core/contexts/settingsContext'
import type { SystemMode } from '@repo/ui/src/@core/types'

import coreTheme from '@repo/ui/src/@core/theme'

const mergedTheme = (settings: Settings, mode: SystemMode, direction: Theme['direction']) => {
  const userTheme = {} as Theme

  return deepmerge(coreTheme(mode, direction), userTheme)
}

export default mergedTheme
