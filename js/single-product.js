import {changeUser, user} from "./user.js";


let categoryTop = document.querySelector('.single__product-category');
let titleTop = document.querySelector('.single__product-title');
let titleMain = document.querySelector('.single__product-maintitle');
let price = document.querySelector('.single__product-price');
let categoryMain = document.querySelector('.single__product-maincategory');
let rating = document.querySelector('.single__product-rating');
let description = document.querySelector('.single__product-desc');
let imgMain = document.querySelector('.single__product-img');


let addToCart = document.querySelector('.single__product-btn    ');



let leftProducts = document.querySelector('.left__products');
let leftTitles = document.querySelector('.left__titles');
let relatedProducts = document.querySelector('.related__products');


const getOneProduct = () => {
fetch(`http://localhost:3000/products/${location.search.split('=') [1]}`)
    .then((response) => response.json())
    .then((response) => {
        titleMain.textContent = response.title;
        titleTop.textContent = response.title;
        categoryMain.textContent = response.category;
        price.textContent = `${response.price}$`;
        categoryTop.textContent = response.category;
        description.textContent = response.description;
        rating.textContent = response.rating.rate;
        imgMain.setAttribute('src', response.image);
        addToCart.dataset.id = response.id;

        getRelatedProducts(response.category);


        addToCart.addEventListener('click', () => {
            fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cart: user.cart.some((item) => item.id === response.id) ?
                        user.cart.map((item) => {
                            if (item.id === response.id){
                                return {...item , count: item.count +1}
                            }
                            return item
                        }) :
                        [...user.cart, {
                            ...response,
                            count: 1
                        }]
                })
            }).then((response) => response.json())
                .then((response) => {
                    changeUser(response)
                    localStorage.setItem('user', JSON.stringify(response))
                    getOneProduct()
                })
        });
    })

};

getOneProduct();



const getLeftProducts = () => {
        fetch(`http://localhost:3000/products?price_lte=50&_limit=3`)
            .then((response) => response.json())
            .then((response) => {
                    response.forEach((item) => {
                            leftProducts.innerHTML += `
                             <div class="thubmnail-recent">
                             <a href="?product=${item.id}">
                                <img src="${item.image}" class="recent-thumb" alt="">
</a>
                         
                            <h2><a href="?product=${item.id}">${item.title}</a></h2>
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
                            leftTitles.innerHTML += `
                            <li><a href="?product=${el.id}">${el.title}</a></li>
                            `
                    })
            })
};

getLeftTitles();

const getRelatedProducts = (productCategory) => {
    fetch(`http://localhost:3000/products?category=${productCategory}&_limit=4`)
        .then((response) => response.json())
        .then((response) => {
            response.forEach((item) => {
                relatedProducts.innerHTML += `
             <div class="single-product related__item">
                                    <div class="product-f-image">
                                        <img class="single-product__image" src="${item.image}" alt="">
                                        <div class="product-hover">
                                            <a href="" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                                            <a href="" class="view-details-link"><i class="fa fa-link"></i> See details</a>
                                        </div>
                                    </div>

                                    <h2><a href="?product=${item.id}">${item.title}</a></h2>

                                    <div class="product-carousel-price">
                                        <ins>${item.price}</ins> <del></del>
                                    </div> 
                                </div>
            `
            })

        })
};



