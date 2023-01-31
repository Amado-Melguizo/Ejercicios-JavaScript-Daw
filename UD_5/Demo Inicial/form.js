// Al hacer click en el botón de enviar tendrá que llamar a la la función validar
// que se encargará de validar el formulario.
document.getElementById("idEnviar").addEventListener("click", validar, false);
let formulario = document.forms["idFormulario"];

/****************************************************************
 * FUNCIÓN GENERAL DE VALIDACIÓN
 * Unificar los dos tipos de validación
 *          - Mediante JS
 *          - Mediante Api de acceso a validación de html
 ****************************************************************/
function validar(e) {
  // IMPORTANTE!!! Realizar limpieza del formulario, a nivel de ClassName
  //   formulario.getElementByClassName("error").innerHTML = "";
  // IMPORTANTE!!! Realizar limpieza del formulario, a nivel de Span de error
  //   formulario.getElementByClassName("errorSpan").innerHTML = "";
  // IMPORTANTE!!! Deshabilitamos el botón
  this.disabled = true;

  if (
    validarAPIHTML(e) &&
    validarJS(e) &&
    confirm("¿Deseas enviar el formulario?")
  ) {
    return true;
  } else {
    e.preventDefault();
    this.disabled = false;
    return false;
  }
}

/********************************************************************************************
 *******************************************************************************************
 *************** FUNCIÓN PARA VALIDAR DE FORMA MANUAL MEDIANTE JAVASCRIPT
 *******************************************************************************************
 *******************************************************************************************/
function validarJS(eventopordefecto) {
  // Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
  return (
    validarNombre() &&
    validarEdad() &&
    validarCondiciones() &&
    validarOpciones()
  );
}
/****************************************************************************
 * FUNCIÓN INDIVIDUALES DE CADA CAMPO
 /***************************************************************************/
let datos = [];

function validarNombre() {
  let inputNombre = formulario.elements["idNombre"].value;

  if (inputNombre == "") {
    formulario.elements["idNombre"].className = "error";
    formulario.elements["idNombre"].style.borderColor = "red";
    formulario.elements["idNombre"].focus();
    document.getElementById("idNombreError").innerHTML =
      "El campo: " +
      formulario.elements["idNombre"].name +
      " no puede estar en blanco";

    return false;
  }
  datos.push(inputNombre);
  document.getElementById("res").innerHTML = datos;
  return true;
}

/***************************************************************************/
/***************************************************************************/

function validarEdad() {
  let inputEdad = formulario.elements["idDate"].value;
  //   let años = calcularAños(inputEdad);
  if (inputEdad == "") {
    formulario.elements["idDate"].className = "error";
    formulario.elements["idDate"].focus();
    document.getElementById("idDateError").innerHTML =
      "El campo: " +
      formulario.elements["idDate"].name +
      " no puede estar en blanco";
    return false;
  }
  if (inputEdad < 18) {
    formulario.elements["idDate"].className = "error";
    formulario.elements["idDate"].focus();
    document.getElementById("idDateError").innerHTML =
      "El campo: " + formulario.elements["idDate"].name + " no es mayor de 18";
    return false;
  }

  // IMPORTANTE!! Realizar la validación de la edad mediante javascript.

  datos.push(inputEdad);
  document.getElementById("res").innerHTML = datos;
  return true;
}
// function calcularAños() {

//   let fechaNacimiento = formulario.elements["idDate"].value;
//   console.log(fechaNacimiento);

//   var today = new Date();

//   //Restamos los años
//   años = today.getFullYear() - fechaNacimiento;

//   console.log(años);
//   return años;
// }

/***************************************************************************/
/***************************************************************************/

function validarCondiciones() {
  let condicionesCheck = formulario.elements["idCondiciones"].checked;
  if (condicionesCheck == false) {
    formulario.elements["idCondiciones"].className = "error";
    formulario.elements["idNombre"].style.borderColor = "red";
    formulario.elements["idCondiciones"].focus();
    document.getElementById("idCondicionesError").innerHTML =
      "El campo: " +
      formulario.elements["idCondiciones"].name +
      " no esta seleccionado";

    return false;
  }
  datos.push(condicionesCheck);
  document.getElementById("res").innerHTML = datos;
  return true;
}

function validarOpciones() {
  let OpcionesSelect = formulario.elements["idOpcion"];
  if (
    OpcionesSelect.selectedIndex == false ||
    OpcionesSelect.selectedIndex == 0
  ) {
    formulario.elements["idOpcion"].className = "error";
    formulario.elements["idOpcion"].style.borderColor = "red";
    formulario.elements["idOpcion"].focus();
    document.getElementById("idOpcionError").innerHTML =
      "El campo: " +
      formulario.elements["idOpcion"].name +
      " no esta seleccionado";

    return false;
  }
  datos.push(OpcionesSelect.value);
  document.getElementById("res").innerHTML = datos;
  return true;
}

function validarDNI() {
  var numero, let, letra;
  var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

  dni = dni.toUpperCase();

  if (expresion_regular_dni.test(dni) === true) {
    numero = dni.substr(0, dni.length - 1);
    numero = numero.replace("X", 0);
    numero = numero.replace("Y", 1);
    numero = numero.replace("Z", 2);
    let = dni.substr(dni.length - 1, 1);
    numero = numero % 23;
    letra = "TRWAGMYFPDXBNJZSQVHLCKET";
    letra = letra.substring(numero, numero + 1);
    if (letra != let) {
      formulario.elements["idDNI"].className = "error";
      formulario.elements["idDNI"].style.borderColor = "red";
      formulario.elements["idDNI"].focus();
      document.getElementById("idDNIError").innerHTML =
        "El campo: " +
        formulario.elements["idDNI"].name +
        " no puede estar en blanco";
      return false;
    } else {
      datos.push(inputNombre);
      document.getElementById("res").innerHTML = datos;
      return true;
    }
  } else {
    formulario.elements["idDNI"].className = "error";
    formulario.elements["idDNI"].style.borderColor = "red";
    formulario.elements["idDNI"].focus();
    document.getElementById("idDNIError").innerHTML =
      "El campo: " +
      formulario.elements["idDNI"].name +
      " no puede estar en blanco";

    return false;
  }

  if (inputDNI == "") {
  }
}

/********************************************************************************************
 *********************************************************************************************
 ******** FUNCIÓN PARA VALIDAR, MEDIANTE EL USO DE LA API DE ACCESO A LA VALIDACIÓN DE HTML
 *******************************************************************************************
 ********************************************************************************************/

function validarAPIHTML(eventopordefecto) {
  return true;
}
