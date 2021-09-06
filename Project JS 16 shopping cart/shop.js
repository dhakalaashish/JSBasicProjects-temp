// selecting from the DOM
const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const productsDOM = document.querySelector('.products-center')
// cart 
let cart = []
//buttons
let buttonsDOM = [];

//getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('products.json')
            let data = await result.json()
            // return data;
            let products = data.items;
            products = products.map((item) => {
                const { title, price } = item.fields
                const { id } = item.sys
                const image = item.fields.image.fields.file.url
                return { title, price, id, image }
            })
            return products
        } catch (error) {
            console.log(error)
        }
    }
}
//display products
class UI {
    displayProducts(products) {
        let result = ''
        products.forEach((product) => {
            result += `<!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article>
            <!-- end of single product -->`
        })
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')]
        buttonsDOM = buttons;
        buttons.forEach((button) => {
            let id = button.dataset.id
            let inCart = cart.find((item) => item.id === id)
            if (inCart) {
                //change the add to cart text to in cart
                button.innerText = 'In Cart'
                //make the button disabled
                button.disabled = true;
            }
            button.addEventListener('click', (event) => {
                //change the inner text
                event.target.innerText = 'In Cart'

                //disable the button
                event.target.disabled = true;

                //get this item from the local storage!
                let cartItem = { ...Storage.getProduct(id), amount: 1 }
                //Note -- basically it means to get all the properties in the product that was returned from getProduct(id) and add the amount property to it!
                //Note -- so get me everything i am supposed to get, but also add the amount key value pair there!

                //add the product to the cart
                cart = [...cart, cartItem]
                //Note -- same thing as above: get me all the items that were in the cart before and then add the cartItem that was just formed there!

                //save the cart in the local storage
                Storage.saveCart(cart)

                //set cart values -- total items abd total amount
                this.setCartValues(cart);

                //display cart item
                this.addCartItem(cartItem)

                //show the cart
                this.showCart()
            })
        })
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map((item) => {
            tempTotal += item.price * item.amount
            itemsTotal += item.amount
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div')
        div.classList.add('cart-item')
        div.innerHTML = `<img src=${item.image} alt="product">
                    <div>
                        <h4>${item.title}</h4>
                        <h5>$${item.price}</h5>
                        <span class="remove-item" data-id=${item.id}>remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up" data-id=${item.id}></i>
                        <p class="item-amount">${item.amount}</p>
                        <i class="fas fa-chevron-down" data-id=${item.id}></i>
                    </div>`
        cartContent.appendChild(div)
    }
    showCart() {
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }
    hideCart() {
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }
    populateCart(cart) {
        cart.forEach((item) => this.addCartItem(item))
    }
    setupAPP() {
        cart = Storage.getCart()
        this.setCartValues(cart)
        this.populateCart(cart)
        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart)
    }
    cartLogic() {
        //clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart()
        })
        // cart functionality
        cartContent.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeItem(id)
            } else if (event.target.classList.contains('fa-chevron-up')) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find((item) => item.id === id)
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart)
                this.setCartValues(cart)
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }
            else if (event.target.classList.contains('fa-chevron-down')) {
                let decreaseAmount = event.target;
                let id = decreaseAmount.dataset.id;
                let tempItem = cart.find((item) => item.id === id)
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart)
                    this.setCartValues(cart)
                    decreaseAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    cartContent.removeChild(decreaseAmount.parentElement.parentElement)
                    this.removeItem(id)
                }
            }
        })
    }
    clearCart() {
        let cartItems = cart.map((item) => item.id)
        cartItems.forEach((id) => this.removeItem(id))
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart()
    }
    removeItem(id) {
        cart = cart.filter((item) => item.id !== id)
        this.setCartValues(cart)
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>
                        add to cart`
    }
    getSingleButton(id) {
        return buttonsDOM.find((button) => button.dataset.id === id)
    }
}
//local storage
class Storage {
    //Note -- static method can be used without instantiating a class
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'))
        return products.find((product) => product.id === id)
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
}

//event listener for document!
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI()
    const products = new Products()
    //setup Application
    ui.setupAPP()
    //get all products
    products
        .getProducts()
        .then((products) => {
            ui.displayProducts(products)
            Storage.saveProducts(products)
        })
        .then(() => {
            ui.getBagButtons()
            ui.cartLogic()
        })
})







