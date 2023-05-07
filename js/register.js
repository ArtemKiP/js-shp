import {user} from "./user.js";

let formRegister = document.querySelector('.signup__form');

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();

    let userData = {
        login:e.target[0].value,
        email:e.target[1].value,
        password:e.target[2].value,
        cart : []
    };


    fetch('http://localhost:3000/register', {
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

