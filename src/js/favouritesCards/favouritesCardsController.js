import FavouriteCards from "./favouritesCardsModel"
import * as view from './../favouritesCards/favouritesCardsView'

export default async function (state) {

    // Получить список объектов которые находятся в избранном
    const favsList = state.favourites.favs

    // Получаем данные с сервера
    const favouriteCards = new FavouriteCards(favsList)
    await favouriteCards.getFavs()

    // Отображаем контейнер и карточки
    if (favouriteCards.favCards) {
        view.renderPage(favouriteCards.favCards)
    }

    // Запускаем прослушку клика на иконку "Добавить в избранное"
    addToFavsListener()

    // Добавить в избранное прослушиватель
    function addToFavsListener() {
        Array.from(document.getElementsByClassName('card__like')).forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Находим ID по которому кликнули
                const id = e.target.closest('.card').dataset['id']

                // Добовляем/Убираем элемент с избранного
                state.favourites.toggleFav(id)

                // Включаем/Выключаем иконку с избранным
                view.toggleFavourite(e.target.closest('.card__like'), state.favourites.isFav(id))
            })
        })
    }
    
}