export function livenHeader () {
  const clock = document.querySelector('.header__clock span');

  const time = () => clock.textContent = new Date().toLocaleTimeString();

  setInterval(time, 1000);
}