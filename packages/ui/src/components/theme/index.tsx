/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useMemo } from 'react'

import { deepmerge } from '@mui/utils'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  lighten,
  darken
} from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import type {} from '@mui/material/themeCssVarsAugmentation'
import type {} from '@mui/lab/themeAugmentation'
import type { ChildrenType, Direction } from '@repo/ui'
import ModeChanger from './ModeChanger'
import themeConfig from '@configs/themeConfig'
import primaryColorConfig from '@configs/primaryColorConfig'
import { useSettings } from '@core/hooks/useSettings'
import defaultCoreTheme from '@core/theme'

type Props = ChildrenType & {
  direction: Direction
}

const ThemeProvider = (props: Props) => {
  const { children, direction } = props

  const { settings } = useSettings()

  const theme = useMemo(() => {
    const newColorScheme = {
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: primaryColorConfig[0].main,
              light: lighten(primaryColorConfig[0].main as string, 0.2),
              dark: darken(primaryColorConfig[0].main as string, 0.1)
            }
          }
        },
        dark: {
          palette: {
            primary: {
              main: primaryColorConfig[0].main,
              light: lighten(primaryColorConfig[0].main as string, 0.2),
              dark: darken(primaryColorConfig[0].main as string, 0.1)
            }
          }
        }
      }
    }

    const coreTheme = deepmerge(defaultCoreTheme(settings.mode || 'light', direction), newColorScheme)

    return extendTheme(coreTheme)
  }, [settings.mode])

  return (
    <AppRouterCacheProvider options={{ prepend: true }}>
      <CssVarsProvider
        theme={theme}
        defaultMode={settings.mode}
        modeStorageKey={`${themeConfig.templateName.toLowerCase().split(' ').join('-')}-mui-template-mode`}
      >
        <>
          <ModeChanger />
          <CssBaseline />
          {children}
        </>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  )
}

export default ThemeProvider
