import {
  Button,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  List,
  Cell,
  Card,
  Loading,
  Sticky,
  Image,
  Lazyload,
  DropdownMenu,
  DropdownItem,
  NavBar,
  IndexBar,
  IndexAnchor,
  Field,
  Search,
  Popup,
  Form,
  CellGroup,
  CountDown
} from 'vant'
const vantItem = {
  Button,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Icon,
  Tabs,
  Tab,
  List,
  Cell,
  Card,
  Loading,
  Sticky,
  Image,
  Lazyload,
  DropdownMenu,
  DropdownItem,
  NavBar,
  IndexBar,
  IndexAnchor,
  Field,
  Search,
  Popup,
  Form,
  CellGroup,
  CountDown
}
export default {
  install(app, options) {
    for (let item in vantItem) {
      app.use(vantItem[item])
    }
  }
}
