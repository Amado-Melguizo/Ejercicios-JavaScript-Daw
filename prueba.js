const celdas = document.querySelectorAll(".cell");
const texto = document.querySelector("#texto1");
const reinicio = document.querySelector("#reiniciar");
const hayGanador = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let opcionesGanadoras = ["", "", "", "", "", "", "", "", ""];
let jugador = "X";
let iniciado = false;

inicializarJuego();

function inicializarJuego(){
    celdas.forEach(celda => celda.addEventListener("click", celdaPulsada));
    reinicio.addEventListener("click", reiniciarJuego);
    texto.textContent = `Jugador ${jugador} es tu turno`;
    iniciado = true;
}ç
function celdaPulsada(){
    const cellIndex = this.getAttribute("cellIndex");

    if(opcionesGanadoras[cellIndex] != "" || !iniciado){
        return;
    }

    actualizarCelda(this, cellIndex);
    comprobarGanador();
}
function actualizarCelda(cell, index){
    opcionesGanadoras[index] = jugador;
    cell.textContent = jugador;
}
function cambioJugador(){
    jugador = (jugador == "X") ? "O" : "X";
    texto.textContent = `Jugador ${jugador} es tu turno`;
}
function comprobarGanador(){
    let rondaGanada = false;

    for(let i = 0; i < hayGanador.length; i++){
        const condicion = hayGanador[i];
        const celdaA = opcionesGanadoras[condicion[0]];
        const celdaB = opcionesGanadoras[condicion[1]];
        const celdaC = opcionesGanadoras[condicion[2]];

        if(celdaA == "" || celdaB == "" || celdaC == ""){
            continue;
        }
        if(celdaA == celdaB && celdaB == celdaC){
            rondaGanada = true;
            break;
        }
    }

    if(rondaGanada){
        texto.textContent = `${jugador} gana`;
        iniciado = false;
    }
    else if(!opcionesGanadoras.includes("")){
        texto.textContent = `Empate`;
        iniciado = false;
    }
    else{
        cambioJugador();
    }
}
function reiniciarJuego(){
    jugador = "X";
    opcionesGanadoras = ["", "", "", "", "", "", "", "", ""];
    texto.textContent = `Jugador ${jugador} es tu turno`;
    celdas.forEach(celda => celda.textContent = "");
    iniciado = true;
}