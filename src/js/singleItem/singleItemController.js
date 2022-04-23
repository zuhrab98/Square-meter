import SingleItem from "./singleItemModel"
import * as view from './singleItemView'

export default async function (state) {
    // Создаем новый объект singleItem
    state.singleItem = new SingleItem(state.routeParams)

    // Записали полученные данные карточки с сервера в свойство result
    await state.singleItem.getItem()

    // Отрисовываем разметку для отдельного объекта
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id))

    // ========= Запустить прослушку событий =========

    // Открытие модального окна
    document.getElementById('button-order').addEventListener('click', view.showModal)

    // Закрытие модального окна - клик по кнопке
    document.querySelector('.modal__close').addEventListener('click', (e) => {
        view.hideModal()
    })

    // Закрытие модального окна - клик по оверлей
    document.querySelector('.modal-wrapper').addEventListener('click', (e) => {
        if (!e.target.closest('.modal')) {
            view.hideModal()
        }
    })

    // Отправка формы
    document.querySelector('.modal__form').addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = view.getInput()
        await state.singleItem.submitForm(formData);
        state.formDate = formData

        if (state.singleItem.response.message === 'Bid Created') {
            alert('Ваша заявка успешно отправлена')
            view.hideModal()
            view.clearInput()
        } else if (state.singleItem.response.message === 'Bid Not Created') {
            state.singleItem.response.errors.forEach(item => {
                alert(item)
            });
        }
        console.log(formData);

    })

    // Клик по кнопке 'Добавить избранное' & 'Удалить избранное'
    document.getElementById('addTofavourite').addEventListener('click', () => {
        state.favourites.toggleFav(state.singleItem.id)
        view.toggleFavouriteBth(state.favourites.isFav(state.singleItem.id))
    })

}

