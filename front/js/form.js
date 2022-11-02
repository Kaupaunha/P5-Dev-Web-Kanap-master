class CheckForm {
    // CHECK INPUT VALIDITY ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    inputControl() {

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
}