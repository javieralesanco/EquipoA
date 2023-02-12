'use strict'

document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem('sesion') === null) {
        window.location.href = "login.html";
    }

    const form = document.querySelector('#form')
    const eliminar = document.getElementById("Borrar");
    const id = getIdFromUrl();
    getPet(id);

    form.addEventListener('submit', async (event) => {
        modificarPet(event);
    }, false);

    eliminar.addEventListener("click", function () {
        eliminarMascota(id);
    })
});

function mostrarMascota(pet) {

    const name = document.getElementById('namepet');
    const category = document.getElementById('categorypet');
    const photo = document.getElementById('fotopet');
    const tags = document.getElementById('tagpet');
    const status = document.getElementById('statuspet');

    name.value = pet.name ?? '';
    if (pet.category === undefined)
        category.value = '';
    else
        category.value = pet.category.name ?? '';
    photo.value = pet.photoUrls ?? '';

    if (pet.tags === undefined)
        tags.value = '';
    else
        tags.value = pet.tags[0].name ?? '';

    status.value = pet.status ?? '';
}

function eliminarMascota(id) {
    const element = document.querySelector('.informacionAnimales');
    fetch(`https://petstore.swagger.io/v2/pet/${id}`, { method: 'DELETE' })
        .then(() => element.innerHTML = 'Delete successful')
        .then(() => element.classList += ' whiteLetters');
}

function getPet(id) {
    fetch(`https://petstore.swagger.io/v2/pet/${id}`)
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
    return urlParams.get('id');
}


async function modificarPet(event) {
    event.preventDefault()
    event.stopPropagation()

    if (!form.checkValidity()) {
        return;
    }
    const categoria = document.querySelector("#categorypet").value;
    const dogName = document.querySelector("#namepet").value;
    const tags = document.querySelector('#tagpet').value;
    const status = document.querySelector('#statuspet').value;
    const fotopet = document.querySelector('#fotopet').value;
    const idpet = getIdFromUrl();

    const pet = {
        id: idpet,
        category: {
            id: 0,
            name: categoria
        },
        name: dogName,
        photoUrls: [
            fotopet
        ],
        tags: [
            {
                name: tags
            }
        ],
        status: status
    };
    await putData('https://petstore.swagger.io/v2/pet', pet);
}

async function putData(url = '', data = {}) {
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(error => {
        {
            new bootstrap.Modal(document.getElementById('exampleModal')).show();
            console.log(error)
        }
    })
        .then(response => response.json());
}