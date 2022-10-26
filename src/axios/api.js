import axios from './base'
function getSwipe() {
  return axios({
    baseURL: 'http://localhost:3001',
    url: '/banner.json'
  })
}

function getfilmList({ url, pageNum, pageSize, cityId, type, k }) {
  return axios({
    url,
    params: {
      pageNum,
      pageSize,
      cityId,
      type,
      k
    }
  })
}
function getFilmDetail({ url, filmId, k, XHost }) {
  return axios({
    url,
    params: {
      filmId,
      k
    },
    headers: {
      'X-Host': XHost
    }
  })
}
function getCinemaList({ url, cityId, ticketFlag, XHost }) {
  return axios({
    url,
    params: {
      cityId,
      ticketFlag
    },
    headers: {
      'X-Host': XHost
    }
  })
}
function getCinemaDetail({ url, cinemaId }) {
  return axios({
    url,
    params: {
      cinemaId
    },
    headers: {
      'X-Host': 'mall.film-ticket.cinema.info'
    }
  })
}
function getFilmsInTheCinema({ url, cinemaId, k }) {
  return axios({
    url,
    params: {
      cinemaId,
      k
    },
    headers: {
      'X-Host': 'mall.film-ticket.film.cinema-show-film'
    }
  })
}
function getCinemaSchedule({ url, filmId, cinemaId, date, k }) {
  return axios({
    url,
    params: {
      filmId,
      cinemaId,
      date,
      k
    },
    headers: {
      'X-Host': 'mall.film-ticket.schedule.list'
    }
  })
}

function getCities({ url, XHost }) {
  return axios({
    url,
    headers: {
      'X-Host': XHost
    }
  })
}
function getLocation({ url, XHost }) {
  return axios({
    url,
    headers: {
      'X-Host': XHost
    }
  })
}
function getVerifyCode({
  url,
  mobile,
  type,
  imgKey = '',
  imgCode = ''
}) {
  return axios({
    method: 'post',
    url,
    data: {
      imgCode,
      imgKey,
      mobile,
      type
    },
    headers: {
      'X-Host': 'mall.user.sms-code.send'
    }
  })
}
function userLogin({
  url,
  mobile,
  smsCode,
  imgKey = '',
  imgCode = '',
  extra = {}
}) {
  return axios({
    method: 'post',
    url,
    data: {
      extra,
      imgCode,
      imgKey,
      mobile,
      smsCode
    },
    headers: {
      'X-Host': 'mall.user.sms-code-login'
    }
  })
}
export {
  getfilmList,
  getSwipe,
  getFilmDetail,
  getCinemaList,
  getCinemaDetail,
  getFilmsInTheCinema,
  getCinemaSchedule,
  getCities,
  getLocation,
  getVerifyCode,
  userLogin
}
