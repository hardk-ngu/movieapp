// get data in cinema detail
import {
  getCinemaSchedule,
  getFilmsInTheCinema,
  getCinemaDetail
} from '@/axios/api.js'
import { reactive, watchEffect, ref } from 'vue'
const detail = reactive({})
const schedules = reactive({})
const films = reactive([])
let timeObj = {
  year: null,
  month: null,
  date: null
}
let cinemaId = ref(null)

function getCinemaId(id) {
  cinemaId.value = id
}

watchEffect(() => {
  if (cinemaId.value) {
    _getCinemaDetail()
    _getFilmsInTheCinema()
  }
})
setTime()
getLastDate()

//获取当前的时间数据作为参考
function setTime() {
  let now = new Date()
  timeObj.year = now.getFullYear()
  timeObj.month = now.getMonth() + 1
  timeObj.date = now.getDate()
  timeObj.timestamp = now.getTime()
}

function getLastDate(newMonth) {
  const date_ = new Date()
  const month = date_.getMonth() + 1
  date_.setMonth(newMonth || month)
  date_.setDate(0)
  timeObj.lastDate = date_.getDate()
}
// 这个函数的作用是获取例如5.26/27/28/29的时间戳，因为请求数据的时候需要带上那天的时间戳
function getTimeStamp() {
  const date_ = new Date()
  date_.setMonth(timeObj.month - 1)
  date_.setDate(timeObj.date)
  const timestamp = date_.getTime()
  return timestamp
}

function formatTime(timestamp) {
  const dateStamp = 60 * 60 * 24 * 1000 //记住是毫秒不是秒
  const now = new Date().getTime()
  let str = ''
  let chineseDay = ['日', '一', '二', '三', '四', '五', '六']
  const md = `${timeObj.month}月${timeObj.date}日`
  if (timestamp - now <= dateStamp) {
    str = `今天${md}`
  }
  if (timestamp - now >= dateStamp) {
    str = `明天${md}`
  }
  if (timestamp - now >= dateStamp * 2) {
    str = `后天${md}`
  }
  if (timestamp - now >= dateStamp * 3) {
    const day = new Date(timestamp).getDay()
    str = `周${chineseDay[day]}${md}`
  }
  return str
}

async function _getCinemaDetail() {
  const data = await getCinemaDetail({
    url: '/gateway',
    cinemaId: cinemaId.value,
    k: 3931720
  })
  Object.assign(detail, data.cinema)
}

async function _getFilmsInTheCinema() {
  const data = await getFilmsInTheCinema({
    url: '/gateway',
    cinemaId: cinemaId.value,
    k: 8437150
  })
  films.push(...data.films)
  _getCinemaSchedule(films[0].filmId)
}

async function _getCinemaSchedule(filmId) {
  const timestamp = new Date(
    `${timeObj.year}/${timeObj.month}/${timeObj.date}`
  ).getTime()

  const data = await getCinemaSchedule({
    url: '/gateway',
    filmId,
    cinemaId: cinemaId.value,
    date: (timestamp / 1000).toFixed(),
    k: 7955761
  })
  if (data) {
    const key = formatTime(getTimeStamp())
    if (!schedules[filmId]) {
      schedules[filmId] = {}
    }
    if (!schedules[filmId][key]) {
      schedules[filmId][key] = {}
      schedules[filmId][key].data = []
    }
    schedules[filmId][key].data.push(...data.schedules)
  }
  // 检测获取的数据的是否已经超过本月或者本年了
  if (timeObj.date === timeObj.lastDate) {
    timeObj.month += 1
    timeObj.date = 0
    getLastDate(timeObj.month)
  }
  if (timeObj.month > 11) {
    timeObj.year += 1
    timeObj.month = 1
    getLastDate(timeObj.month)
  }

  const keyLength = Object.keys(schedules[filmId]).length
  if (keyLength < 4) {
    timeObj.date += 1
    _getCinemaSchedule(filmId)
  }
}
function resetTime() {
  setTime()
}

export {
  detail,
  films,
  schedules,
  getCinemaId,
  _getCinemaSchedule,
  resetTime
}
