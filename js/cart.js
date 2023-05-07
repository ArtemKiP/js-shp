import {changeUser,user} from "./user.js";

let cart = document.querySelector('.cart-');
let leftProducts2 = document.querySelector('.left__products2');
let leftTitles2 = document.querySelector('.left__titles2');


const getCartList = () => {
    cart.innerHTML = ''
    if (user.cart.length){
        // cartEmpty.style.display = 'none';
        user.cart.forEach((item) => {
            cart.innerHTML += `
            <tr class="cart_item">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove cart__right-delete" href="#">×</a>
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="single-product.html?product=${item.id}"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="${item.image}"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="single-product.html?product=${item.id}">${item.title}</a>
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">${item.price}$</span>
                                            </td>

                                            <td class="product-quantity">
                                                <div class="quantity buttons_added">
                                                 <button data-id="${item.id}" class="btn btn_disabled cart__center-btn cart__minus">-</button>
<!--                                                    <input type="button" class="minus cart__minus" value="-">-->
<!--                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1"> -->
                                                  <span class="input-text qty text">${item.count}</span>
<!--                                                    <input type="button" class="plus cart__plus" value="+">-->
                                                    <button data-id="${item.id}" class="btn cart__center-btn cart__plus">+</button>
                                                </div>
                                            </td>

                                            <td class="product-subtotal">
                                                <span class="amount">${item.price * item.count}$</span>
                                            </td>
                                        </tr>
            `
        });
        let allDeleteBtn = document.querySelectorAll('.cart__right-delete')
        let allMinusBtn = document.querySelectorAll('.cart__minus')
        let allPlusBtn = document.querySelectorAll('.cart__plus')

        Array.from(allDeleteBtn).forEach((item) => {
            item.addEventListener('click', () => {
                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart: user.cart.filter((el) => {
                            return el.id != item.dataset.id
                        })
                    })
                }).then((response) => response.json())
                    .then((response) => {
                        changeUser(response);
                        localStorage.setItem('user', JSON.stringify(response));
                        getCartList()
                    })
            })
        })

        Array.from(allMinusBtn).forEach((item) => {
            item.addEventListener('click', () => {
                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart: user.cart.find(el => el.id == item.dataset.id).count === 1 ?
                            user.cart.filter((el) => {
                                return el.id != item.dataset.id
                            }) : user.cart.map((el) => {
                                if (el.id == item.dataset.id){
                                    return {...el, count: el.count - 1}
                                }
                                return el
                            })
                    })
                }).then((response) => response.json())
                    .then((response) => {
                        changeUser(response)
                        localStorage.setItem('user', JSON.stringify(response))
                        getCartList()
                    })
            })
        })

        Array.from(allPlusBtn).forEach((item) => {
            item.addEventListener('click', () => {
                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart: user.cart.map((el) => {
                            if (el.id == item.dataset.id){
                                return {...el, count: el.count + 1}
                            }
                            return el
                        })
                    })
                }).then((response) => response.json())
                    .then((response) => {
                        changeUser(response)
                        localStorage.setItem('user', JSON.stringify(response))
                        getCartList()
                    })
            })
        })

        let cartAllPrice = document.querySelector('.cart__all-price');

        cartAllPrice.textContent = user.cart.reduce((acc,rec) => {
            cartAllPrice.style.color = 'black';
            return acc + (rec.price * rec.count)
        }, 0)
    }

}
getCartList();


const getLeftProducts = () => {
    fetch(`http://localhost:3000/products?price_lte=100&_limit=3`)
        .then((response) => response.json())
        .then((response) => {
            response.forEach((item) => {
                leftProducts2.innerHTML += `
                             <div class="thubmnail-recent">
                             <a href="single-product.html?product=${item.id}">
                                <img src="${item.image}" class="recent-thumb" alt="">
</a>
                         
                            <h2><a href="single-product.html?product=${item.id}">${item.title}</a></h2>
                            <div class="product-sidebar-price">
                                <ins>${item.price}$</ins> <del></del>
                            </div>                             
                        </div>
                            `

            })
        })
};

getLeftProducts();

const getLeftTitles = () => {
    fetch(`http://localhost:3000/products?_limit=4`)
        .then((response) => response.json())
        .then((response) => {
            response.forEach((el) => {
                leftTitles2.innerHTML += `
                            <li><a href="single-product.html?product=${el.id}">${el.title}</a></li>
                            `
            })
        })
};

getLeftTitles();