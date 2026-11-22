// sauvegarde des données dans le localStorage
export function saveStorage(key, value) {
  localStorage.setItem(key, value);
}

// récupération des données dans le localStorage
export function getStorage(key) {
  return localStorage.getItem(key);
}

export function initTheme() {
  const checkThemeInput = document.querySelector(".checkbox");
  const elementHtml = document.documentElement;

  function themePreference() {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");

    elementHtml.dataset.theme = preference.matches ? "dark" : "light";
  }

  const savedTheme = getStorage("theme");

  if (savedTheme !== null) {
    elementHtml.dataset.theme = savedTheme;
  } else {
    themePreference();
  }

  if (checkThemeInput) {
    checkThemeInput.checked = elementHtml.dataset.theme === "dark";

    checkThemeInput.addEventListener("change", () => {
      elementHtml.dataset.theme = checkThemeInput.checked ? "dark" : "light";

      saveStorage("theme", elementHtml.dataset.theme);
    });
  }
}

export async function getDatasPixabay(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ! : ${response.status}`);
  }

  return await response.json();
}

export function createCard(media) {
  const gallery = document.querySelector(".gallery");

  if (!gallery) return;

  media.forEach((data) => {
    const galleryImage = document.createElement("div");
    const image = document.createElement("img");
    const iconeContainer = document.createElement("div");
    const likeBtn = document.createElement("button");

    const likeSvg = `
      <svg aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="icone-coeur">

        <path fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0"/>
      </svg>
    `;

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
    likeBtn.type = "button";

    likeBtn.classList.toggle("fill", Boolean(data.isFavorite));

    likeBtn.setAttribute("aria-pressed", Boolean(data.isFavorite));

    likeBtn.setAttribute(
      "aria-label",
      data.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris",
    );

    iconeContainer.append(likeBtn);

    galleryImage.append(image, iconeContainer);

    gallery.append(galleryImage);
  });
}

export function activateFavoriteButtons(
  gallery,
  medias,
  favorites,
  onChange = () => {},
) {
  if (!gallery) return;

  gallery.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-icone");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    const media = medias.find((media) => media.id === id);

    if (!media) return;

    media.isFavorite = !media.isFavorite;

    if (media.isFavorite) {
      favorites.add(media.id);
    } else {
      favorites.delete(media.id);
    }

    btn.classList.toggle("fill", media.isFavorite);

    btn.setAttribute("aria-pressed", media.isFavorite);

    btn.setAttribute(
      "aria-label",
      media.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris",
    );

    saveStorage("favorites", JSON.stringify([...favorites]));

    onChange(media, btn);
  });
}
