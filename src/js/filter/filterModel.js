export default class Filter {
    constructor() {
        this.query = ''
    }

    // Отпровляет запрос на сервер и получает оттуда данные
    async getParams() {
        try {
            const queryString = 'http://jsproject.webcademy.ru/itemsinfo'
            const response = await fetch(queryString)
            const data = await response.json()
            this.params = await data
        } catch (error) {
            alert(error)
        }
    }

    // Все полученные объекты
    async getResults() {
        try {
            const queryString = `http://jsproject.webcademy.ru/items${this.query}`
            console.log("Filter => getResults => queryString", queryString)
            const response = await fetch(queryString)
            const data = await response.json()
            this.result = await data
        } catch (error) {
            alert(error)
        }
    }

}