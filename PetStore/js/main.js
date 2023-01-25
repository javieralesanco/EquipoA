document.addEventListener('DOMContentLoaded', function () {

});
const createPet = (pet) => {
    const abuelo = document.getElementById('main');
    const top = document.createElement('div');
    top.classList.add('card');
    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = checkUrl(pet.photoUrls);
    img.alt = 'Pet';
    top.appendChild(img);

    const divUno = document.createElement('card-body');
    divUno.classList.add('card-body');
    const h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.textContent = pet.name;
    divUno.appendChild(h5);
    const p = document.createElement('p');
    p.classList.add('card-text');
    p.textContent = pet.status;
    divUno.appendChild(p);
    top.appendChild(divUno);

    const ul = document.createElement('ul');
    ul.classList.add('list-group list-group-flush');
    const li = document.createElement('li');
    li.classList.add('llist-group-item');
    li.textContent = pet.category.name;
    ul.appendChild(li);
    top.appendChild(ul);

    const divDos = document.createElement('div');
    divDos.classList.add('card-body');
    const formUno = document.createElement('form');
    formUno.method = 'get';
    formUno.action = 'cambiar';
    const buttonUno = document.createElement('button');
    buttonUno.type = 'submit';
    buttonUno.name = 'ver';
    buttonUno.value = pet.id;
    buttonUno.classList.add('card-link');
    buttonUno.textContent = 'Ver';
    formUno.appendChild(buttonUno);
    divDos.appendChild(formUno);

    const formDos = document.createElement('form');
    formDos.method = 'get';
    formDos.action = 'cambiar';
    const buttonDos = document.createElement('button');
    buttonDos.type = 'submit';
    buttonDos.name = 'mod';
    buttonDos.value = pet.id;
    buttonDos.classList.add('card-link');
    buttonDos.textContent = 'Modificar';
    formDos.appendChild(buttonDos);
    divDos.appendChild(formDos);

    const buttonTres = document.createElement('button');
    buttonDos.type = 'button';
    buttonDos.name = 'delete';
    buttonDos.value = pet.id;
    buttonDos.id = 'generarEliminar';
    buttonDos.classList.add('card-link');
    buttonDos.textContent = 'Eliminar';
    divDos.appendChild(buttonTres);
    top.appendChild(divDos);

    abuelo.appendChild(top);
}
function checkUrl(arrayUrl) {
    arrayUrl.forEach(url => {
        if (tryUrl(url))
            return url;
    });
    url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    if (Math.random() < (1 / 4856))
        url += 'shiny/';
    url += Math.floor(Math.random() * 1008);
    url += '.png';
    return url;
}
// https://pokeapi.co/api/v2/pokemon/{id or name}/
// sprites, front_default,front_shiny
function tryUrl(url) {
    try {
        new URL(miurl);
        return true;
    } catch (err) {
        return false;
    }
}