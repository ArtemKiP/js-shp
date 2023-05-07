

let mainScreenRow = document.querySelector('.mainscreen__row');
let topPrice = document.querySelector('.column__widget');
let jewelery = document.querySelector('.column__widget-jewelery');
let less100 = document.querySelector('.column__widget-less100');


const getHighTrend = () => {
    fetch('http://localhost:3000/products?_sort=rating.rate&_order=desc&_limit=5')
        .then((response) => response.json())
        .then((response) => {
            response.forEach((item) => {
                mainScreenRow.innerHTML += `
                 <div class="single-product mainscreen__product">
                                <div class="product-f-image">
                                    <img class="single-product__image" src="${item.image}" alt="">
                                    <div class="product-hover">
                                        <a href="#" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                                        <a href="single-product.html" class="view-details-link"><i class="fa fa-link"></i> See details</a>
                                    </div>
                                </div>
                                
                                <h2><a href="./single-product.html?product=${item.id}">${item.title}</a></h2>
                                
                                <div class="product-carousel-price">
                                    <ins>${item.price}$</ins> <del></del>
                                </div> 
                            </div>
                `
            })
        })
};

getHighTrend();

const getTopPrice = () => {
    fetch('http://localhost:3000/products?price_lte=40&_limit=3')
        .then((response) => response.json())
        .then((response) => {
            response.forEach((item) => {
                topPrice.innerHTML += `
                <div class="single-wid-product">
                            <a href="./single-product.html?product=${item.id}"><img src="${item.image}" alt="" class="product-thumb"></a>
                            <h2><a href="./single-product.html?product=${item.id}">${item.title}</a></h2>
                            <div class="product-wid-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product-wid-price">
                                <ins>${item.price}$</ins> <del></del>
                            </div>                            
                        </div>
                `
            })
        })
};

getTopPrice();

const getJewelery = () => {
    fetch('http://localhost:3000/products?category=jewelery&_limit=3')
        .then((response) => response.json())
        .then((response) => {
            response.forEach((item) => {
                jewelery.innerHTML += `
                <div class="single-wid-product">
                            <a href="./single-product.html?product=${item.id}"><img src="${item.image}" alt="" class="product-thumb"></a>
                            <h2><a href="./single-product.html?product=${item.id}">${item.title}</a></h2>
                            <div class="product-wid-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product-wid-price">
                                <ins>${item.price}$</ins> <del></del>
                            </div>                            
                        </div>
                `
            })
        })
};

getJewelery();

const getLess100 = () => {
    fetch('http://localhost:3000/products?rating.rate_lte=100&_limit=3')
        .then((response) => response.json())
        .then((response) => {
            response.forEach((item) => {
                less100.innerHTML += `
                <div class="single-wid-product">
                            <a href="./single-product.html?product=${item.id}"><img src="${item.image}" alt="" class="product-thumb"></a>
                            <h2><a href="./single-product.html?product=${item.id}">${item.title}</a></h2>
                            <div class="product-wid-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product-wid-price">
                                <ins>${item.price}$</ins> <del></del>
                            </div>                            
                        </div>
                `
            })
        })
};

getLess100();



