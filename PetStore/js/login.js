"use strict";
import { checker } from "./checker.js";

document.addEventListener("DOMContentLoaded", async function () {
  checker();

  document.getElementById('errorCredenciales').style.display = "none";
  document.getElementById('errorUser').style.display = "none";
  const form = document.getElementById("formulario2");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    document.getElementById('errorCredenciales').style.display = "none";
    document.getElementById('errorUser').style.display = "none";

    const usuario = document.getElementById("user").value;
    const contraseña = document.getElementById("password").value;

    localStorage.setItem('BD', document.getElementById('BBDD').value);
    switch (localStorage.getItem('BD')) {
      case 'Redis':
        let url = 'https://localhost:42069/user/' + usuario;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {

            console.log(data.username);
            if (data.username == usuario && data.password == contraseña) {
              sessionStorage.setItem("sesion", JSON.stringify(usuario));
              window.location.href = "informacion.html";
            } else {

              document.getElementById('errorCredenciales').style.display = "block";

            }

          }).catch(err => {
            document.getElementById('errorUser').style.display = "block";
          });
        break;
      case 'IndexedDB':
        //TODO
        break;
      case 'SessionStorage':
        const usersS = JSON.parse(sessionStorage.getItem('Users')) ?? [];
        usersS.forEach(element => {
          if (element.username == usuario && element.password == contraseña) {
            sessionStorage.setItem("sesion", JSON.stringify(usuario));
            window.location.href = "informacion.html";
          }
        });
        document.getElementById('errorCredenciales').style.display = "block";
        break;
      case 'LocalStorage':
        const usersL = JSON.parse(localStorage.getItem('Users')) ?? [];
        usersL.forEach(element => {
          if (element.username == usuario && element.password == contraseña) {
            sessionStorage.setItem("sesion", JSON.stringify(usuario));
            window.location.href = "informacion.html";
          }
        });
        document.getElementById('errorCredenciales').style.display = "block";
        break;
    }
  });
});