import http from '../http'

const tableAPI = {
  getAll: (params = null) => {
    return http.get('/tables', { params })
  },
  create: (data) => {
    return http.post('/tables', data)
  },
  update: (id, data) => {
    return http.patch(`/tables/${id}`, data)
  },
  updateStatus: (id, status) => {
    return http.patch(`/tables/${id}/status`, { status })
  },
  delete: (id) => {
    return http.delete(`/tables/${id}`)
  },
}

export default tableAPI
