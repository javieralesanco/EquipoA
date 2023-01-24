document.addEventListener('DOMContentLoaded', function () {

});
const createPet = (pet) => {
    const abuelo = document.getElementById('main');
    const top = document.createElement('div');
    top.classList.add('card');
    const img = document.createElement('img');
    (pet.)
    top.appendChild(img);
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