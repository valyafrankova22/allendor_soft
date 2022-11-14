/*
'use strict'

function calcCartPrice() {
    const cartWrapper = document.querySelector('.cart-content__list');
    const priceElements = cartWrapper.querySelectorAll('.cart-product__price');
    const totalPriceEl = document.querySelector('.fullprice');

// Общая стоимость товаров
    let priceTotal = 0;

    // Обходим все блоки с ценами в корзине
    priceElements.forEach(function (item) {
        // Находим количество товара
        const amountEl = item.closest('.cart-content__item').querySelector('[data-counter]');
        // Добавляем стоимость товара в общую стоимость (кол-во * цену)
        priceTotal += parseInt(item.textContent) * parseInt(amountEl.textContent);
    });

    // Отображаем цену на странице
    totalPriceEl.innerText = priceTotal;

}*/
