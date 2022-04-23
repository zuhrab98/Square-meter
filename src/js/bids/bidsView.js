function renderContainer() {
    const markup = `
                <div class="container p-0 mb-5">
                    <div class="heading-1">Заявки</div>
                </div>
                <div class="panels-wrapper">
                    <div class="container p-0"> 
                    </div>
                </div>`

    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup)
}

export function renderBid(bid) {
    const markeup = `<div class="panel panel--no-hover">
                        <div class="panel__bidid">${bid.id}</div>
                        <div class="panel__bidname">${bid.name}</div>
                        <div class="panel__bidphone">${bid.phone}</div>
                    </div>`
    document.querySelector('.panels-wrapper .container').insertAdjacentHTML('beforeend', markeup)
}

export function renderBids(bids) {
    renderContainer()

    bids.forEach(bid => {
        renderBid(bid)
    });
}