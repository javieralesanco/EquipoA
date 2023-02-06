"use strict";


document.addEventListener("DOMContentLoaded", async function () {


    const btnLogout = document.getElementById("logout");

    btnLogout.addEventListener("click", async (event) => {


        let url = 'https://petstore.swagger.io/v2/user/logout';
        fetch(url)
            .then(sessionStorage.removeItem("sesion"))
            .then(window.location.href = "login.html")
            .catch(err => {
                alert("Error al cerrar sesion");
            });
    });
});