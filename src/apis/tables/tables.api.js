import http from '../http'

const tablesAPI = {
  getAll: (params = null) => {
    return http.get('/tables', { params })
  },
  create: (data) => {
    return http.post('/tables', data)
  },
  update: (id, data) => {
    return http.patch(`/tables/${id}/status`, data)
  },
  delete: (id) => {
    return http.delete(`/tables/${id}`)
  },
  getById: (id) => {
    return http.get(`/tables/${id}`)
  },
}

export default tablesAPI
