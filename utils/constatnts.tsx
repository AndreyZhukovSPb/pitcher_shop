// const baseURL = 'http://localhost:4003/api/'
// const baseURL = 'https://pitcherbartest.ru/api/'
const baseURL = 'http://84.201.136.165/api'
const mainWebUrl = 'https://pitcherbar.ru'

const freeDeliveryAmount = 2400

const millingTableNew = [
  'в зернах (не молоть)',
  'для кофемашины',
  'для воронки',
  'для аэропресса',
  'для френчпресса',
  'для капельной кофеварки',
  'для турки',
  'для гейзера'
]

const regOrderError = [
  'При регистрации заказа возникла ошибка',
  'Пожалуйста, попробуйте еще раз'
]

const paymentFailed = [
  'Ваш заказ не оплачен', 
  'Пожалуйста, попробуйте еще раз'
]

const paymentCheckError = [
  'При обработке заказа произошла ошибка', 
  'Пожалуйста, свяжитесь с нами по телефону +7-981-039-79-12 или по электронной почте anna@pitcherbar.ru',
]

// const dataBaseError = [
//   'Заказ успешно оплачен.', 
//   'Мы скоро свяжемся с вами.'
// ]

const paymentChecking = [
  'Проверяем ваш платеж', 
  'Пожалуйста, не покидайте страницу', 
]

const mapSrc = "https://yandex.ru/map-widget/v1/?scroll=false&um=constructor%3A37a493ba0d534859391bcced906d752064b18c0040fab40833b83ba8019fb9bf&amp;source=constructor" 

const jokeForDasha = 'https://ya.ru/search/?text=%D1%87%D1%82%D0%BE+%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C+%D0%B5%D1%81%D0%BB%D0%B8+%D1%8F+%D1%81%D0%BB%D0%BE%D0%BC%D0%B0%D0%BB%D0%B0+%D1%81%D0%B0%D0%B9%D1%82&lr=10435&search_source=yaru_desktop_common&search_domain=yaru'

// src="https://yandex.ru/map-widget/v1/?scroll=false&um=constructor%3A27a9f717a2a1ccaa0396594d6444c4aab423f2081492148a7a675b24ca5b121a&amp;source=constructor
export {
  baseURL,
  mainWebUrl,
  millingTableNew,
  mapSrc,
  regOrderError,
  paymentFailed,
  paymentCheckError,
  paymentChecking,
  jokeForDasha,
  freeDeliveryAmount,
  // dataBaseError
}
