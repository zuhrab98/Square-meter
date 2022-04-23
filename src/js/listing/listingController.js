import * as view from "./listingView";

export default function (state) {

    // Рендерим контейнера карточки
    view.render()

    // Рендер карточек
    state.results.forEach(card => {
        view.renderCard(card, state.favourites.isFav(card.id))
    });

    // Запускаем прослушку клика на иконку "Добавить в избранное"
    addToFavsListener()

    // Подписка на событие
    state.emitter.subscribe('event: render-listing', () => {
        // Очистили контейнер с карточками 
        view.clearListingContainer()

        // Отрендерить карточки
        state.results.forEach(card => {
            view.renderCard(card, state.favourites.isFav(card.id))
        });

        // Запускаем прослушку клика на иконку "Добавить в избранное"
        addToFavsListener()
    })

    // Добавить в избранное прослушиватель
    function addToFavsListener() {
        document.querySelectorAll('.card__like').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()

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