// Get ID from URL
let idUrl = window.location.href;
let url = new URL(idUrl);
let showOrderId = url.searchParams.get("orderId");

document.querySelector("#orderId").innerHTML = showOrderId;