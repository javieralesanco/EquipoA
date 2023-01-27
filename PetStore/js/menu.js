"use strict";
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("menu").addEventListener("click", function (event) {
    //let menu = document.querySelector("menu");
    let navbar = document.querySelector(".navbar");
    //menu.classList.toggle("open");
    //close
    navbar.classList.toggle("open");
  });
});
