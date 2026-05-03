const slides = Array.from(document.querySelectorAll(".slide"));
const videos = Array.from(document.querySelectorAll("video"));
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-toggle-menu]");
const soundButton = document.querySelector("[data-sound]");

function goToSlide(name) {
  slides.forEach((slide) => {
    const isActive = slide.dataset.slide === name;
    slide.classList.toggle("active", isActive);
    if (isActive) {
      const video = slide.querySelector("video");
      if (video) {
        video.play().catch(() => {});
      }
    }
  });

  if (menu) {
    menu.classList.remove("open");
  }
  if (menuToggle) {
    menuToggle.textContent = "Menu";
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-go]");
  if (!target) {
    return;
  }

  goToSlide(target.dataset.go);
});

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.textContent = isOpen ? "Close Menu" : "Menu";
  });
}

if (soundButton) {
  soundButton.addEventListener("click", () => {
    const shouldMute = !videos[0].muted;
    videos.forEach((video) => {
      video.muted = shouldMute;
    });
    soundButton.textContent = shouldMute ? "Sound Off" : "Sound On";
  });
}

document.addEventListener("keydown", (event) => {
  const active = document.querySelector(".slide.active");
  if (!active) {
    return;
  }

  if (event.key === "Escape") {
    goToSlide("menu");
  }

  if (event.key === "ArrowRight") {
    const next = active.querySelector(".arrow-next");
    if (next) {
      goToSlide(next.dataset.go);
    }
  }

  if (event.key === "ArrowLeft") {
    const previous = active.querySelector(".arrow-prev");
    if (previous) {
      goToSlide(previous.dataset.go);
    }
  }
});
