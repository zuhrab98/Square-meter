import singleItem from "../singleItem/singleItemController"

export default function (state) {
    // Очищаем контейнер прилодения
    document.querySelector('#app').innerHTML = ''

    singleItem(state)
}