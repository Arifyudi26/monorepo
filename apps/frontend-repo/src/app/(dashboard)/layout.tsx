import { Navigation, Navbar, VerticalFooter, Providers } from '@monorepo/shared'

import type { ChildrenType } from '@core/types'
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

const Layout = async ({ children }: ChildrenType) => {
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<Navigation />} navbar={<Navbar />} footer={<VerticalFooter />}>
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}

export default Layout
