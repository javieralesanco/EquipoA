export const checker = () => {
    if (localStorage.getItem('BD'))
        return;
    const option = document.createElement('option');
    option.textContent = option.value = localStorage.getItem('BD');
    option.required = true;
    document.getElementById('seleccionada').appendChild(option);
}