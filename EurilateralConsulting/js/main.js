'use strict';
import probarTodo from "./validador.js";
import setAllErrores from "./errores.js";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('formcontacto');
    form.addEventListener('submit', validar);
});
function validar(event) {
    event.preventDefault();
    const mensaje = new Mensaje(
        document.getElementById('name').value,
        document.getElementById('Email').value,
        document.getElementById('asunto').value,
        document.getElementById('message').value,
    );
    const errores = probarTodo(mensaje);
    let check = true;
    for (let i = 0; i < errores.length && check; i++) {
        if (errores[i] != null)
            check = false;
    }
    if (!check) {
        setAllErrores(document.getElementsByClassName('error'), errores);
    }
    else {
        document.getElementById('checknombre').textContent = mensaje.nombre;
        document.getElementById('checkemail').textContent = mensaje.correo;
        document.getElementById('checkasunto').textContent = mensaje.asunto;
        document.getElementById('checkmensaje').textContent = mensaje.contenido;
        document.getElementById('checkVerify').classList.add('d-block');
        document.getElementById('checkVerify').classList.remove('d-none');
        document.getElementById('divSendContact').classList.add('d-none');
        document.getElementById('divSendContact').classList.remove('d-block');
        document.getElementById('rollback').addEventListener('click', rollback);
        document.getElementById('commit').addEventListener('click', submit);
    }
}
function Mensaje(nombre, correo, asunto, contenido) {
    this.nombre = nombre;
    this.correo = correo;
    this.asunto = asunto;
    this.contenido = contenido;
}
const rollback = () => {
    document.getElementById('checkVerify').classList.add('d-none');
    document.getElementById('checkVerify').classList.remove('d-block');
    document.getElementById('divSendContact').classList.add('d-block');
    document.getElementById('divSendContact').classList.remove('d-none');
    document.getElementById('rollback').removeEventListener('click', rollback);
    document.getElementById('commit').removeEventListener('click', submit);
}
const submit = () => {
    document.getElementById('formcontacto').submit();
}