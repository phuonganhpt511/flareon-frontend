import http from '../http'

const dishesAPI = {
  getAll: (params = null) => {
    return http.get('/dishes', { params })
  },
  create: (data) => {
    return http.post('/dishes', data)
  },
  update: (id, data) => {
    return http.patch(`/dishes/${id}`, data)
  },
  delete: (id) => {
    return http.delete(`/dishes/${id}`)
  },
  getById: (id) => {
    return http.get(`/dishes/${id}`)
  },
}

export default dishesAPI
