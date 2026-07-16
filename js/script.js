const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const playIcon = document.getElementById('playIcon');
const progress = document.getElementById('progress');
const currTime = document.getElementById('currTime');
const durTime = document.getElementById('durTime');

let isPlaying = false;

// Alternar entre Reproducir y Pausar
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playIcon.classList.replace('bi-pause-fill', 'bi-play-fill');
  } else {
    audio.play();
    playIcon.classList.replace('bi-play-fill', 'bi-pause-fill');
  }
  isPlaying = !isPlaying;
}

playBtn.addEventListener('click', togglePlay);

// Actualizar barra de progreso y tiempos
audio.addEventListener('timeupdate', (e) => {
  const { duration, currentTime } = e.srcElement;
  
  // Evitar NaN cuando el audio aún no ha cargado los metadatos
  if (isNaN(duration)) return;
  
  // Actualizar el valor del input range
  const progressPercent = (currentTime / duration) * 100;
  progress.value = progressPercent;
  
  // Actualizar los textos de tiempo
  currTime.innerText = formatTime(currentTime);
  durTime.innerText = formatTime(duration);
});

// Permitir al usuario arrastrar la barra para adelantar/atrasar
progress.addEventListener('input', (e) => {
  const duration = audio.duration;
  // Convertimos el porcentaje del rango de vuelta a segundos
  audio.currentTime = (e.target.value / 100) * duration;
});

// Función de utilidad para formatear los segundos a "M:SS"
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}