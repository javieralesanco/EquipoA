"use strict";
import { soloNumeros } from "./validador.js";

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("telefono")
    .addEventListener("keypress", function (event) {
      soloNumeros(event);
    });
});
