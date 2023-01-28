"use strict";

let menu = document.getElementById("menu");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  navbar.classList.toggle("open");
  if (menu.textContent == "close") {
    menu.textContent = "menu";
  } else {
    menu.textContent = "close";
  }
};
