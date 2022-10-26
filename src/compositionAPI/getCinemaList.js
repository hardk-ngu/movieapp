import { getCinemaList } from '@/axios/api.js'
import { store } from '@/vuex/index.js'
import { reactive } from 'vue'
const cinemas = reactive({})
const districts = reactive({
  data: []
})
async function getCinemaList_({ cityId, ticketFlag }) {
  const { cinemas: cinemasData } = await getCinemaList({
    url: '/gateway',
    cityId,
    ticketFlag,
    XHost: 'mall.film-ticket.cinema.list'
  })
  // 如果不是同一个cityid那么就先初始化再赋值，如果是同一个cityid那么就直接赋值
  if (cityId != store.city.id) {
    for (let key in cinemas) {
      cinemas[key] = null
    }
    cinemas[ticketFlag] = cinemasData
  } else {
    cinemas[ticketFlag] = cinemasData
  }
  filterDistrict(ticketFlag)
}
function filterDistrict(ticketFlag) {
  let book = {}
  book[store.city.id] = '全城'
  cinemas[ticketFlag].forEach((item) => {
    const district = item.district
    if (!book[district.districtId]) {
      book[district.districtId] = district.name
    }
  })
  districts.data = book
}

export { cinemas, districts, getCinemaList_, filterDistrict }
