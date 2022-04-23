import 'url-search-params-polyfill'

const elements = {
    filterSelect: document.getElementsByClassName('filter__dropdown'),
    filterRooms: document.getElementsByClassName('rooms__checkbox'),
    filterInputs: document.getElementsByClassName('range__input'),
    filterВtn: document.getElementsByClassName('filter__show'),
}

export function render(params) {

    let options = ''
    // Районы
    params.complexNames.forEach(name => {
        options += `<option value="${name}">ЖК ${name}</option>`
    });

    let rooms = ''
    // Комнаты
    params.roomValues.forEach(room => {
        rooms += `<input name="rooms" type="checkbox" id="rooms_${room}" class="rooms__checkbox" value="${room}">
        <label for="rooms_${room}" class="rooms__btn">${room}</label>`
    })

    const markup = `<!-- Filter -->
            <form method="GET" id="filter-form" class="container p-0">
                <div class="heading-1">Выбор квартир:</div>
                <div class="filter">
                    <div class="filter__col">
                        <div class="filter__label">Выбор проекта:</div>
                        <select name="complex" id="" class="filter__dropdown">
                            <option value="all">Все проекты</option>
                            ${options}
                        </select>
                    </div>
                    <div class="filter__col rooms">
                        <div class="filter__label">Комнат:</div>
                        <div class="rooms__wrapper">
                            ${rooms}
                        </div>
                    </div>
                    <div class="filter__col">
                        <div class="filter__label">Площадь:</div>
                        <div class="range__wrapper">
                            <label class="range">
                                <div for="" class="range__label">от</div>
                                <input
                                    name="sqmin"
                                    min="0"
                                    type="number"
                                    class="range__input"
                                    placeholder="${params.squareMin}"
                                    value ="${params.squareMin}"
                                />
                                <div class="range__value">м2</div>
                            </label>
                            <label class="range">
                                <div for="" class="range__label">до</div>
                                <input
                                    name="sqmax"
                                    min="0"
                                    type="number"
                                    class="range__input"
                                    placeholder="${params.squareMax}"
                                    value ="${params.squareMax}"
                                />
                                <div class="range__value">м2</div>
                            </label>
                        </div>
                    </div>
                    <div class="filter__col">
                        <div class="filter__label">Стоимость:</div>
                        <div class="range__wrapper">
                            <div class="range">
                                <label for="" class="range__label">от</label>
                                <input
                                    type="number"
                                    name="pricemin"
                                    min="0"
                                    class="range__input range__input--price"
                                    placeholder="${params.priceMin}"
                                    value ="${params.priceMin}"
                                />
                                <div class="range__value">₽</div>
                            </div>
                            <div class="range">
                                <label for="" class="range__label">до</label>
                                <input
                                    type="number"
                                    name="pricemax"
                                    min="0"
                                    class="range__input range__input--price"
                                    placeholder="${params.priceMax}"
                                    value ="${params.priceMax}"
                                />
                                <div class="range__value">₽</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filter__buttons">
                    <button class="filter__show">Показать объектов</button>
                    <button class="filter__reset" type="reset">Сбросить фильтр</button>
                </div>
            </form>
            <!-- // Filter -->`

    document.getElementById('app').insertAdjacentHTML('afterbegin', markup)
}

// Обновляем счетчик на кнопке
export function changeButtonText(value) {
    const btn = elements.filterВtn[0]
    btn.innerHTML = value > 0 ? `Показать ${value} объектов` : `Объекты не найдены. Измените условие поиска`

    // Дисейблим кнопки при пустом ресультате
    btn.disabled = value === 0 ? true : false

}

// Формируем GET строку из полученных данных с фильтра
export function getInput() {
    const searchParams = new URLSearchParams()

    // 1. Значение с select
    if (elements.filterSelect[0] !== 'all') {
        searchParams.append(elements.filterSelect[0].name, elements.filterSelect[0].value) // Лесной
    }

    // 2. Параметры комнат - чекбокса
    const roomsValue = []
    Array.from(elements.filterRooms).forEach(item => {
        if (item.value !== '' && item.checked) {
            roomsValue.push(item.value)
        }
    })
    let roomsValuesString = roomsValue.join(',') // 1,2,3

    if (roomsValuesString !== '') {
        searchParams.append('rooms', roomsValuesString)
    }

    // 3. Значенния площадь и цена - input
    Array.from(elements.filterInputs).forEach(input => {
        if (input.value !== '') {
            searchParams.append(input.name, input.value)
        }
    })

    const queryString = searchParams.toString()

    if (queryString) {
        return '?' + queryString
    } else {
        return ''
    }

}