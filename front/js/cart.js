// Get our cart from localstorage
let getCart = JSON.parse(localStorage.getItem('myCart'));

// GET API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function () {
    let panier = getCart;
    // DISPLAY CART
    let showCart = new Cart();
    showCart.displayCart(panier);
    // displayCart(panier);
  })


  // CART MODIFICATIONS
  let totalQuantity = new DisplayTotal();
  totalQuantity.showProductQuantity();

  let totalPrice = new DisplayTotal();
  totalPrice.showTotalPrice();

  let deleteProduct = new ModifyCart();
  deleteProduct.deleteItem();

  let modifyQuantity = new ModifyCart();
  modifyQuantity.changeQuantity();


// CONTACT INPUT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const userInput = document.querySelectorAll("form input");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

// CHECK INPUT VALIDITY
let checkForm = new CheckForm();
checkForm.inputControl();


// SEND ORDER INFORMATIONS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const submitButton = document.querySelector("#order");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (firstName.value !== "" && lastName.value !== "" && address.value !== "" && city.value !== "" && email.value !== "") {
    let productsBought = [];

    for (let i = 0; i < getCart.length; i++) {
      productsBought.push(getCart[i].ID);
    }

    const customerInfo = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: productsBought
    }

    const options = {
      method: "POST",
      body: JSON.stringify(customerInfo),
      headers: {
        "Content-Type": "application/json"
      }
    }


    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => { return response.json() })
      .then((data) => {
        // add orderId to URL 
        window.location.href = `confirmation.html?orderId=${data.orderId}`;
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err)
      })
  }
})