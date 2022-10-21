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
        // itemCard.innerHTML += `
        //     <a href="./product.html?id=${product._id}">
        //     <article>
        //       <img src="${product.imageUrl}" alt="${product.altTxt}">
        //       <h3 class="productName">${product.name}</h3>
        //       <p class="productDescription">${product.description}</p>
        //     </article>
        //     </a>
        //   `;


        let a = document.createElement('a');
        a.href = `./product.html?id=${product._id}`;

        let article = document.createElement('article');

        let img = document.createElement('img');
        img.src = `${product.imageUrl}`;
        img.alt = `${product.altTxt}`;

        let name = document.createElement('h3');
        name.classList.add('productName');
        name.innerHTML = `${product.name}`;

        let description = document.createElement('p');
        description.classList.add('productDescription');
        description.innerHTML = `${product.description}`;

        
        article.appendChild(img);
        article.appendChild(name);
        article.appendChild(description);
        a.appendChild(article);
        itemCard.appendChild(a);

    }
}

