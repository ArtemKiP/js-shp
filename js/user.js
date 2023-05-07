
export let user = {
    login: "",
    email: ""
};



let headerUserName = document.querySelector('.header__user-name');
let headerUserAction = document.querySelector('.header__user-action');



export const changeUser = (userData) => {
    user = userData
};

if (localStorage.getItem('user') !== null) {
    user = JSON.parse(localStorage.getItem('user'));
    headerUserName.textContent = `${user.login}`;
    headerUserAction.textContent = 'Выйти'
} else {
    headerUserAction.textContent = 'Войти'
}

headerUserAction.addEventListener('click', () => {
    if (headerUserAction.textContent === 'Войти') {
        location.href = 'http://localhost:63342/eElectronics%20-%20Ecommerce%20HTML%20Template/login.html'
    }else {
        localStorage.removeItem('user');
        user = {email: ''};
        location.href = 'http://localhost:63342/eElectronics%20-%20Ecommerce%20HTML%20Template/index.html'
    }
});


// const cartPriceAndCount = () => {
//     let cartAllPrice = document.querySelector('.cart-amunt');
//     let productCount = document.querySelector('.product-count');
//
// cartAllPrice.textContent = user.cart.reduce((acc,rec) => {
//     cartAllPrice.style.color = 'black';
//     return acc + (rec.price * rec.count)
// }, 0);
//
// productCount.textContent = user.cart.length;
// };
//
//
// cartPriceAndCount();











