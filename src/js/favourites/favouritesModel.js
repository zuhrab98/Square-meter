export default class Favourites {

    constructor() {
        this.favs = []
        // Работа с localstorage - Получаем элементы из LS
        this.readStorage()
    }

    addFav(id) {
        this.favs.push(id)
        // Сохранение в LS
        this.saveData()
    }

    removeFav(id) {
        const index = this.favs.indexOf(id)
        this.favs.splice(index, 1)
        // Сохранение в LS
        this.saveData()
    }

    isFav(id) {
        return this.favs.indexOf(id) !== -1 ? true : false
    }

    toggleFav(id) {
        // если этот элемент есть в массиве, Удаляем | Элемента нет в массиве, Добовляем
        this.isFav(id) ? this.removeFav(id) : this.addFav(id)
    }

    saveData() {
        localStorage.setItem('favs', JSON.stringify(this.favs))
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('favs'))
        if (storage) this.favs = storage
    }

}