export default class Bids {
    constructor() {

    }

    async getBids() {

        try {
            const queryString = 'http://jsproject.webcademy.ru/bids'
            const response = await fetch(queryString)
            const data = await response.json()
            this.bids = data
        } catch (error) {
            alert(error)
        }
    }

}