export default class FavouriteCards {

    constructor(favsList) {
        this.favsList = favsList
    }

    async getFavs() {
        try {
            const ids = this.favsList.toString() // 1,2,3]
            const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`
            const response = await fetch(queryString)
            const data = await response.json()
            this.favCards = await data
        } catch (error) {
            console.log(error);
        }
    }

}