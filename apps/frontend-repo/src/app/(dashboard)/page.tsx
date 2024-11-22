'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'

import type { AppDispatch, RootState } from '@store/store'
import { fetchAllUsers } from '@store/slices/userSlice'
import Table from '@views/dashboard/Table'

const DashboardAnalytics = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, error } = useSelector((state: RootState) => state.users)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  const handleDetail = (id: string) => {
    router.push(`/${id}`)
  }

  const columns = [
    {
      header: 'Username',
      accessor: (row: any) => <Typography>{row.displayName}</Typography>
    },
    {
      header: 'Email',
      accessor: (row: any) => <Typography>{row.email}</Typography>
    },
    {
      header: 'Role',
      accessor: (row: any) => (
        <div className='flex gap-2'>
          <i
            className={classnames(
              row.role === 'admin' ? 'ri-vip-crown-line' : 'ri-user-3-line',
              row.role === 'admin' ? 'text-primary' : 'text-success',
              'text-[22px]'
            )}
          />
          <Typography color='text.primary'>{row.role}</Typography>
        </div>
      )
    },
    {
      header: 'Created At',
      accessor: (row: any) => <Typography>{row.createdAt}</Typography>
    },
    {
      header: 'action',
      accessor: (row: any) => (
        <Button variant='contained' onClick={() => handleDetail(row.id)}>
          Detail
        </Button>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Table data={users || []} columns={columns} error={error} loading={loading} />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
