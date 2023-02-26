"use strict";
import { checker } from "./checker.js";

document.addEventListener("DOMContentLoaded", function () {
    checker();
    resetErrores();
    const form = document.getElementById("formulario");

    form.addEventListener("submit", async (event) => {
        resetErrores();
        event.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("password").value;
        const contraseña2 = document.getElementById("confirmPassword").value;
        const telefono = document.getElementById("telefono").value;

        let error = false;
        if (validarGenerico(usuario, "errorUser")) { error = true; }
        if (validarGenerico(nombre, "errorNombre")) { error = true; }
        if (validarGenerico(apellido, "errorApellido")) { error = true; }
        if (validarGenerico(email, "errorEmail")) { error = true; }
        if (validarContraseña(contraseña, contraseña2)) { error = true; }
        if (validarTelefono(telefono)) { error = true; }

        if (!error) {
            localStorage.setItem('BD', document.getElementById('BBDD').value);
            const data = {

                "username": usuario,
                "firstName": nombre,
                "lastName": apellido,
                "email": email,
                "password": contraseña,
                "phone": telefono,
                "userStatus": 1
            };

            switch (localStorage.getItem('BD')) {
                case 'Redis':
                    await postData(data, usuario);
                    break;
                case 'IndexedDB':
                    //TODO
                    break;
                case 'SessionStorage':
                    let usersS = JSON.parse(sessionStorage.getItem('Users')) ?? [];
                    usersS.forEach(element => {
                        if (element.username == data.username && element.password == data.password)
                            return;
                    });
                    sessionStorage.setItem("sesion", JSON.stringify(usuario));
                    usersS.push(data);
                    sessionStorage.setItem('Users', JSON.stringify(usersS));
                    window.location.href = "informacion.html";
                    break;
                case 'LocalStorage':
                    let usersL = JSON.parse(localStorage.getItem('Users')) ?? [];
                    usersL.forEach(element => {
                        if (element.username == data.username && element.password == data.password)
                            return;
                    });
                    sessionStorage.setItem("sesion", JSON.stringify(usuario));
                    usersL.push(data);
                    localStorage.setItem('Users', JSON.stringify(usersL));
                    window.location.href = "informacion.html";
                    break;
            }


        }



    }, false);
});

function resetErrores() {
    document.getElementById("errorNombre").style.display = "none";
    document.getElementById("errorApellido").style.display = "none";
    document.getElementById("errorUser").style.display = "none";
    document.getElementById("errorEmail").style.display = "none";
    document.getElementById("errorPass").style.display = "none";
    document.getElementById("errorContra").style.display = "none";
    document.getElementById("errorTel").style.display = "none";
}

function validarGenerico(valor, idError) {
    if (valor == '') {
        document.getElementById(idError).style.display = "block";
        return true;

    } else {
        return false;
    }
}


function validarContraseña(contra1, contra2) {
    if (contra1.length < 6) {
        document.getElementById("errorContra").style.display = "block";
        return true;
    } else {
        if (contra1 != contra2) {
            document.getElementById("errorPass").style.display = "block";
            return true;
        } else {
            return false;
        }

    }


}

function validarTelefono(valor) {
    if (valor == '' || valor.length < 9) {
        document.getElementById("errorTel").style.display = "block";
        return true;
    } else {
        return false;
    }
}

async function postData(datos, usuario) {
    fetch('https://localhost:42069/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(datos)
    }).catch(error => {
        {

            alert("Error, el nombre de usuario especificado ya existe");

        }
    }).then(response => {
        sessionStorage.setItem("sesion", JSON.stringify(usuario));
        window.location.href = "informacion.html";
    }
    );
}
