import { getServerMode } from '@core/utils/serverHelpers'

import Login from '@views/Login'

const LoginPage = () => {
  const mode = getServerMode()

  return <Login mode={mode} />
}

export default LoginPage
