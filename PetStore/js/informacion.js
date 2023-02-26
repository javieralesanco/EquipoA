'use strict'
import { checker } from "./checker.js";

document.addEventListener("DOMContentLoaded", function () {
    checker();
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
    switch (localStorage.getItem('BD')) {
        case 'Redis':
            fetch(`https://localhost:42069/pet/${id}`, { method: 'DELETE' })
                .then(() => element.innerHTML = 'Delete successful')
                .then(() => element.classList += ' whiteLetters');
            break;
        case 'IndexedDB':
            //TODO
            break;
        case 'SessionStorage':
            const petsS = JSON.parse(sessionStorage.getItem('Pets')) ?? [];
            let newPetsS = [];
            petsS.forEach(element => {
                if (element.id != id) {
                    newPetsS.push(element);
                }
            });
            if (petsS.length != newPetsS.length) {
                sessionStorage.setItem('Pets', JSON.stringify(newPetsS));
                element.innerHTML = 'Delete successful';
                element.classList += ' whiteLetters';
            }
            break;
        case 'LocalStorage':
            const petsL = JSON.parse(localStorage.getItem('Pets')) ?? [];
            let newPetsL = [];
            petsL.forEach(element => {
                if (element.id != id) {
                    newPetsL.push(element);
                }
            });
            if (petsL.length != newPetsL.length) {
                localStorage.setItem('Pets', JSON.stringify(newPetsL));
                element.innerHTML = 'Delete successful';
                element.classList += ' whiteLetters';
            }
            break;
    }
    fetch(`https://petstore.swagger.io/v2/pet/${id}`, { method: 'DELETE' })
        .then(() => element.innerHTML = 'Delete successful')
        .then(() => element.classList += ' whiteLetters');
}

function getPet(id) {
    localStorage.setItem('BD', document.getElementById('BBDD').value);
    switch (localStorage.getItem('BD')) {
        case 'Redis':
            fetch(`https://localhost:42069/pet/${id}`)
                .then((response) => response.json())
                .then(pet => {
                    mostrarMascota(pet);
                })
                .catch(error => {
                    console.error(error);
                });
            break;
        case 'IndexedDB':
            //TODO
            break;
        case 'SessionStorage':
            const petsS = JSON.parse(sessionStorage.getItem('Pets')) ?? [];
            petsS.forEach(element => {
                if (element.id == id) {
                    mostrarMascota(element);
                }
            });
            break;
        case 'LocalStorage':
            const petsL = JSON.parse(localStorage.getItem('Pets')) ?? [];
            petsL.forEach(element => {
                if (element.id == id) {
                    mostrarMascota(element);
                }
            });
            break;
    }
}

function getIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}


async function modificarPet(event) {
    event.preventDefault()

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

    localStorage.setItem('BD', document.getElementById('BBDD').value);
    switch (localStorage.getItem('BD')) {
        case 'Redis':
            await putData('https://localhost:42069/pet', pet);
            break;
        case 'IndexedDB':
            //TODO
            break;
        case 'SessionStorage':
            let petsS = JSON.parse(sessionStorage.getItem('Pets')) ?? [];
            for (let index = 0; index < petsS.length; index++)
                if (petsS[i].id == pet.id)
                    petsS[i] = pet;
            sessionStorage.setItem('Pets', JSON.stringify(petsS));
            break;
        case 'LocalStorage':
            let petsL = JSON.parse(localStorage.getItem('Pets')) ?? [];
            for (let index = 0; index < petsL.length; index++)
                if (petsL[i].id == pet.id)
                    petsL[i] = pet;
            localStorage.setItem('Pets', JSON.stringify(petsL));
            break;
    }
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