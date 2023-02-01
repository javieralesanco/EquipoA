"use strict";


document.addEventListener("DOMContentLoaded", async function () {

  document.getElementById('errorCredenciales').style.display = "none";
  const form = document.getElementById("formulario2");

  form.addEventListener("submit", async (event) => {
    document.getElementById('errorCredenciales').style.display = "none";

    const usuario = document.getElementById("user").value;
    const contraseña = document.getElementById("password").value;
    let url = 'https://petstore.swagger.io/v2/user/' + usuario;





    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        console.log(data.username);
        if (data.username == usuario && data.password == contraseña) {
          window.location.href = "informacion.html";
        } else {

          document.getElementById('errorCredenciales').style.display = "block";

        }


      }).catch(err => {
        console.log(err);
      });



  });

});