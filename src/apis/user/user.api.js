import http from '../http'

const userAPI = {
  getAll: (params = null) => {
    return http.get('/users', { params })
  },
  update: (id, data) => {
    return http.patch(`/users/${id}`, data)
  },
  delete: (id) => {
    return http.delete(`/users/${id}`)
  },
  getById: (id) => {
    return http.get(`/users/${id}`)
  },
}

export default userAPI
