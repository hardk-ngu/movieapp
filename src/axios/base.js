import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://m.maizuo.com',
  headers: {
    'X-Client-Info':
      '{"a":"3000","ch":"1002","v":"5.2.0","e":"1651559442829173501263873","bc":"440100"}',
    'X-Host': 'mall.film-ticket.film.list'
  },
  timeout: 5000
})
instance.interceptors.request.use((req) => {
  return req
})
instance.interceptors.response.use((res) => {
  if (res.config.headers['X-Host'] == 'mall.user.sms-code-login') {
    return res.data
  } else {
    return res.data.data
  }
})
export default instance
