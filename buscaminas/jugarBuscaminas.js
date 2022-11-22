import {
  generarTableroJs,
  dibujarTableroHtml,
  colocarBombasTableroJS,
  asociarEventClick,
} from "./iniciarBuscaminas.js";

// $config: {
//   let ancho = 9;
//   let alto = 9;
//   let tablero = [];
//   let mitad = (ancho * alto) / 2;
// }

// function calcularNumMinas(y, x, tablero) {
//   if (tablero[y][x] == 1) {
//     document.getElementById("perder").style.display = "block";
//   } else {
//     calcularNumMinas(parseInt(prompt()), parseInt(prompt()), tablero);
//   }
// }

let ancho = 9;
let alto = 9;
let tablero = [];
let mitad = (ancho * alto) / 2;
generarTableroJs(tablero, alto, ancho);
colocarBombasTableroJS(mitad, tablero);
dibujarTableroHtml(alto, ancho, tablero);
asociarEventClick();
// calcularNumMinas(parseInt(prompt()), parseInt(prompt()), tablero);
console.log(tablero);
