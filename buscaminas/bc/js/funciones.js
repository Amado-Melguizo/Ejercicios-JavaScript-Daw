const buscaminas = {
  numMinasTotales: 30,
  numMinasEncontradas: 0,
  TAM_MAX: 15,
  CampoMinas: [],
};

function pintarTablero() {
  //seleccionamos el objeto tablero
  let tablero = document.getElementById("idTablero");

  //actualizamos las variables CSS con las variables JavaScript
  document
    .querySelector("html")
    .style.setProperty("--num-filas", buscaminas.TAM_MAX);
  document
    .querySelector("html")
    .style.setProperty("--num-columnas", buscaminas.TAM_MAX);

  //creamos las casillas que necesitemos
  for (let f = 0; f < buscaminas.TAM_MAX; f++) {
    for (let c = 0; c < buscaminas.TAM_MAX; c++) {
      let newDiv = document.createElement("div");
      newDiv.id = "f" + f + "_c" + c;
      newDiv.dataset.fila = f;
      newDiv.dataset.columna = c;
      newDiv.addEventListener("contextmenu", ponerBandera); //evento con el botón derecho del raton
      newDiv.addEventListener("click", destapar); //evento con el botón izquierdo del raton

      tablero.appendChild(newDiv);
    }
  }
}

function asociarEventClick() {
  let celdas = document.querySelectorAll('td[id^="idCelda"]');

  celdas.forEach((e) => e.addEventListener("click", mostrarCoordenadas));

  celdas.forEach((e) => e.addEventListener("contextmenu", colocarbandera));
}

function generarCampoMinasVacio() {
  //generamos el campo de minas
  buscaminas.CampoMinas = new Array(buscaminas.TAM_MAX);
  for (let fila = 0; fila < buscaminas.TAM_MAX; fila++) {
    buscaminas.CampoMinas[fila] = new Array(buscaminas.TAM_MAX);
  }
}

let numeroAletorio = () => {
  return Math.floor(Math.random() * buscaminas.TAM_MAX);
};

function esparcirMinas() {
  //repartimos de forma aleatoria las minas
  let numMinasEsparcidas = 0;

  while (numMinasEsparcidas < buscaminas.numMinasTotales) {
    //numero aleatorio en el intervalo [0,TAM_MAX-1]
    let fila = numeroAletorio();

    //numero aleatorio en el intervalo [0,TAM_MAX-1]
    let columna = numeroAletorio();

    //si no hay bomba en esa posicion
    if (buscaminas.CampoMinas[fila][columna] != "B") {
      //la ponemos
      buscaminas.CampoMinas[fila][columna] = "B";

      //y sumamos 1 a las bombas esparcidas
      numMinasEsparcidas++;
    }
  }
}

function contarMinasAlrededorCasilla(fila, columna) {
  let numeroMinasAlrededor = 0;

  //de la fila anterior a la posterior
  for (let zFila = fila - 1; zFila <= fila + 1; zFila++) {
    //de la columna anterior a la posterior
    for (let zColumna = columna - 1; zColumna <= columna + 1; zColumna++) {
      //si la casilla cae dentro del tablero
      if (
        zFila > -1 &&
        zFila < buscaminas.TAM_MAX &&
        zColumna > -1 &&
        zColumna < buscaminas.TAM_MAX
      ) {
        //miramos si en esa posición hay bomba
        if (buscaminas.CampoMinas[zFila][zColumna] == "B") {
          //y sumamos 1 al numero de minas que hay alrededor de esa casilla
          numeroMinasAlrededor++;
        }
      }
    }
  }

  //y guardamos cuantas minas hay en esa posicion
  buscaminas.CampoMinas[fila][columna] = numeroMinasAlrededor;
}

function contarMinas() {
  //contamos cuantas minas hay alrededor de cada casilla
  for (let fila = 0; fila < buscaminas.TAM_MAX; fila++) {
    for (let columna = 0; columna < buscaminas.TAM_MAX; columna++) {
      //solo contamos si es distinto de bomba
      if (buscaminas.CampoMinas[fila][columna] != "B") {
        contarMinasAlrededorCasilla(fila, columna);
      }
    }
  }
}

function ponerBandera(miEvento) {
  if (miEvento.type === "contextmenu") {
    console.log(miEvento);

    //obtenemos el elemento que ha disparado el evento
    let casilla = miEvento.currentTarget;

    //detenemos el burbujeo del evento y su accion por defecto
    miEvento.stopPropagation();
    miEvento.preventDefault();

    //obtenemos la fila de las propiedades dataset.
    //como es un string hay que convertirlo a numero
    let fila = parseInt(casilla.dataset.fila, 10);
    let columna = parseInt(casilla.dataset.columna, 10);

    if (
      fila >= 0 &&
      columna >= 0 &&
      fila < buscaminas.TAM_MAX &&
      columna < buscaminas.TAM_MAX
    ) {
      //si esta marcada como "bandera"
      if (casilla.classList.contains("icon-bandera")) {
        //la quitamos
        casilla.classList.remove("icon-bandera");
        //y al numero de minas encontradas le restamos 1
        buscaminas.numMinasEncontradas--;
      } else if (casilla.classList.length == 0) {
        //si no está marcada la marcamos como "bandera"
        casilla.classList.add("icon-bandera");
        //y sumamos 1 al numero de minas encontradas
        buscaminas.numMinasEncontradas++;
        //si es igual al numero de minas totales resolvemos el tablero para ver si esta bien
        if (buscaminas.numMinasEncontradas == buscaminas.numMinasTotales) {
          resolverTablero(true);
        }
      }

      actualizarNumMinasRestantes();
    }
  }
}

