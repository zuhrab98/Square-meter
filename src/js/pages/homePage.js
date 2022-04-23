import filter from './../filter/filterController'
import listing from './../listing/listingController'

// Это наша главная страница куда мы рендерим шаблон
export default async function (state) {
    document.querySelector('#app').innerHTML = ''
    
    await filter(state)
    listing(state)
}