import {
    initTheme,
    getStorage,
    getDatasPixabay,
    createCard,
    activateFavoriteButtons,
} from "./gallery.js";

initTheme();

const medias = await getDatasPixabay("../images.json");

const savedFavorites = getStorage("favorites");

const favorites = new Set(JSON.parse(savedFavorites || "[]"));

medias.forEach((media) => {
    media.isFavorite = favorites.has(media.id);
});

createCard(medias);

const gallery = document.querySelector(".gallery");

activateFavoriteButtons(gallery, medias, favorites);

const btn = document.querySelectorAll(".btn");

btn.forEach((button) => {
    button.addEventListener("click", () => {
    const lastBtnActif = document.querySelector("button.actif");

    if (lastBtnActif) {
        lastBtnActif.classList.remove("actif");
    }

    button.classList.add("actif");
    });
});
