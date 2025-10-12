import http from '../http'

const ordersAPI = {
  getAll: (params = null) => {
    return http.get('/orders', { params })
  },
  create: (data) => {
    return http.post('/orders', data)
  },
  getOrderByTable: (tableId) => {
    return http.get(`/orders/${tableId}`)
  },
  update: (id, data) => {
    return http.patch(`/orders/${id}`, data)
  },
  updateStatus: (id, data) => {
    return http.patch(`/orders/${id}/status`, data)
  },
}

export default ordersAPI
