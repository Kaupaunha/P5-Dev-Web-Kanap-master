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
        // show cart
        displayCart(panier);
    })



// DISPLAY PRODUCTS FROM OUR CART ///////////////////////////////////////////////////////////////////////////////////////////////////
function displayCart(panier) {
    let fragment = document.createDocumentFragment();

    for (let product of panier) {
        // create article element
        let article = document.createElement("article");
        article.setAttribute("class", "cart__item");
        article.setAttribute("id", `${product.ID}`);
        article.setAttribute("data-color", `${product.Color}`);

        // create first div
        let firstDiv = document.createElement("div");
        firstDiv.classList.add("cart__item__img");

        let img = document.createElement("img");
        img.src = product.Picture;
        img.alt = product.PictureTxt;
        firstDiv.appendChild(img);
        article.appendChild(firstDiv);

        // create second div
        let secondDiv = document.createElement("div");
        secondDiv.classList.add("cart__item__content");

        // sub div 1
        let secondDivOne = document.createElement("div");
        secondDivOne.classList.add("cart__item__content__description");

        let name = document.createElement("h2");
        name.textContent = product.Name;
        secondDivOne.appendChild(name);

        let color = document.createElement("p");
        color.textContent = product.Color;
        secondDivOne.appendChild(color);

        let price = document.createElement("p");
        price.textContent = product.Price + "€";
        secondDivOne.appendChild(price);

        secondDiv.appendChild(secondDivOne);

        // sub div 2 
        let secondDivTwo = document.createElement("div");
        secondDivTwo.classList.add("cart__item__content__settings");

        let secondDivTwoOne = document.createElement("div");
        secondDivTwoOne.classList.add("cart__item__content__settings__quantity");

        let quantity = document.createElement("p");
        quantity.textContent = "Qté : ";

        let input = document.createElement("input");
        input.type = "number";
        input.classList.add("itemQuantity");
        input.name = "itemQuantity";
        input.min = 1;
        input.max = 100;
        input.value = product.Quantity;
        input.setAttribute("data-id", `${product.ID}`);
        input.setAttribute("data-quantity", product.Quantity);
        input.setAttribute("data-color", `${product.Color}`);



        secondDivTwoOne.appendChild(quantity);
        secondDivTwoOne.appendChild(input);
        secondDivTwo.appendChild(secondDivTwoOne);
        secondDiv.appendChild(secondDivTwo);

        // sub div 3 
        let secondDivThree = document.createElement("div");
        secondDivThree.classList.add("cart__item__content__settings__delete");

        let deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.textContent = "Supprimer";
        // add attributes to deleteItem for deleteItem function
        deleteItem.setAttribute("data-id", `${product.ID}`);
        deleteItem.setAttribute("data-color", `${product.Color}`);

        secondDivThree.appendChild(deleteItem);
        secondDiv.appendChild(secondDivThree);

        article.appendChild(secondDiv);

        fragment.appendChild(article);
    }
    document.querySelector("#cart__items").appendChild(fragment);
}


// Display products quantity
function showProductQuantity() {
    let totalQuantity = 0;
    const showProductQuantity = document.querySelector("#totalQuantity");

    for (let i in getCart) {
        totalQuantity += getCart[i].Quantity;
    }

    showProductQuantity.innerHTML = totalQuantity;
}
showProductQuantity();



// Display total price 
function showTotalPrice() {
    let totalPrice = 0;
    const showPrice = document.querySelector("#totalPrice");

    for (let i in getCart) {
        totalPrice += getCart[i].Price * getCart[i].Quantity;
    }

    showPrice.innerHTML = totalPrice;
}
showTotalPrice();



// DELETE ITEMS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteItem() {
    document.addEventListener('click', function (event) {
        if (event.target.classList.value == "deleteItem") {
            let deleteId = event.target.getAttribute("data-id");
            let deleteColor = event.target.getAttribute("data-color");

            // use filter to keep elements that were not deleted 
            myCart = getCart.filter(elt => elt.ID !== deleteId || elt.Color !== deleteColor);

            // send remaining elements to localstorage
            localStorage.setItem('myCart', JSON.stringify(myCart));

            alert('Votre article a bien été supprimé.');

            let deleteButton = document.getElementById(deleteId);
            deleteButton.remove();
        }
    });
}
deleteItem();



// CHANGE PRODUCTS QUANTITY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeQuantity() {
    document.addEventListener('change', function (event) {
        if (event.target.classList.value == "itemQuantity") {
            // on récupère la quantité sélectionnée
            getQuantity = event.target.valueAsNumber;

            // on récupère l'ancienne quantité
            const oldQuantity = event.target.getAttribute("data-quantity");

            // on récupère l'ID du produit
            const getId = event.target.getAttribute("data-id");

            // on récupère la couleur du produit
            const getColor = event.target.getAttribute("data-color");

            // on cherche le produit correspondant à l'ID du produit sélectionné dans le panier
            let myCart = getCart.find(id => id.ID == getId && id.Color == getColor);


            if (getQuantity !== oldQuantity && getId == myCart.ID) {
                if (getQuantity >= 1) {
                    myCart.Quantity = getQuantity;
                    getCart.Quantity = myCart.Quantity;
                }
            }
            localStorage.setItem("myCart", JSON.stringify(getCart));
            location.reload();
        }

    })
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