function destapar(miEvento) {
  if (miEvento.type === "click") {
    let casilla = miEvento.currentTarget;
    let fila = parseInt(casilla.dataset.fila, 10);
    let columna = parseInt(casilla.dataset.columna, 10);

    destaparCasilla(fila, columna);
  }
}

function destaparCasilla(fila, columna) {
  //si la casilla esta dentro del tablero
  if (
    fila > -1 &&
    fila < buscaminas.TAM_MAX &&
    columna > -1 &&
    columna < buscaminas.TAM_MAX
  ) {
    console.log(
      "destapamos la casilla con fila " + fila + " y columna " + columna
    );

    //obtenermos la casilla con la fila y columna
    let casilla = document.querySelector("#f" + fila + "_c" + columna);

    //si la casilla no esta destapada
    if (!casilla.classList.contains("destapado")) {
      //si no esta marcada como "bandera"
      if (!casilla.classList.contains("icon-bandera")) {
        //la destapamos
        casilla.classList.add("destapado");

        //ponemos en la casilla el número de minas que tiene alrededor
        casilla.innerHTML = buscaminas.CampoMinas[fila][columna];

        //ponemos el estilo del numero de minas que tiene alrededor (cada uno es de un color)
        casilla.classList.add("c" + buscaminas.CampoMinas[fila][columna]);

        //si no es bomba
        if (buscaminas.CampoMinas[fila][columna] !== "B") {
          // y tiene 0 minas alrededor, destapamos las casillas contiguas
          if (buscaminas.CampoMinas[fila][columna] == 0) {
            destaparCasilla(fila - 1, columna - 1);
            destaparCasilla(fila - 1, columna);
            destaparCasilla(fila - 1, columna + 1);
            destaparCasilla(fila, columna - 1);
            destaparCasilla(fila, columna + 1);
            destaparCasilla(fila + 1, columna - 1);
            destaparCasilla(fila + 1, columna);
            destaparCasilla(fila + 1, columna + 1);

            //y borramos el 0 poniendo la cadena vacía
            casilla.innerHTML = "";
          }
        } else if (buscaminas.CampoMinas[fila][columna] == "B") {
          // si por el contrario hay bomba quitamos la B
          casilla.innerHTML = "";

          //añadimos el estilo de que hay bomba
          casilla.classList.add("icon-bomba");

          // y que se nos ha olvidado ponerBanderala
          casilla.classList.add("sinponerBandera");

          // y resolvemos el tablero indicando (false), que hemos cometido un fallo
          //   resolverTablero(false);
        }
      }
    }
  }
}

function resolverTablero(isOK) {
  let aCasillas = tablero.children;
  for (let i = 0; i < aCasillas.length; i++) {
    //quitamos los listeners de los eventos a las casillas
    aCasillas[i].removeEventListener("click", destapar);
    aCasillas[i].removeEventListener("contextmenu", ponerBandera);
    let fila = parseInt(aCasillas[i].dataset.fila, 10);
    let columna = parseInt(aCasillas[i].dataset.columna, 10);
    if (aCasillas[i].classList.contains("icon-bandera")) {
      if (buscaminas.CampoMinas[fila][columna] == "B") {
        //bandera correcta
        aCasillas[i].classList.add("destapado");
        aCasillas[i].classList.remove("icon-bandera");
        aCasillas[i].classList.add("icon-bomba");
      } else {
        //bandera erronea
        aCasillas[i].classList.add("destapado");
        aCasillas[i].classList.add("banderaErronea");
        isOK = false;
      }
    } else if (!aCasillas[i].classList.contains("destapado")) {
      if (buscaminas.CampoMinas[fila][columna] == "B") {
        //destapamos el resto de las bombas
        aCasillas[i].classList.add("destapado");
        aCasillas[i].classList.add("icon-bomba");
      }
    }
  }

  if (isOK) {
    alert("¡¡¡Enhorabuena!!!");
  }
}

function actualizarNumMinasRestantes() {
  document.getElementById("banderas").innerHTML =
    buscaminas.numMinasTotales - buscaminas.numMinasEncontradas;
}

function inicio() {
  buscaminas.TAM_MAX = 10;
  buscaminas.numMinasTotales = 12;
  pintarTablero();
  generarCampoMinasVacio();
  esparcirMinas();
  contarMinas();
  actualizarNumMinasRestantes();
}

window.onload = inicio;
