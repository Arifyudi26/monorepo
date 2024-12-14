'use client'

import Link from 'next/link'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Illustrations from '@repo/ui/src/components/Illustrations'

import type { Mode } from '@repo/ui'

import { useImageVariant } from '@core/hooks/useImageVariant'

const UnderMaintenance = ({ mode }: { mode: Mode }) => {
  const darkImg = '/images/pages/misc-mask-dark.png'
  const lightImg = '/images/pages/misc-mask-light.png'

  const miscBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center gap-10'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
          <Typography variant='h4'>Under Maintenance! 🚧</Typography>
          <Typography>Sorry for the inconvenience but we&#39;re performing some maintenance at the moment</Typography>
        </div>
        <img
          alt='error-illustration'
          src='/images/illustrations/characters/6.png'
          className='object-cover bs-[400px] md:bs-[450px] lg:bs-[500px]'
        />
        <Button href='/' component={Link} variant='contained'>
          Back to Home
        </Button>
      </div>
      <Illustrations maskImg={{ src: miscBackground }} />
    </div>
  )
}

export default UnderMaintenance
