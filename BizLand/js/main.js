'use strict';
import probarTodo from "./validador.js";
import setAllErrores from "./errores.js";ç

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('formcontacto');
    form.addEventListener('submit',validar);
});
function validar(event) {
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
        event.stopPropagation();
        
    }   
}


function Mensaje(nombre,correo,asunto,contenido) {
    this.nombre=nombre;
    this.correo=correo;
    this.asunto=asunto;
    this.contenido=contenido;
}