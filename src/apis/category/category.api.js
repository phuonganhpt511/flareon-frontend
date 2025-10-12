import http from '../http'

const categoryAPI = {
  getAll: (params = null) => {
    return http.get('/category', { params })
  },
  create: (data) => {
    return http.post('/category', data)
  },
  update: (id, data) => {
    return http.patch(`/category/${id}`, data)
  },
  delete: (id) => {
    return http.delete(`/category/${id}`)
  },
  getById: (id) => {
    return http.get(`/category/${id}`)
  },
}

export default categoryAPI
