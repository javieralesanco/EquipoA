export default function probarTodo(persona) {
    let errores = [null, null, null, null];
    errores = comprobarNombre(persona.nombre, errores);
    errores = comprobarCorreo(persona.correo, errores);
    errores = comprobarAsunto(persona.asunto, errores);
    errores = comprobarContenido(persona.contenido, errores);
    return errores;
}
function comprobarNombre(nombre, errores) {
    if (!nombre)
        errores[0] = ('El nombre no se ha introducido');
    return errores;
}
function comprobarCorreo(correo, errores) {
    let regexp =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    if (!regexp.test(correo))
        errores[1] = ('El correo introducido no cumple los requisitos');
    return errores;
}
function comprobarAsunto(asunto, errores) {
    if (!asunto)
    errores[2] = ('El asunto no se ha introducido');
return errores;
}
function comprobarContenido(contenido, errores) {
    if (!contenido)
        errores[3] = ('El contenido no se ha introducido');
    return errores;
}
