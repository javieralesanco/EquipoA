export function soloNumeros(event) {
  var code = event ? event.which : event.keyCode;
  if (code == 8 || (code >= 48 && code <= 57)) {
    return;
  }

  event.preventDefault();
}
