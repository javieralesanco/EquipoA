'use strict'

document.addEventListener("DOMContentLoaded", function () {
    const modificar = document.getElementById("Modificar");
    const eliminar = document.getElementById("Borrar");
    const id = getIdFromUrl();
    getPet(id);

    modificar.addEventListener("click", function () {
        modificarMascota();
    });
    eliminar.addEventListener("click", function () {
        eliminarMascota();
    })
});

function mostrarMascota(pet) {
    const name = document.getElementById('name');
    const category = document.getElementById('category');
    const photo = document.getElementById('photo');
    const tags = document.getElementById('tags');
    const status = document.getElementById('status');
    name.textContent += ' : ' + pet.name;
    category.textContent += ' : ' + pet.category.name;
    photo.textContent += ' : ' + pet.photoUrls;
    tags.textContent += ' : ' + pet.tags[0].name;
    status.textContent += ' : ' + pet.status;
}
function modificarMascota(id) {

}
function eliminarMascota(id) {
    const element = document.querySelector('.informacionAnimales');
    fetch(`https://petstore.swagger.io/v2/pet/${id}`, { method: 'DELETE' })
        .then(() => element.innerHTML = 'Delete successful')
        .then(() => element.classList += ' whiteLetters');
}

function getPet(id) {
    fetch(`https://petstore.swagger.io/v2/pet/745831`)
        .then((response) => response.json())
        .then(pet => {
            mostrarMascota(pet);
        })
        .catch(error => {
            console.error(error);
        });
}

function getIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('mod');
}