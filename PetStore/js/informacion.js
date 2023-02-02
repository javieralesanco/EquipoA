'use strict'

document.addEventListener("DOMContentLoaded", function () {
    const modificar = document.getElementById("Modificar");
    const eliminar = document.getElementById("Borrar");
    // id = getIdFromUrl();
    // mostrarMascota(id);  

    modificar.addEventListener("click", function () {
        modificarMascota();
    });
    eliminar.addEventListener("click", function () {
        eliminarMascota();
    })
});

function mostrarMascota(id) {


}
function modificarMascota(id) {

}
function eliminarMascota(id) {
    const element = document.querySelector('.informacionAnimales');
    // fetch(`https://petstore.swagger.io/v2/pet/${id}`, { method: 'DELETE' })
    //     .then(() => element.innerHTML = 'Delete successful');
    fetch(`https://petstore.swagger.io/v2/pet/1000`, { method: 'DELETE' })
        .then(() => element.innerHTML = 'Delete successful');

}

function getIdFromUrl() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    return id;
}