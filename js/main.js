const checkThemeInput = document.querySelector(".checkbox");
const elmntHtml = document.documentElement;

function saveStorage(key, value) {
  localStorage.setItem(key, value);
}

checkThemeInput.addEventListener("change", () => {
  elmntHtml.setAttribute(
    "data-theme",
    checkThemeInput.checked ? "dark" : "light",
  );
  saveStorage("theme", elmntHtml.dataset.theme);
});

function themePreference() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  if (preference.matches) {
    elmntHtml.dataset.theme = "dark";
    checkThemeInput.checked = true;
  } else {
    elmntHtml.dataset.theme = "light";
    checkThemeInput.checked = false;
  }
}

function getTheme(key) {
  const SavedlastTheme = localStorage.getItem(key);
  if (SavedlastTheme !== null) {
    const themeValue = SavedlastTheme;
    elmntHtml.dataset.theme = themeValue;
    checkThemeInput.checked = themeValue === "dark";
  } else {
    themePreference();
  }
}

getTheme("theme");

let medias = null;

async function getDatasPixabay(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! : ${response.status}`);
  }
  medias = await response.json();
  return medias;
}

async function createStructure() {
  await getDatasPixabay("../images.json");
  const gallery = document.querySelector(".gallery");

  medias.forEach((data) => {
    const galleryImage = document.createElement("div");
    const image = document.createElement("img");
    const iconeContainer = document.createElement("div");
    const likeBtn = document.createElement("button");
    const likeSvg = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icone-coeur">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0"/>
            </svg>`;

    galleryImage.classList.add("gallery-image");
    iconeContainer.classList.add("icone-container", "flex-between");
    likeBtn.classList.add("btn-icone");

    likeBtn.innerHTML = likeSvg;

    image.src = data.url;
    image.width = data.width;
    image.height = data.height;
    image.loading = "lazy";
    image.decoding = "async";
    image.alt = data.alt;

    likeBtn.dataset.id = data.id;
    likeBtn.setAttribute("type", "button");
    likeBtn.setAttribute("aria-pressed", "false");
    likeBtn.setAttribute("aria-label", "like");

    galleryImage.append(image, iconeContainer, likeBtn);
    iconeContainer.append(likeBtn);
    gallery.append(galleryImage);
  });

  gallery.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-icone");
    if (!btn) return;

    const id = +btn.dataset.id;
    const media = medias.find((media) => media.id === id);

    if (!media) return;

    media.isFavorite = !media.isFavorite;

    btn.classList.toggle("fill");
    btn.setAttribute("aria-pressed", media.isFavorite);
  });
}

createStructure();

const btn = document.querySelectorAll(".btn");
btn.forEach((btn) =>
  btn.addEventListener("click", () => {
    const lastBtnActif = document.querySelector("button.actif");
    if (lastBtnActif) {
      lastBtnActif.classList.remove("actif");
    }
    btn.classList.add("actif");
  }),
);