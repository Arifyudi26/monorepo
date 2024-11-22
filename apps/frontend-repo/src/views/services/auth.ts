import instance from '../../services/AxiosGlobal'

const login = (data: { email: string; password: string }) => {
  return instance.post('sign-in', data)
}

const register = (data: { email: string; password: string; displayName: string }) => {
  return instance.post('sign-up', data)
}

const AuthAPIs = {
  login,
  register
}

export default AuthAPIs
