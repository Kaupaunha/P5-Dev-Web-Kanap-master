// Get API //////////////////////////////
fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        showProducts(data);
    })
    .catch(err => {
        console.log(err);
    });


// Show products //////////////////////////////
function showProducts(data) {
    for (product of data) {
        const itemCard = document.getElementById('items');
        itemCard.innerHTML += `
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
        </a>
      `;
    }
}


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

// Add elements from API to product page
fetch("http://localhost:3000/api/products/" + productId)
    .then(res => res.json())
    .then(data => {

        image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        imageAlt = `${data.altTxt}`;
        title.innerHTML = `<h1 id="title">${data.name}</h1>`;
        price.innerText = `${data.price}`;
        description.innerText = `${data.description}`;

        data.colors.forEach((option) => {
            colors.innerHTML += `<option value="${option}">${option}</option>`;
        });

    })



