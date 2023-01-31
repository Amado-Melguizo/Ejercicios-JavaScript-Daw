// VARIABLES GLOBALES a UTILIZAR
let nombre_j1, nombre_j2;

let tiradas_j1 = 0;
let tiradas_j2 = 0;

let puntos_j1 = 0;
let puntos_j2 = 0;

let contador_partidas = 0;
let infoPartida = null;

let ganador = null;
let perdedor = null;

function validarInformacionInicial() {
  if (document.getElementById("idInputNombreJ1").value == false) {
    swal("error", "Debes indicar el nombre del Jugador 1!", "error");

    return false;
  }
  if (document.getElementById("idInputNombreJ2").value == false) {
    swal("error", "Debes indicar el nombre del Jugador 2!", "error");

    return false;
  }

  if (document.getElementById("idNumTiradas").value == false) {
    swal("error", "Debes indicar el número de tiradas!", "error");

    return false;
  }

  let tiradas = parseInt(document.getElementById("idNumTiradas").value);
  if (isNaN(tiradas) || (!isNaN(tiradas) && tiradas <= 0)) {
    swal("error", "el número de tiradas debe ser superior a 0!", "error");

    return false;
  }

  return true;
}

function iniciar() {
  if (validarInformacionInicial() == false) {
    return false;
  }

  //Iniciamos contador de partidas
  contador_partidas = contador_partidas + 1;
  ganador = null;
  perdedor = null;
  document.getElementById("idBotonIniciar").setAttribute("disabled", "true");
  document.getElementById("dadoJ1").src = "img/0.png";
  document.getElementById("dadoJ2").src = "img/0.png";
  puntos_j1 = puntos_j2 = 0;

  // Recogida de valores
  nombre_j1 = document.getElementById("idInputNombreJ1").value;
  nombre_j2 = document.getElementById("idInputNombreJ2").value;
  tiradas_j1 = document.getElementById("idNumTiradas").value;
  tiradas_j2 = tiradas_j1;

  document.getElementById("idPuntuacionJ1").innerHTML = "PUNTUACIÓN: - 00 -";
  document.getElementById("idPuntuacionJ2").innerHTML = "PUNTUACIÓN: - 00 -";

  //Empieza el juego!!!
  // Cargar información en el tablero de los jugadores
  document.getElementById("idTablero").classList.remove("ocultar");

  document.getElementById("idNombreJ1").innerHTML = `JUGADOR 1 : ${nombre_j1}`;
  document.getElementById("idNombreJ2").innerHTML = `JUGADOR 2 : ${nombre_j2}`;

  document.getElementById("idBotonTirarJ1").removeAttribute("disabled");
  document.getElementById("idBotonTirarJ2").removeAttribute("disabled");

  document.getElementById("tiradasJ1").innerHTML =
    "TE QUEDAN " + tiradas_j1 + " TIRADAS";
  document.getElementById("tiradasJ2").innerHTML =
    "TE QUEDAN " + tiradas_j2 + " TIRADAS";
}

function tiradaJ1() {
  // Actualizar Dado
  let aleatorio = generarNumeroAleatorio();
  document.getElementById("dadoJ1").src = `img/${aleatorio}.png`;
  puntos_j1 = puntos_j1 + aleatorio;

  //Actualizar puntuación
  document.getElementById(
    "idPuntuacionJ1"
  ).innerHTML = `PUNTUACIÓN: ${puntos_j1}`;

  //Actualizar número de tiradas
  tiradas_j1 = parseInt(tiradas_j1) - 1;
  document.getElementById(
    "tiradasJ1"
  ).innerHTML = `TE QUEDAN ${tiradas_j1} TIRADAS`;

  // Comprobar si existe algún ganador
  comprobarGanador();
}

function tiradaJ2() {
  // Actualizar Dado
  let aleatorio = generarNumeroAleatorio();
  document.getElementById("dadoJ2").src = `img/${aleatorio}.png`;

  //Actualizar puntuación
  puntos_j2 = puntos_j2 + aleatorio;
  document.getElementById(
    "idPuntuacionJ2"
  ).innerHTML = `PUNTUACIÓN: ${puntos_j2}`;

  //Actualizar número de tiradas
  tiradas_j2 = tiradas_j2 - 1;
  document.getElementById(
    "tiradasJ2"
  ).innerHTML = `TE QUEDAN ${tiradas_j2} TIRADAS`;

  // Comprobar si existe algún ganador
  comprobarGanador();
}

