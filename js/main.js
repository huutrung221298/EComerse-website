const items = [
{
    label: "AEROREADY SHIRT",
    price: 25,
    image: "img/product1.jpg",
},
{
    label: "WIRELESS EARBUDS",
    price: 100,
    image: "img/product2.jpg",
},
{
    label: "HOODED PARKA",
    price: 45,
    image: "img/product3.jpg",
},
{
    label: "STRAW METAL BOTTLE",
    price: 24.04,
    image: "img/product4.jpg",
},
{
    label: "METAL GLASSES",
    price: 50,
    image: "img/product5.jpg",
},
{
    label: "BACK HAT",
    price: 50,
    image: "img/product6.jpg",
},
{
    label: "BACKPACK",
    price: 70,
    image: "img/product7.jpg",
},
{
    label: "ULTRABOOST 22",
    price: 45,
    image: "img/product8.jpg",
},

]

function mappingShopProducts(){
    const product = document.getElementById("product");
    items.map(item => {
        product.innerHTML +=`<div class="product-box">
            <img src=${item.image} alt="" class="product-img" />
            <h2 class="product-title">${item.label}</h2>
            <span class="price">$${item.price}</span>
            <i class='bx bx-shopping-bag add-cart'></i>
        </div>`
    })
}

mappingShopProducts()

// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// close cart
closeCart.onclick = () => {
    cart.classList.remove("active")
}
let quantityInputs = document.getElementsByClassName('cart-quantity')

// cart working JS


// making funtion 
function ready(){
    // remove items from the cart 
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    //console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    // quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    // buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked );

    
}

ready()

// Buy button function
function buyButtonClicked(){
    let cartContent = document.getElementsByClassName('content')[0];
    let cartItems = cartContent.getElementsByClassName('cart-product-title')
    if(cartItems.length == 0){
        alert("Your cart is empty");
        return;
    }
    

    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    let cartQuantity = document.getElementsByClassName('quantity')[0];
    cartQuantity.innerHTML = 0;
    alert("Your order is placed");

    updatetotal();
}


function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    // decrease cart icon
    let cartItemsNames = document.getElementsByClassName('cart-product-title');
    let cartQuantity = document.getElementsByClassName('quantity')[0];
    cartQuantity.innerHTML = `${cartItemsNames.length + 1 -1}`;
    updatetotal();
}

// quantitty changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

// Add to cart function
function addCartClicked(event){
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg)
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var CartItems = document.getElementsByClassName('content')[0];
    // Check weather product already in cart ?
    let cartItemsNames = CartItems.getElementsByClassName('cart-product-title')
    for (let i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            let item = cartItemsNames[i].parentElement;
            let quantity = Number(item.getElementsByClassName('cart-quantity')[0].value);
            item.getElementsByClassName('cart-quantity')[0].value = quantity + 1;
            return;
        }
    }

    // Increase cart icon
    let cartQuantity = document.getElementsByClassName('quantity')[0];
    cartQuantity.innerHTML = `${cartItemsNames.length + 1}`;

    // append new item to cart
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove Cart -->
        <i class='bx bxs-trash-alt cart-remove'></i>`;
    
    cartShopBox.innerHTML = cartBoxContent
    CartItems.appendChild(cartShopBox);


    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    
}

// update total
function updatetotal(){

    var cartContent = document.getElementsByClassName('content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }
        // if price cotain float
        total = Math.round(total*100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
}