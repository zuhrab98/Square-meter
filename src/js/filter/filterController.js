import Filter from "./filterModel"
import * as view from "./filterView"

export default async function (state) {

    // Создаем объект фильтра
    if (!state.filter) state.filter = new Filter()

    // Получение параметров для фильтра
    await state.filter.getParams()

    // Делаем запрос на сервер
    await state.filter.getResults()
    state.results = state.filter.result

    // Отрисовка значений в фильтре
    view.render(state.filter.params)

    // Обновляем счетчик на кнопке
    view.changeButtonText(state.filter.result.length)

    // Прослушка событий формы
    const form = document.getElementById('filter-form')

    // Изминение формы
    form.addEventListener('change', async (e) => {
        e.preventDefault();
        state.filter.query = view.getInput()
        await state.filter.getResults()

        // Записали в state.results[] наши полученные данные с запроса 
        state.results = state.filter.result

        // Обновляем счетчик на кнопке
        view.changeButtonText(state.filter.result.length)
    })

    // Сброс формы
    form.addEventListener('reset', async () => {
        // 1.1 Очистили запросс 
        state.filter.query = ''
        // 1.2 Получили русультаты
        await state.filter.getResults()

        // Записали в state.results[] наши полученные данные с запроса 
        state.results = state.filter.result

        view.changeButtonText(state.filter.result.length)
    })

    // Отправка формы
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('Submit!!');
        state.emitter.emit('event: render-listing', {})
    })

}