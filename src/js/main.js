import homePage from './pages/homePage'
import singleItem from './pages/singleItemPage'
import favouritesPage from './pages/favouritesPage'
import bidsPage from './pages/bidsPage'
import errorComponent from './pages/errorPage'
import EventEmitter from './utils/EventEmitter'
import Favourites from './favourites/favouritesModel'

const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites()
}

// Тестирование, после удалить!
window.state = state

// Routes
const routes = [
    { path: '/', component: homePage },
    { path: 'item', component: singleItem },
    { path: 'favourites', component: favouritesPage },
    { path: 'bids', component: bidsPage },
]

function findComponentByPath(path, routes) {
    return routes.find(item => item.path === path)
}

function router() {
    // Разбиваем путь на массив
    const pathArray = location.hash.split('/')

    // устонавливаем текушший путь
    let correntPath = pathArray[0] === '' ? '/' : pathArray[1]
    correntPath = correntPath === '' ? '/' : correntPath // item // bids

    // Save router params
    state.routeParams = pathArray[2] ? pathArray[2] : ''

    // Выбираем component для указанного адресса, либо component с ошибкой
    const { component = errorComponent } = findComponentByPath(correntPath, routes) || {}
    component(state)
}

// Когда у всей страницы поменялся хеш, запускаем fun 
window.addEventListener('hashchange', router)
// Когда страница загружается
window.addEventListener('load', router)