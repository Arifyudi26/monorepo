import { Navigation, Navbar, VerticalFooter, Providers } from '@repo/ui'

import type { ChildrenType } from '@repo/ui'
import LayoutWrapper from '@repo/ui/src/@layouts/LayoutWrapper'
import VerticalLayout from '@repo/ui/src/@layouts/VerticalLayout'

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
