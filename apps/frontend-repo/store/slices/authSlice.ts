import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { setCookie, destroyCookie } from 'nookies'

import AuthAPIs from '@/views/services/auth'

interface User {
  displayName: string
  email: string
  createdAt: string
  role: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    logout: state => {
      state.user = null
      state.loading = false
      state.error = null

      destroyCookie(null, 'token')
    },

    registerRequest: state => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const login = (email: string, password: string) => async (dispatch: any) => {
  dispatch(loginRequest())

  try {
    const response = await AuthAPIs.login({ email, password })

    const { user, token } = response.data

    setCookie(null, 'token', token, {
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    })

    dispatch(loginSuccess(user))
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed'

    dispatch(loginFailure(errorMessage))
    throw new Error(errorMessage)
  }
}

export const register = (email: string, password: string, displayName: string) => async (dispatch: any) => {
  dispatch(registerRequest())

  try {
    const response = await AuthAPIs.register({ email, password, displayName })

    const { user } = response.data

    dispatch(registerSuccess(user))
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Registration failed'

    dispatch(registerFailure(errorMessage))
    throw new Error(errorMessage)
  }
}

export const { loginRequest, loginSuccess, loginFailure, logout, registerRequest, registerSuccess, registerFailure } =
  authSlice.actions
export default authSlice.reducer
