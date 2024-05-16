addEventListener("load", () => {
    const btns = document.querySelectorAll("[data-carusel-btn]");
    const pauseBtn = document.querySelector(".pause");
    let InfCarusel = null;
  
    const checkIsPauseBtnTrue = () => {
      if (pauseBtn.dataset.pause === "true") {
        pauseBtn.innerHTML = "&#10148;";
        pauseBtn.dataset.start = true;
        delete pauseBtn.dataset.pause;
      }
    };
  
    const updateSlides = (slides, direction) => {
      const slidesArray = [...slides.children];
      const activeIndex = slidesArray.findIndex(slide => slide.hasAttribute('data-active'));
  
      let newActiveIndex = activeIndex + direction;
      if (newActiveIndex >= slidesArray.length) newActiveIndex = 0;
      if (newActiveIndex < 0) newActiveIndex = slidesArray.length - 1;
  
      let newPrevIndex = newActiveIndex - 1;
      if (newPrevIndex >= slidesArray.length) newPrevIndex = 0;
      if (newPrevIndex < 0) newPrevIndex = slidesArray.length - 1;
  
      let newNextIndex = newActiveIndex + 1;
      if (newNextIndex >= slidesArray.length) newNextIndex = 0;
      if (newNextIndex < 0) newNextIndex = slidesArray.length - 1;
  
      // Reset all slides
      slidesArray.forEach(slide => {
        slide.removeAttribute('data-active');
        slide.removeAttribute('data-prev');
        slide.removeAttribute('data-next');
      });
  
      // Set new attributes
      slidesArray[newActiveIndex].setAttribute('data-active', 'true');
      slidesArray[newPrevIndex].setAttribute('data-prev', 'true');
      slidesArray[newNextIndex].setAttribute('data-next', 'true');
    };
  
    btns.forEach((button) => {
      button.addEventListener("click", () => {
        clearInterval(InfCarusel);
        checkIsPauseBtnTrue();
        const direction = button.dataset.caruselBtn === "right" ? 1 : -1;
        const slides = button.closest("[data-carusel]").querySelector("[data-slides]");
        updateSlides(slides, direction);
      });
    });
  
    function startCarusel() {
      const slides = document.querySelector("[data-slides]");
      updateSlides(slides, 1);
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
  
    InfCarusel = setInterval(() => {
      startCarusel();
    }, 1000);
  });