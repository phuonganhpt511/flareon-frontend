import http from '../http'

const usersAPI = {
  getAll: (params = null) => {
    return http.get('/users', { params })
  },
  create: (data) => {
    return http.post('/users', data)
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

export default usersAPI
