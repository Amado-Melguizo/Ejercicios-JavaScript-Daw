let lista = [];

document.querySelectorAll("li").forEach((element) => {
  lista.push(element.innerHTML);
});

function anadirGasto() {
  let listaGastos = document.querySelector("#lista");
  let elemento = document.getElementsByTagName("li");
  
  let gasto = document.getElementById("gasto");
  let liCreado = document.createElement("li");

  liCreado.innerHTML = gasto.value;
  liCreado.setAttribute("onclick", "borrar(this)");

  listaGastos.appendChild(liCreado);

  lista.push(liCreado.innerHTML);
  lista.sort();

  for (let i = 0; i < lista.length; i++) {
    elemento[i].innerHTML = lista[i];
  }
  importe();
}

function borrar(elemento) {
  elemento.remove();
  if (elemento.classList != "rojo") {
    elemento.className = "rojo";
    let importeTotal = parseInt(
      document.getElementById("idImporteTotal").innerHTML
    );
    importeTotal -= parseInt(elemento.innerHTML.split(" : ")[1]);
    document.getElementById("idImporteTotal").innerHTML =
      importeTotal.toString();
  } else {
    elemento.classList.remove("rojo");
    let importeTotal = parseInt(
      document.getElementById("idImporteTotal").innerHTML
    );
    importeTotal += parseInt(elemento.innerHTML.split(" : ")[1]);
    document.getElementById("idImporteTotal").innerHTML =
      importeTotal.toString();
  }
}

function importe() {
  let elementos = document.querySelectorAll("li");
  let importeTotal = 0;

  elementos.forEach((element) => {
    importeTotal += parseInt(element.innerHTML.split(" : ")[1]);
  });
  document.getElementById("idImporteTotal").innerHTML = importeTotal.toString();
}

let contador = 0;
let intervalo;
function iniciar() {
  intervalo = setInterval(contar, 1000);
}

function contar() {
  contador += 1;
  document.getElementById("idContador").innerHTML = contador;
}

function parar() {
  clearInterval(intervalo);
}

function reiniciar() {
  contador = 0;
}

class Persona {
  constructor(nombre, edad) {
    this._nombre = nombre;
    this._edad = edad;
  }
  get nombre() {
    return this._nombre;
  }
  get edad() {
    return this._edad;
  }
  set nombre(valor) {
    this._nombre = valor;
  }
  set edad(valor) {
    this._edad = valor;
  }

  cumpleaños() {
    this._edad += 1;
  }

  toString() {
    return `Tu nombre es : ${this._nombre}, tu edad es ${this._edad}`;
  }
}

let johan = new Persona("Johan", 21);
document.getElementById("idContador").innerHTML = johan.edad;

class Alumno extends Persona {
  constructor(nombre, edad, clase) {
    super(nombre, edad);
    this._clase = clase;
  }
  get clase() {
    return this._clase;
  }
  set clase(valor) {
    this._clase = valor;
  }
  toString() {
    return `${super.toString()}, y tu clase es ${this._clase}`;
  }
}
let alumno1 = new Alumno("Alvaro", 23, "DAW2");

