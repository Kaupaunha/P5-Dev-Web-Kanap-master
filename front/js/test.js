// GET CART FROM LOCAL STORAGE
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



// SHOW CART
function displayCart(panier) {
    let fragment = document.createDocumentFragment();

    for (let product of panier) {
        // On modifie dans le DOM 
        // On crée l'élément article
        let article = document.createElement("article");
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", `${product.ID}`);
        article.setAttribute("data-color", `${product.Color}`);

        // On crée première DIV
        let firstDiv = document.createElement("div");
        firstDiv.classList.add("cart__item__img");

        let img = document.createElement("img");
        img.src = product.Picture;
        img.alt = product.PictureTxt;
        firstDiv.appendChild(img);
        article.appendChild(firstDiv);

        // On crée deuxième DIV
        let secondDiv = document.createElement("div");
        secondDiv.classList.add("cart__item__content");

        // sous div 1
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

        // sous div 2 
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

        secondDivTwoOne.appendChild(quantity);
        secondDivTwoOne.appendChild(input);
        secondDivTwo.appendChild(secondDivTwoOne);
        secondDiv.appendChild(secondDivTwo);

        // sous div 3 
        let secondDivThree = document.createElement("div");
        secondDivThree.classList.add("cart__item__content__settings__delete");

        let deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.textContent = "Supprimer";

        secondDivThree.appendChild(deleteItem);
        secondDiv.appendChild(secondDivThree);

        article.appendChild(secondDiv);

        fragment.appendChild(article);
    }
    document.querySelector("#cart__items").appendChild(fragment);
}



// Show products quantity

function showProductQuantity() {
    let totalQuantity = 0;
    const showProductQuantity = document.querySelector("#totalQuantity");

    for (let i in getCart) {
        totalQuantity += getCart[i].Quantity;
    }

    showProductQuantity.innerHTML = totalQuantity;
}
showProductQuantity();


// Show total price 

function showTotalPrice() {
    let totalPrice = 0;
    const showPrice = document.querySelector("#totalPrice");

    for (let i in getCart) {
        totalPrice += getCart[i].Price * getCart[i].Quantity;
    }

    showPrice.innerHTML = totalPrice;
}
showTotalPrice();





// DELETE PRODUCTS



// Change quantity // A TERMINER
function modifyQuantity() {
    let quantityInCart = document.querySelectorAll(".itemQuantity");
    for (let input of quantityInCart) {
        input.addEventListener("change", function () {
            let panier = getCart;
            //On récupère l'ID de la donnée modifiée
            let idItem = this.closest(".cart__item").dataset.id;
            //On récupère la couleur de la donnée modifiée
            let colorItem = this.closest(".cart__item").dataset.color;
            //On récupère le bon iD dans le panier
            let findId = panier.filter((e) => e.id === idItem);
            //Puis on récupère la couleur
            let findColor = findId.find((e) => e.couleur == colorItem);
            if (this.value > 0) {
                findColor.quantity = this.value;
                //On Push le panier dans le local Storage
                localStorage.setItem("panier", JSON.stringify(panier));
                //On met à jour le prix et le nombre d'article
                updatePriceQuantity(panier, api);
            } else {
                removeBasket(idItem, colorItem, panier);
            }
        });
    }
}

//Fonction pour supprimer un élément du panier
function removeBasket(idItem, colorItem, panier) {
    //Suppression de l'affichage
    let elementToRemove = document.querySelector(
        `article[data-id="${idItem}"][data-color="${colorItem}"]`
    );
    console.log(elementToRemove);
    document.querySelector("#cart__items").removeChild(elementToRemove);
    //Suppression dans le local storage
    //On récupère le bon iD dans le panier
    let findId = panier.filter((e) => e.id === idItem);
    //Puis on récupère la couleur
    let findColor = findId.find((e) => e.couleur == colorItem);
    let index = panier.indexOf(findColor);
    //On supprime l'élément du panier
    if (index >= 0) {
        panier.splice(index, 1);
    }
    //On met a jour le panier et les prix
    localStorage.setItem("panier", JSON.stringify(panier));
    updatePriceQuantity(panier, api);
}



// GET USER INFORMATIONS

function postForm() {
    const order = document.querySelector("#order");
    order.addEventListener("click", (event) => {
        event.preventDefault();
    })
}