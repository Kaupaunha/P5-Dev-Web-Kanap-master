class Cart {
    // DISPLAY CART CONTENT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    displayCart(panier) {
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

    showProductQuantity() {
        let totalQuantity = 0;
        const showProductQuantity = document.querySelector("#totalQuantity");

        for (let i in getCart) {
            totalQuantity += getCart[i].Quantity;
        }

        showProductQuantity.innerHTML = totalQuantity;
    }

    showTotalPrice() {
        let totalPrice = 0;
        const showPrice = document.querySelector("#totalPrice");

        for (let i in getCart) {
            totalPrice += getCart[i].Price * getCart[i].Quantity;
        }

        showPrice.innerHTML = totalPrice;
    }

    deleteItem() {
        document.addEventListener('click', function (event) {
            if (event.target.classList.value == "deleteItem") {
                let deleteId = event.target.getAttribute("data-id");
                let deleteColor = event.target.getAttribute("data-color");

                // use filter to keep elements that were not deleted 
                let myCart = getCart.filter(elt => elt.ID !== deleteId || elt.Color !== deleteColor);

                // send remaining elements to localstorage
                localStorage.setItem('myCart', JSON.stringify(myCart));

                alert('Votre article a bien été supprimé.');

                location.reload();
            }
        });
    }

    changeQuantity() {
        document.addEventListener('change', function (event) {
            if (event.target.classList.value == "itemQuantity") {
                // on récupère la quantité sélectionnée
                let getQuantity = event.target.valueAsNumber;

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

}


