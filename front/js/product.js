// Link products to Product page //////////////////////////////

// Get product ID from URL 
let params = new URLSearchParams(document.location.search);
let productId = params.get("id");

// Get elements from HTML
const image = document.getElementsByClassName("item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
let imageAlt = "";
let imageURL = "";

// Add elements from API to product page
fetch("http://localhost:3000/api/products/" + productId)
    .then(res => res.json())
    .then(data => {

        image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        imageURL = `${data.imageUrl}`;
        imageAlt = `${data.altTxt}`;
        title.innerHTML = `<h1 id="title">${data.name}</h1>`;
        price.innerText = `${data.price}`;
        description.innerText = `${data.description}`;

        data.colors.forEach((option) => {
            colors.innerHTML += `<option value="${option}">${option}</option>`;
        });

        getProduct(data);
    })
    .catch(function (err) {
        console.log(err);
    });


// Add products to cart //////////////////////////////
const selectColor = document.getElementById("colors");
const selectQuantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");

function getProduct(product) {

    addToCart.addEventListener('click', (event) => {
        event.preventDefault();

        const chosenProduct = {
            Name: product.name,
            ID: product._id,
            Picture: product.imageUrl,
            PictureTxt: product.altTxt,
            Price: product.price,
            Color: selectColor.value,
            Quantity: parseInt(selectQuantity.value)
        }

        console.log(chosenProduct);

        if (selectQuantity.value > 0 && selectColor.value !== "") {

            let cartSaved = JSON.parse(localStorage.getItem("myCart"));

            if (cartSaved) {
                const checkProduct = cartSaved.find(kanap => kanap.ID == product._id && kanap.Color == selectColor.value);
                if (checkProduct) {
                    let productQuantity = chosenProduct.Quantity + checkProduct.Quantity;
                    checkProduct.Quantity = productQuantity;
                    saveCart(cartSaved);

                }
                else {
                    cartSaved.push(chosenProduct);
                    saveCart(cartSaved);
                }
            } 
            else {
                cartSaved = [];
                cartSaved.push(chosenProduct);
                saveCart(cartSaved);
            }
            alert("Le produit a été ajouté au panier")
        } else {

            alert("Veuillez choisir une couleur et une quantité");
        }
    })
}


function saveCart(cart) {
    localStorage.setItem("myCart", JSON.stringify(cart));
}
