import { Slider } from './Slider.js';

let s;
fetch('./src/js/slides.json').then(async (response) => {
  try {
    const data = await response.json();
    s = new Slider(data);
    s.render();
  } catch (e) {
    console.log('Something went wrong!');
    console.error(e);
  }
});

window.addEventListener(
  `resize`,
  () => {
    s.restart();
  },
  false
);
