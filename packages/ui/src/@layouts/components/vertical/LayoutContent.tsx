'use client'

import classnames from 'classnames'

import type { ChildrenType } from '@repo/ui'

import { verticalLayoutClasses } from '@repo/ui/src/@layouts/utils/layoutClasses'

import StyledMain from '@repo/ui/src/@layouts/styles/shared/StyledMain'

const LayoutContent = ({ children }: ChildrenType) => {
  return (
    <StyledMain
      isContentCompact={true}
      className={classnames(verticalLayoutClasses.content, verticalLayoutClasses.contentCompact, 'flex-auto is-full')}
    >
      {children}
    </StyledMain>
  )
}

export default LayoutContent
