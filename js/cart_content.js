'use strict'

const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = cart.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
const orderModalOpenProd = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');
let price = 0;
let productArray = [];

    const randomId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const priceWithoutSpaces = (str) => {
        return str.replace(/\s/g, '');
    };

    const normalPrice = (str) => {
        return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };


    const plusFullPrice = (currentPrice, counter) => {
        return price += currentPrice * parseInt(counter);
    };


    const minusFullPrice = (currentPrice, counter) => {
        return price -= currentPrice * parseInt(counter);
    };


    const printQuantity = () => {
        let productsListLength = cartProductsList.querySelector('.simplebar-content').children.length;
        cartQuantity.textContent = productsListLength;
        productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
    };

    const printFullPrice = () => {
        fullPrice.textContent = `${normalPrice(price)}`;
    };

    const generateCartProduct = (img, title, price, id, counter) => {
        return `
		<li class="cart-content__item">
			<article class="cart-content__product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="cart-product__img">
				<div class="cart-product__text">
					<h3 class="cart-product__title">${title}</h3>
					<div class="details-wrapper">
                            <div class="items counter-wrapper">
                                <div class="items__control" data-action="minus">-</div>
                                <div class="items__current data-counter" data-counter>${counter}</div>
                                <div class="items__control" data-action="plus">+</div>
                            </div>
                        </div>
					<span class="cart-product__price">${normalPrice(price)}</span>
				</div>
				<button class="cart-product__delete" aria-label="Удалить товар"></button>
			</article>
		</li>
	`;
    };


    const deleteProducts = (productParent) => {
        let id = productParent.querySelector('.cart-product').dataset.id;
        document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
        const counter = productParent.querySelector('[data-counter]').innerText;
        let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
        minusFullPrice(currentPrice, counter);
        printFullPrice();
        productParent.remove();

        printQuantity();
    };



    productsBtn.forEach(el => {
        el.closest('.product').setAttribute('data-id', randomId());

        el.addEventListener('click', (e) => {
            let self = e.currentTarget;
            let parent = self.closest('.product');
            let id = parent.dataset.id;
            let img = parent.querySelector('.image-switch__img img').getAttribute('src');
            let title = parent.querySelector('.product__title').textContent;
            let counter = parent.querySelector('[data-counter]').innerText;
            let priceString = priceWithoutSpaces(parent.querySelector('.product-price__current').textContent);
            let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent));
            plusFullPrice(priceNumber, counter);
            printFullPrice();

            const itemInCart = cartProductsList.querySelector(`[data-id="${id}"]`);
            if (itemInCart) {
                const counterEl = itemInCart.querySelector('[data-counter]');
                counterEl.innerText = parseInt(counterEl.textContent) + parseInt(counter);
            } else {
                cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id, counter));
                printQuantity();
            }


        });
    });

    cartProductsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-product__delete')) {
            deleteProducts(e.target.closest('.cart-content__item'));
        }
    });

    cart.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-content__btn')) {
            openModal();
        }
    });

let flag = 0;
orderModalOpenProd.addEventListener('click', (e) => {
    if (flag === 0) {
        orderModalOpenProd.classList.add('open');
        orderModalList.style.display = 'block';
        flag = 1;
    } else {
        orderModalOpenProd.classList.remove('open');
        orderModalList.style.display = 'none';
        flag = 0;
    }
});

const generateModalProduct = (img, title, price, id, counter) => {
    return `
		<li class="order-modal__item">
			<article class="order-modal__product order-product" data-id="${id}">
				<img src="${img}" alt="" class="order-product__img">
				<div class="order-product__text">
					<h3 class="order-product__title">${title}</h3>
				
					<span class="order-product__price">${normalPrice(price)}</span>
				</div>
				<button class="order-product__delete">Видалити</button>
			</article>
		</li>
	`;
};

const openModal = () => {
    let array = cartProductsList.querySelector('.simplebar-content').children;
    let fullprice = fullPrice.textContent;
    let length = array.length;

    document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
    document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
    for (let item of array) {
        let img = item.querySelector('.cart-product__img').getAttribute('src');
        let title = item.querySelector('.cart-product__title').textContent;
        let counter = item.querySelector('[data-counter]').innerText;
        let priceString = priceWithoutSpaces(item.querySelector('.cart-product__price').textContent);
        let id = item.querySelector('.cart-product').dataset.id;

        orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id, counter));

        let obj = {};
        obj.title = title;
        obj.price = priceString;
        obj.counter = counter;
        productArray.push(obj);
    }

}
console.log(productArray)

document.querySelector('.order').addEventListener('submit', (e) => {
    e.preventDefault();
    let self = e.currentTarget;

    let formData = new FormData(self);
    let name = self.querySelector('[name="Имя"]').value;
    let tel = self.querySelector('[name="Телефон"]').value;
    let mail = self.querySelector('[name="Email"]').value;
    let city = self.querySelector('[name="city"]').value;
    let post_number = self.querySelector('[name="post_number"]').value;
    formData.append('Товары', JSON.stringify(productArray));
    formData.append('Имя', name);
    formData.append('Телефон', tel);
    formData.append('Email', mail);
    formData.append('Місто', city);
    formData.append('Відділення пошти', post_number);




    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert('Ваше замовлення надіслано!');
            }
        }
    }

    xhr.open('POST', 'mailer.php', true);
    xhr.send(formData);

    self.reset();
});


