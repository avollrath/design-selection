const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

let scrollPosition = 0;

function openLightbox(image) {
  scrollPosition = window.scrollY;

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;

  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  document.body.style.top = `-${scrollPosition}px`;

  lightboxClose.focus();
}

function closeLightbox() {
  if (lightbox.hidden) {
    return;
  }

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  document.body.style.top = "";
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo({ top: scrollPosition, left: 0, behavior: "auto" });
  document.documentElement.style.scrollBehavior = "";

  lightboxImage.src = "";
  lightboxImage.alt = "";
}

document.querySelectorAll(".work-media img").forEach((image) => {
  image.classList.add("zoomable-image");
  image.tabIndex = 0;

  image.addEventListener("click", () => openLightbox(image));
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightbox.addEventListener("click", (event) => {
  if (
    event.target === lightbox ||
    event.target.hasAttribute("data-lightbox-close")
  ) {
    closeLightbox();
  }
});

lightboxClose.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
