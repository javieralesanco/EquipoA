"use strict";


document.addEventListener("DOMContentLoaded", async function () {
  

    const form = document.getElementById("formulario2");

    form.addEventListener("submit", async (event) => {
      const usuario = document.getElementById("user").value;
      const contraseña = document.getElementById("password").value;
      let url = 'https://petstore.swagger.io/v2/user/' + usuario;

      event.preventDefault();
      event.stopPropagation();

      
      
      fetch(url)
    .then((response) => response.json())
    .then((data) => {
      
      array=JSON.parse(data);
      alert(array);
      array.forEach(element => {
       

      });

     });



    });

});



