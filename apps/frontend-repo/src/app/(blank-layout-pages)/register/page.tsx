import { getServerMode } from '@repo/ui/src/@core/utils/serverHelpers'

import Register from '@views/Register'

const RegisterPage = () => {
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default RegisterPage
