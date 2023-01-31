window.onload = cronometrar;

function cronometrar() {
  min = 0;
  sec = 0;
  document.getElementById("ms").innerHTML = "00:00";
  escribir();
  id = setInterval(escribir, 1000);
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
