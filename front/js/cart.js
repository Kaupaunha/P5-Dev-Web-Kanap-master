// Get our cart from localstorage

let myCart = JSON.parse(localStorage.getItem('myCart'));




// DISPLAY PRODUCTS FROM OUR CART //////////////////////////////////////////////////////////////////////////////////////////////////////

// create an array to put items inside it 
let itemCards = [];

// create a loop to take each element from our cart 
for (i = 0; i < myCart.length; i++) {

  itemCards = itemCards + `
    
    <article class="cart__item" data-id="${myCart[i].ID}" data-color="${myCart.Color}">
    <div class="cart__item__img">
      <img src="${myCart[i].Picture}" alt="${myCart[i].PictureTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${myCart[i].Name}</h2>
        <p>${myCart[i].Color}</p>
        <p>${myCart[i].Price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${myCart[i].Quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
}
if (i === myCart.length) {
  const displayCart = document.getElementById('cart__items');
  displayCart.innerHTML += itemCards;
}



// Display products quantity
function showProductQuantity() {
  let totalQuantity = 0;
  const showProductQuantity = document.querySelector("#totalQuantity");

  for (let i in myCart) {
    totalQuantity += myCart[i].Quantity;
  }

  showProductQuantity.innerHTML = totalQuantity;
}
showProductQuantity();



// Display total price 
function showTotalPrice() {
  let totalPrice = 0;
  const showPrice = document.querySelector("#totalPrice");

  for (let i in myCart) {
    totalPrice += myCart[i].Price * myCart[i].Quantity;
  }

  showPrice.innerHTML = totalPrice;
}
showTotalPrice();



// DELETE ITEMS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteItem() {
  const deleteButton = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', (event) => {
      event.preventDefault();

      // get ID and Color from delete button
      let deleteId = myCart[i].ID;
      let deleteColor = myCart[i].Color;

      // use filter to keep elements that were not deleted 
      myCart = myCart.filter(elt => elt.ID !== deleteId || elt.Color !== deleteColor);

      // send remaining elements to localstorage
      localStorage.setItem('myCart', JSON.stringify(myCart));

      alert('Votre article a bien été supprimé.');

      location.reload();
    });
  }
}
deleteItem();



// CHANGE PRODUCTS QUANTITY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeQuantity() {
  const getQuantity = document.querySelectorAll(".itemQuantity");

  // create a loop to listen every .itemQuantity changes
  for (let i = 0; i < getQuantity.length; i++) {
    getQuantity[i].addEventListener("change", function () {

      const oldQuantity = myCart[i].Quantity;
      const quantityChanged = getQuantity[i].valueAsNumber;

      // check if new quantity is different from old quantity
      if (quantityChanged !== oldQuantity) {
        if (quantityChanged >= 1) {
          myCart[i].Quantity = quantityChanged;
        }
      }

      localStorage.setItem("myCart", JSON.stringify(myCart));
      location.reload();
    })

  }

}
changeQuantity();



// CONTACT INPUT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const userInput = document.querySelectorAll("form input");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

function inputControl() {

  // First name control
  const firstNameError = document.querySelector("#firstNameErrorMsg");
  firstName.addEventListener("change", (event) => {
    if (/^[A-Za-zéèê-ïë]+$/.test(event.target.value)) {
      firstNameError.innerHTML = "";
    } else {
      firstNameError.innerHTML = "Veuillez n'écrire que des lettres";
    }
  })


  // Last name control
  const lastNameError = document.querySelector("#lastNameErrorMsg");
  lastName.addEventListener("change", (event) => {
    if (/^[A-Za-zéèê-ïë]+$/.test(event.target.value)) {
      lastNameError.innerHTML = "";
    } else {
      lastNameError.innerHTML = "Veuillez n'écrire que des lettres";
    }
  })


  // Address control
  const addressError = document.querySelector("#addressErrorMsg");
  address.addEventListener("change", (event) => {
    if (/^\d{1,5}[a-zA-Zéêëèîïâäçù ,'-]+$/.test(event.target.value)) {
      addressError.innerHTML = "";
    } else {
      addressError.innerHTML = "Veuillez indiquer une adresse correcte";
    }
  })


  // City control
  const cityError = document.querySelector("#cityErrorMsg");
  city.addEventListener("change", (event) => {
    if (/^[a-zA-Zéêëèîïâäçù ,'-]+$/.test(event.target.value)) {
      cityError.innerHTML = "";
    } else {
      cityError.innerHTML = "Veuillez indiquer une ville correcte";
    }
  })


  // Email control
  const emailError = document.querySelector("#emailErrorMsg");
  email.addEventListener("change", (event) => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(event.target.value)) {
      emailError.innerHTML = "";
    } else {
      emailError.innerHTML = "Veuillez indiquer une adresse email correcte";
    }
  })
}
inputControl();



// SEND CONTACT INFORMATIONS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const submitButton = document.querySelector("#order");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (firstName.value !== "" && lastName.value !== "" && address.value !== "" && city.value !== "" && email.value !== "") {
    let productsBought = [];

    for (let i = 0; i < myCart.length; i++) {
      productsBought.push(myCart[i].ID);
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