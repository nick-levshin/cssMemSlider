export class Slider {
  constructor(slidesJSON) {
    this.slides = slidesJSON;
    this.slider = document.querySelector('.slider');
    this.items = document.querySelector('.slider-items');
    this.dotsInner = document.querySelector('.slider-dots');
  }

  render() {
    this.items.insertAdjacentHTML(
      'afterbegin',
      this.generateSlides(this.slides)
    );

    this.dotsInner.insertAdjacentHTML(
      'afterbegin',
      this.generateDots(this.slides)
    );

    this.dots = document.getElementsByClassName('button');
    this.dots[0].classList.add('active');
    Array.from(this.dots).forEach((dot) => {
      dot.addEventListener('click', (e) => this.changeSlide(e));
    });
  }

  generateSlides(array) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
      result += `
      <div class="slider__item">
        <img class="slider__item-image" src="${array[i].image}" alt="${array[i].description}"/>
        <p class="slider__item-text">${array[i].description}</p>
      </div>
      `;
    }

    return result;
  }

  generateDots(array) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
      result += `<div class="button" id=${i}><div class="button-circle"></div></div>`;
    }

    return result;
  }

  changeSlide(e) {
    const dot = e.target.hasAttribute('id')
      ? e.target
      : e.target.closest('.button');

    if (dot === this.slider.querySelector('.active')) {
      return;
    }

    this.items.style.left =
      -this.slider.offsetWidth * +dot.getAttribute('id') + 'px';

    this.slider.querySelector('.active').classList.remove('active');
    this.dots[+dot.getAttribute('id')].classList.add('active');
  }

  restart() {
    if (this.items.style.left != 0) {
      this.items.style.left = 0;
      this.slider.querySelector('.active').classList.remove('active');
      this.dots[0].classList.add('active');
    }
  }
}
