export function render(card, isFaved) {
    // Разделяем число на разряды 
    const priceTotal = (card.price_total + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const priceSqM = (card.price_sq_m + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');



    const markup = `
                <div id="card-container" class="container p-0 pt-5">
                    <div class="heading-1">
                        ${card.title}, ${card.square} м2 за ${priceTotal} ₽
                    </div>
                    <div class="object">
                        <div class="object__photo">
                            <div class="object__photo-wrapper">
                                <img src="${card.image}" alt="" />
                            </div>
                        </div>
                        <!-- // object__photo -->

                        <!-- object__desc -->
                        <div class="object__desc">
                            <div class="object__desc-sector">
                                ЖК ${card.complex_name}
                            </div>

                            <div class="object__desc-name">
                                <div class="object__desc-title">
                                    ${card.title}
                                </div>
                                <div class="object__desc-art">${card.scu}</div>

                                <!-- Добавить в избранное -->
                                <button id="addTofavourite"
                                class="
                                button-favourite 
                                ${isFaved ? 'button-favourite--active' : ''}
                                ">
                                    <i class="fas fa-heart"></i>
                                    <span>${isFaved ? 'В избранном' : 'В избранное'}</span>
                                </button>


                            </div>

                            <div class="object__desc-details">
                                <!-- params -->
                                <div class="params">
                                    <div class="params__item">
                                        <div class="params__definition">Корпус</div>
                                        <div class="params__value">${card.building}</div>
                                    </div>
                                    <div class="params__item">
                                        <div class="params__definition">Этаж</div>
                                        <div class="params__value">${card.floor}</div>
                                    </div>
                                    <div class="params__item">
                                        <div class="params__definition">Номер</div>
                                        <div class="params__value">${card.flat_number}</div>
                                    </div>
                                    <div class="params__item">
                                        <div class="params__definition">Комнат</div>
                                        <div class="params__value">${card.rooms}</div>
                                    </div>
                                </div>
                                <!-- // params -->
                            </div>

                            <div class="details">
                                <div class="details__row">
                                    <div class="details__name">Стоимость</div>
                                    <div class="details__value details__value--price">
                                        ${priceTotal} ₽
                                    </div>
                                </div>
                                <div class="details__row">
                                    <div class="details__name">Цена за м2</div>
                                    <div class="details__value">${priceSqM} ₽/м2</div>
                                </div>
                                <div class="details__row">
                                    <div class="details__name">Площадь</div>
                                    <div class="details__value">${card.square} м2</div>
                                </div>
                            </div>

                            <button id="button-order" class="button-order">Забронировать</button>
                            <!-- <button class="button-preview">Записаться на просмотр</button> -->
                        </div>
                    </div>
                    <div class="container">
                        <a href="/" class="back-to-results">← Вернуться к результатам поиска</a>
                    </div>
                </div>`

    const markupModal = `
            <div class="modal-wrapper none">
                <div class="modal">
                    <div class="modal__header">
                        <div class="modal__title">
                            Заявка на бронирование
                        </div>
                        <div class="modal__details">
                            Квартира <span>96</span> в Первом квартале Дом 5
                            <div class="modal__details-art">ГЕН-112-42</div>
                        </div>
                    </div>

                    <form class="modal__form">
                        <div class="modal__form-content">
                            <!-- formgroup -->
                            <div class="formgroup">
                                <label
                                    class="modal__form-input-label"
                                    for="form-phone"
                                >
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    id="form-name"
                                    class="modal__form-input"
                                    placeholder="Введите имя"
                                />
                            </div>
                            <!-- // formgroup -->
                            <!-- formgroup -->
                            <div class="formgroup">
                                <label
                                    class="modal__form-input-label"
                                    for="form-phone"
                                >
                                    Телефон
                                </label>
                                <input
                                    type="text"
                                    id="form-phone"
                                    class="modal__form-input"
                                    placeholder="+7 (XXX) XXX-XX-XX"
                                />
                            </div>
                            <!-- // formgroup -->

                            <div class="formgroup formgroup--checkbox">
                                <input type="checkbox" id="policy" checked />
                                <label class="policy-text" for="policy"
                                    >Я согласен на обработку моих персональных
                                    данных. С Политикой в отношении обработки
                                    персональных данных ознакомлен и
                                    согласен.</label
                                >
                            </div>
                        </div>
                        <input
                            class="modal__submit"
                            type="submit"
                            value="Отправить заявку"
                        />
                    </form>
                    <button class="modal__close">
                        Закрыть
                    </button>
                </div>
            </div>`

    document.getElementById('app').insertAdjacentHTML('beforeend', markup)
    document.getElementById('app').insertAdjacentHTML('beforeend', markupModal)
}

export function showModal() {
    document.querySelector('.modal-wrapper').classList.remove('none')
}

export function hideModal() {
    document.querySelector('.modal-wrapper').classList.add('none')
}

export function getInput() {
    const formData = {}
    formData.name = document.getElementById('form-name').value
    formData.phone = document.getElementById('form-phone').value
    return formData
}

export function clearInput() {
    document.getElementById('form-name').value = ''
    document.getElementById('form-phone').value = ''
}

export function toggleFavouriteBth(isFaved) {
    const button = document.getElementById('addTofavourite')
    if(isFaved) {
        button.classList.add('button-favourite--active')
        button.querySelector('span').textContent = 'В избранном'
    } else {
        button.classList.remove('button-favourite--active')
        button.querySelector('span').textContent = 'В избранное'
    }
}