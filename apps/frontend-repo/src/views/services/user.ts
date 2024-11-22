import instance from '../../services/AxiosGlobal'

const getAllUser = () => {
  return instance.get('fetch-all-user')
}

const getUserDetail = (id: string) => {
  return instance.get(`fetch-user-data/${id}`)
}

const updateUserDetail = (data: { id: string; email: string; name: string }) => {
  return instance.put('update-user-data', data)
}

const UserAPIs = {
  getAllUser,
  getUserDetail,
  updateUserDetail
}

export default UserAPIs
