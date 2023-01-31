let info = new Map();

info.set("Andalucia", ["Granada", "Almeria", "Cadiz"]);
info.set("Madrid", ["Vallecas", "La elipa", "Retiro"]);
info.set("Galicia", ["La Coruña", "Lugo", "Pontevedra", "Ourense"]);

let formulario = document.forms[0];

info.forEach((v, k) => {
  let opcion = document.createElement("option");
  opcion.setAttribute("value", k);
  opcion.innerHTML = k;
  formulario.elements["id_autonomia"].appendChild(opcion);
});

formulario.elements["id_autonomia"].addEventListener(
  "click",
  dibujarProvincias
);

function dibujarProvincias(e) {
  //funcion borrar
  let selectBorrado = document.querySelectorAll("#id_provincia>option");
  selectBorrado.forEach((e) => e.remove());

  let v = info.get(this.value);
  for (const provincia of v) {
    let opcion = document.createElement("option");
    opcion.setAttribute("value", provincia);
    opcion.innerHTML = provincia;
    formulario.elements["id_provincia"].appendChild(opcion);
  }
}
