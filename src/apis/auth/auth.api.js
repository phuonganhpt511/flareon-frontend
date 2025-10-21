import http from '../http'

const authAPI = {
  login: (data) => {
    return http.post('/auth/login', data)
  },
  register: (data) => {
    return http.post('/auth/register', data)
  },
}

export default authAPI
