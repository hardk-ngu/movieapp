import { getCities } from '@/axios/api.js'
import { reactive } from 'vue'
const city = reactive({
  data: []
})
const firstWords = reactive({
  data: []
})
const letterTable = reactive({
  data: {}
})
const hotCity = reactive({
  data: []
})
async function _getCities() {
  const { cities } = await getCities({
    url: '/gateway',
    XHost: 'mall.film-ticket.city.list'
  })
  city.data = cities
  classifyAndGetHotCity()
}
function classifyAndGetHotCity() {
  let letterBook = {}
  let letter = null
  for (let i = 65; i < 91; i++) {
    letter = String.fromCharCode(i)
    letterBook[letter] = null
  }
  city.data.forEach((item) => {
    const letter = item.pinyin.charAt(0).toUpperCase()
    if (!letterBook[letter]) {
      letterBook[letter] = []
    }
    letterBook[letter].push(item)
    if (item.isHot) {
      hotCity.data.push(item)
    }
  })
  for (let key in letterBook) {
    if (!letterBook[key]) {
      delete letterBook[key]
    }
  }
  firstWords.data = Object.keys(letterBook)
  sliceLoad(letterBook)
}

function sliceLoad(data) {
  const loadTimes = 5
  const totalAmount = firstWords.data.length
  const singleAmount = Math.ceil(totalAmount / loadTimes)
  let count = 0,
    temp = {}
  handleSlice()
  function handleSlice() {
    if (count < totalAmount) {
      for (let key in data) {
        temp[key] = data[key]
        count += 1
        if (count === singleAmount) {
          Object.assign(letterTable.data, temp)
        }
        if (
          (count % singleAmount === 0 && count > singleAmount) ||
          count === totalAmount
        ) {
          setTimeout(() => {
            Object.assign(letterTable.data, temp)
          }, 1 / 60)
        }
      }
    }
  }
}
export { city, firstWords, letterTable, hotCity, _getCities }
