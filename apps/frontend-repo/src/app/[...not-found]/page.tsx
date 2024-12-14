import { Providers } from '@repo/ui'

import BlankLayout from '@layouts/BlankLayout'

import { getServerMode } from '@core/utils/serverHelpers'

import NotFound from '@views/NotFound'

const NotFoundPage = () => {
  const direction = 'ltr'
  const mode = getServerMode()

  return (
    <Providers direction={direction}>
      <BlankLayout>
        <NotFound mode={mode} />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
