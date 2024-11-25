import { getServerMode } from '@repo/ui/src/@core/utils/serverHelpers'

import NotFound from '@views/NotFound'

const Error = () => {
  const mode = getServerMode()

  return <NotFound mode={mode} />
}

export default Error
