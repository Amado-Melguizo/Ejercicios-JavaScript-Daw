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
  for (let i = 0; i < formulario.elements.length; i++) {
    formulario.elements[i].className = "";
  }

  // IMPORTANTE!!! Realizar limpieza del formulario, a nivel de Spam de error

  document.querySelectorAll(".errorSpam").forEach((e) => (e.innerHTML = ""));

  // IMPORTANTE!!! Deshabilitamos el botón

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
  return validarNombre() && validarEdad() && validarMatricula();
}
/****************************************************************************
 * FUNCIÓN INDIVIDUALES DE CADA CAMPO
 /***************************************************************************/

function validarNombre() {
  let inputNombre = formulario.elements["idNombre"];

  if (inputNombre.value == "") {
    formulario.elements["idNombre"].className = "error";
    formulario.elements["idNombre"].focus();
    document.getElementById("idNombreError").innerHTML =
      "El campo: " +
      formulario.elements["idNombre"].name +
      " no puede estar en blanco";

    return false;
  }
  return true;
}

/***************************************************************************/
/***************************************************************************/

function validarEdad() {
  let inputEdad = formulario.elements["idEdad"];

  // IMPORTANTE!! Realizar la validación de la edad mediante javascript.

  if (inputEdad.value == "") {
    //Añadir la clase error al elemento
    formulario.elements["idEdad"].className = "error";
    //Para poner el foco en ese elemento y poder editar el error
    formulario.elements["idEdad"].focus();
    document.getElementById("idEdadError").innerHTML =
      "El campo: " +
      formulario.elements["idEdad"].name +
      " no puede estar en blanco";
  } else if (
    formulario.elements["idEdad"].value <= 100 &&
    formulario.elements["idEdad"].value >= 1
  ) {
    //console.log("funciona")
  } else {
    document.getElementById("idEdadError").innerHTML =
      "La edad debe estar entre 1 y 100";
    return false;
  }

  return true;
}

/***************************************************************************/
/***************************************************************************/

function validarMatricula() {
  let inputMatricula = formulario.elements["idMatricula"];

  // IMPORTANTE!! Realizar la validación de la matrícula mediante javascript y utilizando expresiones regulares

  let regExp = /^\d{4}\s[A-Z]{3}$/;

  if (inputMatricula.value == "") {
    formulario.elements["idMatricula"].className = "error";
    formulario.elements["idMatricula"].focus();
    document.getElementById("idMatriculaError").innerHTML =
      "El campo: " +
      formulario.elements["idMatricula"].name +
      " no puede estar en blanco";
  } else if (regExp.test(formulario.elements["idMatricula"].value)) {
    console.log("La matrícula funciona");
  } else {
    document.getElementById("idMatriculaError").innerHTML =
      "La matricula debe estar formada por 4 numeros, un espacio y tres letras";
    return false;
  }

  return true;
}

/********************************************************************************************
 *********************************************************************************************
 ******** FUNCIÓN PARA VALIDAR, MEDIANTE EL USO DE LA API DE ACCESO A LA VALIDACIÓN DE HTML
 *******************************************************************************************
 ********************************************************************************************/

function validarAPIHTML(eventopordefecto) {
  return (
    validarNombre() && validarApellidos() && validarEdad() && validarMatricula()
    // validarProvincia()
  );
}

function validarNombreHTML() {
  let inputNombre = formulario.elements["idNombre"];

  if (inputNombre.validity.valueMissing) {
    inputNombre.className = "error";
    inputNombre.focus();
    inputNombre.setCustomValidity(
      "El campo: " +
        formulario.elements["idNombre"].name +
        " no puede estar en blanco"
    );
    document.getElementById("idNombreError").innerHTML =
      inputNombre.validationMessage;

    return false;
  }
  return true;
}

function validarApellidos() {
  let inputApellidos = formulario.elements["idApellidos"];

  if (
    inputApellidos.checkValidity === false &&
    inputApellidos.validity.valueMissing
  ) {
    formulario.elements["idApellidos"].className = "error";
    formulario.elements["idApellidos"].focus();
    document.getElementById("idApellidosError").innerHTML =
      "El campo: " +
      formulario.elements["idApellidos"].name +
      " no puede estar en blanco";

    return false;
  }
  return true;
}

function validarEdadHTML() {
  let inputEdad = formulario.elements["idEdad"];

  if (inputEdad.validity.valueMissing) {
    inputEdad.className = "error";
    inputEdad.focus();
    inputEdad.setCustomValidity(
      "El campo: " + inputEdad.name + " no puede estar en blanco"
    );
    document.getElementById("idEdadError").innerHTML =
      inputEdad.validationMessage;

    return false;
  } else if (
    inputEdad.validity.rangeOverflow ||
    inputEdad.validity.rangeUnderflow
  ) {
    document.forms["idFormulario"].className = "error";
    document.forms["idFormulario"].focus();
    inputEdad.setCustomValidity("El campo fuera de rango");
    document.getElementById("idEdadError").innerHTML =
      inputEdad.validationMessage;

    return false;
  } else {
    console.log("Para otras restricciones.....");
  }

  return true;
}

function validarMatricula() {
  let inputMatricula = formulario.elements["idMatricula"];

  if (
    inputMatricula.checkValidity === false &&
    inputMatricula.validity.valueMissing
  ) {
    formulario.elements["idMatricula"].className = "error";
    formulario.elements["idMatricula"].focus();
    document.getElementById("idMatriculaError").innerHTML =
      "El campo: " +
      formulario.elements["idMatricula"].name +
      " no puede estar en blanco";
    if (inputMatricula.validity.rangeOverflow) {
    }
    return false;
  }
  return true;
}
// function validarProvincia() {
//   let inputProvincia = formulario.elements["idProvicia"];

//   if (inputProvincia.validity.valueMissing) {
//     formulario.elements["idProvicia"].className = "error";
//     formulario.elements["idProvicia"].focus();
//     document.getElementById("idProviciaError").innerHTML =
//       "El campo: " +
//       formulario.elements["idProvicia"].name +
//       " no puede estar en blanco";

//     return false;
//   }
//   return true;
// }
