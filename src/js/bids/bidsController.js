import Bids from './bidsModel';
import * as view from './bidsView'

export default async function (state) {

    // Создаем объект модели для работы с заявками
    if (!state.bids) state.bids = new Bids()

    // Получаем заявки с сервера
    await state.bids.getBids()

    // Рендерим заявки на страницу
    view.renderBids(state.bids.bids)
}