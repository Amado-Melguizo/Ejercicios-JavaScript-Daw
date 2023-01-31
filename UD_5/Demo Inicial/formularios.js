var color_css = "background: #222; color: #bada55";
/**
 * Uso de addEventListener this y Event
 **/

document
  .getElementById("idEnviar")
  .addEventListener("click", mostrarInformacion);

function mostrarInformacion(e) {
  //   let nombre = document.forms["idFormulario"].elements["idNombre"].value;
  //   let op =document.forms["idFormulario"].elements['idNombre'].value
let datos = []

  for (let id = 0; id < 12; id++) {
    let text = document.forms["idFormulario"].elements[id].value;
    
    datos.push(text)

    document.getElementById("res").innerHTML = datos;

    console.log(text);
  }
  //let text = document.getElementById("nombre").value;
  //   document.getElementById("res").innerHTML = nombre;
  //   document.getElementById("res").innerHTML = op;

  e.preventDefault();
  /*
    console.clear()
    console.log(`Usando this : %c${this.value}`,color_css);
    console.log(`Usando Event : %c${e.target.value}`,color_css);
    
    
    e.preventDefault( );*/
}
