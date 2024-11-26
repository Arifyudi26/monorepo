import { getServerMode } from '@core/utils/serverHelpers'

import NotFound from '@views/NotFound'

const Error = () => {
  const mode = getServerMode()

  return <NotFound mode={mode} />
}

export default Error
