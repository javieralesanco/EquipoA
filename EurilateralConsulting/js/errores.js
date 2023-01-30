export default function setAllErrores(elementos, errores) {
    for (let i = 0; i < errores.length; i++)
        elementos.item(i).textContent = '';
    for (let i = 0; i < errores.length; i++)
        setError(elementos.item(i), errores[i]);
}
function setError(elemento, error) {
    elemento.appendChild(document.createTextNode(error ?? ''));
}