function comprobarGanador() {
  if (tiradas_j1 == 0) {
    // ¿Ha terminado jugador 1?
    document.getElementById("idBotonTirarJ1").setAttribute("disabled", "true");
  }

  if (tiradas_j2 == 0) {
    // ¿Ha terminado jugador 2?
    document.getElementById("idBotonTirarJ2").setAttribute("disabled", "true");
  }

  if (tiradas_j2 == 0 && tiradas_j1 == 0) {
    // ¿Han terminado ambos jugadores?
    document.getElementById("idBotonIniciar").removeAttribute("disabled");
    if (puntos_j1 > puntos_j2) {
      swal(
        "Victoria",
        `Partida Finalizada, ¡¡¡ Vencedor ${nombre_j1} !!!`,
        "success"
      );

      ganador = nombre_j1;
      perdedor = nombre_j2;
    } else if (puntos_j1 < puntos_j2) {
      swal(
        "Victoria",
        `Partida Finalizada, ¡¡¡ Vencedor ${nombre_j2} !!!`,
        "success"
      );

      ganador = nombre_j2;
      perdedor = nombre_j1;
    } else {
      swal("Empate", `Partida Finalizada, ¡¡¡ EMPATE !!!`, "success");
    }

    document.getElementById("idBotonIniciar").removeAttribute("disabled");

    anadirJugadores();
    listaJugadores();
  }

  ////
  //// UBICACIÓN MUY MUY IMPORTANTE!!!!!1
  ////
}

/********************************************************
 *  APARTADO 1 : Implementar reloj del juego
 *******************************************************/

setInterval(reloj, 1000);

function reloj() {
  let tiempoHora = new Date().getHours();
  let tiempoMin = new Date().getMinutes();
  let tiempoSec = new Date().getSeconds();

  document.getElementById(
    "idReloj"
  ).innerHTML = `${tiempoHora} : ${tiempoMin} : ${tiempoSec}`;
}

/********************************************************
 *  APARTADO 2 : Definir función para número aleatorio.
 *******************************************************/

function generarNumeroAleatorio() {
  // hacer un return con un valor entero aleatorio entre el 1 y el 6
  let numero = Math.ceil(6 * Math.random());
  return numero;
}

/*************************************************************
 *  APARTADO 3 : Gestión de jugadores
 *************************************************************/
let lista = new Set();

function anadirJugadores() {
  lista.add(nombre_j1);
  lista.add(nombre_j2);
  // añadir los jugadores al cuadrado

  let recuadro = document.getElementById("idNombreJugadores");

  recuadro.innerHTML = "";

  lista.forEach((element) => {
    recuadro.innerHTML += element + " ";
  });
}

/*************************************************************
 *  APARTADO 4 : Definir Clase partida
 *************************************************************/

class Partida {
  constructor(
    numero_partida,
    nombre_j1,
    nombre_j2,
    puntos_j1,
    puntos_j2,
    nombre_ganador,
    nombre_perdedor
  ) {
    this._numero_partida = numero_partida;
    this._nombre_j1 = nombre_j1;
    this._nombre_j2 = nombre_j2;
    this._puntos_j1 = puntos_j1;
    this._puntos_j2 = puntos_j2;
    this._nombre_ganador = nombre_ganador;
    this._nombre_perdedor = nombre_perdedor;
  }

  get puntos_j1() {
    return this._puntos_j1;
  }

  set puntos_j1(valor) {
    this._puntos_j1 = valor;
  }

  get puntos_j2() {
    return this._puntos_j2;
  }

  set puntos_j2(valor) {
    this._puntos_j2 = valor;
  }

  valueOf() {
    return parseInt(this._puntos_j1);
  }

  toString() {
    return `el nombre ${this._nombre_j1} tiene ${this._puntos_j1}`;
  }

  ///////////////////////////////////////////////////////
}
let resultado = new Partida("amado");

/********************************************************
 *  APARTADO 5 : Gestión de resultados
 *******************************************************/

function listaJugadores() {
  let listaJug = document.getElementById("idEstadisticas");

  let tr = document.createElement("tr");
  let tdResultado = document.createElement("td");
  tdResultado.innerHTML = puntos_j1 + "-" + puntos_j2;
  let tdGanador = document.createElement("td");
  tdGanador.innerHTML = ganador;
  let tdPerdedor = document.createElement("td");
  tdPerdedor.innerHTML = perdedor;

  tr.appendChild(tdResultado);
  tr.appendChild(tdGanador);
  tr.appendChild(tdPerdedor);
  listaJug.appendChild(tr);
}
