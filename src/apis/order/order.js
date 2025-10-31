

import http from '../http'

const orderAPI = {
  getAll: (params = null) => {
    return http.get('/orders', { params })
  },
  create: (data) => {
    return http.post('/orders', data)
  },
  update: (id, data) => {
    return http.patch(`/orders/${id}`, data)
  },
  delete: (id) => {
    return http.delete(`/orders/${id}`)
  },
  getById: (id) => {
    return http.get(`/orders/${id}`)
  },
}

export default orderAPI
