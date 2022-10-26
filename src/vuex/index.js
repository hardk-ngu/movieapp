import { reactive } from 'vue'
import { getCinemaList } from '@/axios/api.js'
const store = reactive({
  tabbarName: '',
  city: {},
  cinemas: {},
  films: {},
  userInfo: {
    name: null,
    avatar: null
  }
})
const mutations = {
  updateTabbarName(data) {
    store.tabbarName = data
  },
  updateCityInfo({ cityId, name }) {
    store.city.id = Number(cityId)
    store.city.name = name
  },
  updateCinemas({ ticketType, data }) {
    store.cinemas[ticketType] = data
  },
  updateFilms_(key, value) {
    if (!store.films[key]) {
      store.films[key] = []
    }
    store.films[key].push(...value)
  },
  initializeFilms(key) {
    if (!store.films[key]) {
      store.films[key] = {}
    }
  },
  updateFilms(key, value) {
    if (!store.films[key].data) {
      store.films[key].data = []
    }
    store.films[key].data.push(...value)
  },
  updateFilmListPageNum(key) {
    if (!store.films[key].pageNum) {
      store.films[key].pageNum = 0
    }
    store.films[key].pageNum += 1
  },
  resetFilms() {
    for (let key in store.films) {
      store.films[key].data = null
      store.films[key].pageNum = null
      store.films[key].total = null
    }
  },
  updateFilmTotal(key, value) {
    store.films[key].total = value
  },
  addFilm(key, data) {
    store.films[key].data.push(...data)
  },
  updateUserInfo(value) {
    store.userInfo.name = value
  }
}
const actions = {
  async getCinemaList_({ ticketFlag }) {
    const { cinemas } = await getCinemaList({
      url: '/gateway',
      cityId: store.city.id,
      ticketFlag,
      XHost: 'mall.film-ticket.cinema.list'
    })
    mutations.updateCinemas({
      ticketType: ticketFlag,
      data: cinemas
    })
  }
}
export { store, mutations, actions }
