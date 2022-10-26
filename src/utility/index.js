function formatTime(second) {
  const weekday = ['日', '一', '二', '三', '四', '五', '六']
  const normalDate = new Date(second * 1000) //这里记得要注意给的数据是秒还是毫秒
  const month = normalDate.getMonth() + 1
  const date = normalDate.getDate()
  const day = normalDate.getDay()
  return `${month}月${date}日 周${weekday[day]}`
}
function formatPrice(price) {
  const priceStr = price.toString()
  let start = '',
    end = ''
  end = priceStr.slice(-2) //永远截取后两位
  start = priceStr.substring(0, priceStr.length - end.length)
  if (end === '00') {
    return `${start}`
  } else {
    return `${start}.${end}`
  }
}
function throttle(fn, delay, isBind) {
  let timer = null

  function realHandler(event) {
    if (!timer) {
      timer = setTimeout(() => {
        fn(event)
        timer = null
      }, delay)
    }
  }
  if (!throttle.handlerArr) {
    throttle.handlerArr = []
  }
  if (isBind) {
    throttle.handlerArr.push(realHandler)
    return realHandler
  } else {
    return throttle.handlerArr.shift()
  }
}
export { formatTime, formatPrice, throttle }
