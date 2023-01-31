window.onload = init;
function init() {
  document.querySelector(".start").addEventListener("click", cronometrar);
  document.querySelector(".stop").addEventListener("click", parar);
  document.querySelector(".reiniciar").addEventListener("click", reiniciar);
  min = 0;
  sec = 0;
  document.getElementById("ms").innerHTML = "00:00:00";
}
function cronometrar() {
  escribir();
  id = setInterval(escribir, 1000);
  document.querySelector(".start").removeEventListener("click", cronometrar);
}

function escribir() {
  var mAux, sAux;
  sec++;
  if (sec > 59) {
    min++;
    sec = 0;
  }

  if (sec < 10) {
    sAux = "0" + sec;
  } else {
    sAux = sec;
  }

  if (min < 10) {
    mAux = "0" + min;
  } else {
    mAux = min;
  }

  document.getElementById("ms").innerHTML = mAux + ":" + sAux;
}
function parar() {
  clearInterval(id);
  document.querySelector(".start").addEventListener("click", cronometrar);
}
function reiniciar() {
  clearInterval(id);
  document.getElementById("ms").innerHTML = "00:00";
  min = 0;
  sec = 0;
  document.querySelector(".start").addEventListener("click", cronometrar);
}
