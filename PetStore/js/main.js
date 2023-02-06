document.addEventListener('DOMContentLoaded', function () {

    if (sessionStorage.getItem('sesion') === null) {
        window.location.href = "login.html";
    }

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
    if (pet.category === undefined)
        return;
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
    switch (pet.status) {
        case 'available':
            pet.status = 'Disponible'
            break;
        case 'pending':
            pet.status = 'Reservado'
            break;
        case 'sold':
            pet.status = 'Vendido'
            break;
    }
    p.textContent = `Estado: ${pet.status}`;
    divUno.appendChild(p);
    top.appendChild(divUno);

    // const ul = document.createElement('ul');
    // ul.classList.add('list-group', 'list-group-flush');
    // const li = document.createElement('li');
    // li.classList.add('list-group-item');
    // if (pet.category === undefined)
    //     return;
    // li.textContent = pet.category.name;
    // ul.appendChild(li);
    // top.appendChild(ul);

    const divDos = document.createElement('div');
    divDos.classList.add('card-body');
    const form = document.createElement('form');
    form.method = 'get';
    form.action = 'informacion.html';
    form.classList.add('d-flex', 'justify-content-center', 'align-items-center');
    const button = document.createElement('button');
    button.type = 'submit';
    button.name = 'id';
    button.value = pet.id;
    button.classList.add('card-link');
    button.textContent = 'Mas información';
    form.appendChild(button);
    divDos.appendChild(form);

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
        if (Regex.IsMatch(url.ToLower(), /(?:http:\/\/)(.*?)\/(.+?)(?:\/|\?|\#|$|\n)\w*.(jpg|gif|png|jpeg|svg|bmp|dib|ico)/g))
            return true;
        return false;
    } catch (err) {
        return false;
    }
}