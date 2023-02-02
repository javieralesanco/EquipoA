'use strict'

document.addEventListener("DOMContentLoaded", function () {
    const modificar = document.getElementById("Modificar");
    const eliminar = document.getElementById("Borrar");
    id = getIdFromUrl();

    mostrarMascota(id);

    modificar.addEventListener("click", function () {
        modificarMascota();
    });
    eliminar.addEventListener("click", function () {
        eliminarMascota();
    })
});

function mostrarMascota(id) {

    fetch(`https://petstore.swagger.io/v2/pet/${id}`)


}
function modificarMascota(id) {

}
function eliminarMascota(id) {

}

function getIdFromUrl() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    return id;
}