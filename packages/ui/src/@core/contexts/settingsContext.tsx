/* eslint-disable no-unused-vars */
'use client'

import type { ReactNode } from 'react'
import { createContext, useMemo, useState } from 'react'

import type { Mode } from '@repo/ui'

import themeConfig from '@configs/themeConfig'

import { useObjectCookie } from '@core/hooks/useObjectCookie'

export type Settings = {
  mode?: Mode
}

type UpdateSettingsOptions = {
  updateCookie?: boolean
}

type SettingsContextProps = {
  settings: Settings
  updateSettings: (settings: Partial<Settings>, options?: UpdateSettingsOptions) => void
  isSettingsChanged: boolean
  resetSettings: () => void
  updatePageSettings: (settings: Partial<Settings>) => () => void
}

type Props = {
  children: ReactNode
  settingsCookie: Settings | null
  mode?: Mode
}

export const SettingsContext = createContext<SettingsContextProps | null>(null)

export const SettingsProvider = (props: Props) => {
  const initialSettings: Settings = {
    mode: themeConfig.mode
  }

  const updatedInitialSettings = {
    ...initialSettings,
    mode: props.mode || themeConfig.mode
  }

  const [settingsCookie, updateSettingsCookie] = useObjectCookie<Settings>(
    themeConfig.settingsCookieName,
    JSON.stringify(props.settingsCookie) !== '{}' ? props.settingsCookie : updatedInitialSettings
  )

  const [_settingsState, _updateSettingsState] = useState<Settings>(
    JSON.stringify(settingsCookie) !== '{}' ? settingsCookie : updatedInitialSettings
  )

  const updateSettings = (settings: Partial<Settings>, options?: UpdateSettingsOptions) => {
    const { updateCookie = true } = options || {}

    _updateSettingsState(prev => {
      const newSettings = { ...prev, ...settings }

      if (updateCookie) updateSettingsCookie(newSettings)

      return newSettings
    })
  }

  const updatePageSettings = (settings: Partial<Settings>): (() => void) => {
    updateSettings(settings, { updateCookie: false })

    return () => updateSettings(settingsCookie, { updateCookie: false })
  }

  const resetSettings = () => {
    updateSettings(initialSettings)
  }

  const isSettingsChanged = useMemo(
    () => JSON.stringify(initialSettings) !== JSON.stringify(_settingsState),
    [_settingsState]
  )

  return (
    <SettingsContext.Provider
      value={{
        settings: _settingsState,
        updateSettings,
        isSettingsChanged,
        resetSettings,
        updatePageSettings
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}
