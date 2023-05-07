import {user} from "./user.js";

let formLogin = document.querySelector('.login__form');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    let userData = {

        email:e.target[0].value,
        password:e.target[1].value,

    };


    fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then((response) => response.json())
        .then((response) => {


            localStorage.setItem('user', JSON.stringify(response.user));
            location.href = 'http://localhost:63342/eElectronics%20-%20Ecommerce%20HTML%20Template/index.html'
        })
        .catch(() => alert('No'))
});

