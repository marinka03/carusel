addEventListener("load", (event) => {
  const btns = document.querySelectorAll("[data-carusel-btn]");
  const pauseBtn = document.querySelector(".pause");
  const start = document.querySelector("[data-start]");
  let InfCarusel = null;

  const checkIsPauseBtnTrue = () => {
    if (pauseBtn.dataset.pause === "true") {
      pauseBtn.innerHTML = "&#10148;";
      pauseBtn.dataset.start = true;
      delete pauseBtn.dataset.pause;
    }
  };

  btns.forEach((button) => {
    button.addEventListener("click", () => {
      clearInterval(InfCarusel);
      checkIsPauseBtnTrue();
      const direction = button.dataset.caruselBtn === "right" ? 1 : -1;
      const slides = button
        .closest("[data-carusel]")
        .querySelector("[data-slides]");
      const activeSlide = slides.querySelector("[data-active]");
      const prevSlide = slides.querySelector("[data-prev]");
      const nextSlide = slides.querySelector("[data-next]");

      let newActiveSlide;
      let newPrevSlide;
      let newNextSlide;

      newActiveSlide = [...slides.children].indexOf(activeSlide) + direction;
      newPrevSlide = [...slides.children].indexOf(activeSlide);
      newNextSlide = newActiveSlide + direction;

      if (direction === 1) { //direction-RIGHT
        if (newNextSlide >= slides.children.length) newNextSlide = 0;
        if (
          newActiveSlide >= slides.children.length 
        ) {
          newActiveSlide = 0;
          newNextSlide = newActiveSlide + direction;
          console.log("count active and next", newActiveSlide, newNextSlide);
        }

      } else { //DIRECTION-LEFT
        if (newNextSlide < 0) newNextSlide = slides.children.length - 1;
        if (newActiveSlide < 0) {
          newActiveSlide = slides.children.length - 1;
          newNextSlide = newActiveSlide + direction;
        }
      }



      slides.children[newActiveSlide].dataset.active = true;
      slides.children[newPrevSlide].dataset.prev = true;
      slides.children[newNextSlide].dataset.next = true;
      delete nextSlide.dataset.next;
      delete prevSlide.dataset.prev;
      delete activeSlide.dataset.active;
    });
  });

  function startCarusel() {
    const slides = document.querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    const prevSlide = slides.querySelector("[data-prev]");
    const nextSlide = slides.querySelector("[data-next]");

    let newActiveSlide = [...slides.children].indexOf(activeSlide) + 1;
    let newPrevSlide = [...slides.children].indexOf(activeSlide);
    let newNextSlide = newActiveSlide + 1;

    if (newNextSlide >= slides.children.length) newNextSlide = 0;
    if (
      newActiveSlide >= slides.children.length 
    ) {
      newActiveSlide = 0;
      newNextSlide = newActiveSlide + 1;
    }
    slides.children[newActiveSlide].dataset.active = true;
    slides.children[newPrevSlide].dataset.prev = true;
    slides.children[newNextSlide].dataset.next = true;
    delete nextSlide.dataset.next;
    delete prevSlide.dataset.prev;
    delete activeSlide.dataset.active;

  }

  pauseBtn.addEventListener("click", () => {
    clearInterval(InfCarusel);
    if (pauseBtn.dataset.pause === "true") {
      pauseBtn.innerHTML = "&#10148;";
      pauseBtn.dataset.start = true;
      delete pauseBtn.dataset.pause;
    } else {
      pauseBtn.innerHTML = "&#8741;";
      pauseBtn.dataset.pause = true;
      delete pauseBtn.dataset.start;

      InfCarusel = setInterval(() => {
        startCarusel();
      }, 1000);
    }
  });
  console.dir(pauseBtn.dataset);
  InfCarusel = setInterval(() => {
    startCarusel();
  }, 1000);
});
