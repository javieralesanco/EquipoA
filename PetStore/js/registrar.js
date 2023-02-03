"use strict";

document.addEventListener("DOMContentLoaded", function () {
    resetErrores();
    const form = document.getElementById("formulario");

    form.addEventListener("submit", async (event) => {
        resetErrores();
        event.preventDefault();
        event.stopPropagation();


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

            const data = {

                "username": usuario,
                "firstName": nombre,
                "lastName": apellido,
                "email": email,
                "password": contraseña,
                "phone": telefono,
                "userStatus": 1
            };

            await postData(data, usuario);


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
    fetch('https://petstore.swagger.io/v2/user', {
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
