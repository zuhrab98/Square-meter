export function render() {
    const markup = ` <div class="cards-wrapper">
                        <div class="container p-0 pt-5">
                            <div id="listing-container" class="row">
                            </div>
                        </div>
                    </div>`

    document.getElementById('app').insertAdjacentHTML('beforeend', markup)
}

export function renderCard(card, isFaved) {
    const listingContainer = document.getElementById('listing-container')

    // Разделяем число на разряды 
    const priceTotal = (card.price_total + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const priceSqM = (card.price_sq_m + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    const markup = `<article class="col-md-4">
                        <a href="#/item/${card.id}" data-id="${card.id}" class="card">
                            <div class="card__header">
                                <div class="card__title">
                                    ЖК ${card.complex_name}
                                </div>
                                <div class="card__like ${isFaved ? 'card__like--active' : ''}">
                                    <i class="fas fa-heart"></i>
                                </div>
                            </div>
                            <div class="card__img">
                                <img src="${card.image}" alt="План квартиры" />
                            </div>
                            <div class="card__desc">
                                <div class="card__price">
                                    <div class="card__price-total">
                                        ${priceTotal} ₽
                                    </div>
                                    <div class="card__price-per-meter">
                                        ${priceSqM} ₽/м2
                                    </div>
                                </div>

                                <!-- card__params params -->
                                <div class="card__params params">
                                    <div class="params__item">
                                        <div class="params__definition">
                                            Комнат
                                        </div>
                                        <div class="params__value">${card.rooms}</div>
                                    </div>
                                    <div class="params__item">
                                        <div class="params__definition">
                                            Площадь
                                        </div>
                                        <div class="params__value">${card.square}</div>
                                    </div>
                                </div>
                                <!-- //card__params params -->
                            </div>
                            <div class="card__footer">
                                <div class="card__art">${card.scu}ГЕН-112-42</div>
                                <div class="card__floor">Этаж ${card.floor} из 12</div>
                            </div>
                        </a>
                    </article>`

    listingContainer.insertAdjacentHTML('beforeend', markup)
}

export function clearListingContainer() {
    document.getElementById('listing-container').innerHTML = ''
}


export function toggleFavourite(elem, isFav) {
    if (isFav) {
        elem.classList.add('card__like--active')
    } else {
        elem.classList.remove('card__like--active')
    }

}