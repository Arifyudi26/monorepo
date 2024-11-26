import { Providers } from '@repo/ui/'

import type { ChildrenType } from '@repo/ui'
import BlankLayout from '@layouts/BlankLayout'

const Layout = ({ children }: ChildrenType) => {
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <BlankLayout>{children}</BlankLayout>
    </Providers>
  )
}

export default Layout
