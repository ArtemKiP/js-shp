let shopRow = document.querySelector('.shop__row');
let shopPagination = document.querySelector('.shop__pagination');
let page = 1;

const getProducts = () => {
    fetch(`http://localhost:3000/products?_page=${page}&_limit=12`)
        .then((response) => response.json())
        .then((response) => {
            shopRow.innerHTML = '';
            response.forEach((item) => {
                shopRow.innerHTML += `
                
                    <div class="single-shop-product shop__product">
                        <div class="product-upper product__img">
                        <a href="single-product.html?product=${item.id}">
                         <img class="single-product__image" src="${item.image}" alt="">
</a>
                           
                        </div>
                        <h2><a href="single-product.html?product=${item.id}">${item.title}</a></h2>
                        <div class="product-carousel-price">
                            <ins>${item.price}$</ins> <del></del>
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="70" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                        </div>                       
                    </div>
               
                `
            })
        })
};

getProducts();

const getProductsCount = () => {
    fetch(`http://localhost:3000/products`)
        .then((response) => response.json())
        .then((response) => {
            for (let i = 1; i <= Math.ceil(response.length / 12); i++) {
                shopPagination.innerHTML += `
    <li class="shop__pagination-btn" data-id="${i}"><a href="#">
    ${i}
        </a></li>
    `
            }
            let pagBtns = document.querySelectorAll('.shop__pagination-btn');

            Array.from(pagBtns).forEach((item) => {
item.addEventListener('click', () => {
page = +item.dataset.id;

getProducts();
})
            })


        })
};

getProductsCount();