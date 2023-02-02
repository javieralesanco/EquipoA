document.addEventListener('DOMContentLoaded', function () {
    llama('available');
    llama('pending');
    llama('sold');
});
const llama = (variable) => {
    fetch(`https://petstore.swagger.io/v2/pet/findByStatus?status=${variable}`)
        .then((response) => response.json())
        .then((objeto) => {
            objeto.forEach(element => {
                createPet(element);
            });
        })
}
const createPet = (pet) => {
    const abuelo = document.getElementById('main');
    const top = document.createElement('div');
    top.classList.add('card', `${pet.status}`);
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
    ul.classList.add('list-group', 'list-group-flush');
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    if (pet.category === undefined)
        return;
    li.textContent = pet.category.name;
    ul.appendChild(li);
    top.appendChild(ul);

    const divDos = document.createElement('div');
    divDos.classList.add('card-body');
    const formUno = document.createElement('form');
    formUno.method = 'get';
    formUno.action = 'informacion.html';
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
    formDos.action = 'informacion.html';
    const buttonDos = document.createElement('button');
    buttonDos.type = 'submit';
    buttonDos.name = 'mod';
    buttonDos.value = pet.id;
    buttonDos.classList.add('card-link');
    buttonDos.textContent = 'Modificar';
    formDos.appendChild(buttonDos);
    divDos.appendChild(formDos);

    const buttonTres = document.createElement('button');
    buttonTres.type = 'button';
    buttonTres.name = 'delete';
    buttonTres.value = pet.id;
    buttonTres.id = 'generarEliminar';
    buttonTres.classList.add('card-link');
    buttonTres.textContent = 'Eliminar';
    divDos.appendChild(buttonTres);
    top.appendChild(divDos);

    abuelo.appendChild(top);
}
function checkUrl(arrayUrl) {
    arrayUrl.forEach(url => {
        if (tryUrl(url))
            return url;
    });
    let url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    if (Math.random() <= (1 / 4856))
        url += 'shiny/';
    url += Math.floor(Math.random() * 906);
    url += '.png';
    return url;
}
function tryUrl(url) {
    try {
        new URL(url);
        if (Regex.IsMatch(url.ToLower(), /"(?:http:\/\/)(.*?)\/(.+?)(?:\/|\?|\#|$|\n)\w*.(jpg|gif|png|jpeg|svg|bmp|dib|ico)"g/g))
            return true;
        return false;
    } catch (err) {
        return false;
    }
}