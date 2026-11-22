import {
    getDatasPixabay,
    createCard,
    getStorage,
    initTheme,
    activateFavoriteButtons
} from "./gallery.js";


// Initialisation du thème
initTheme();

// Récupération de tous les médias
const images = await getDatasPixabay("../images.json");

// Récupération des identifiants favoris
const savedFavorites = getStorage("favorites");

const favorites = new Set(
    JSON.parse(savedFavorites || "[]")
);

// Filtrage des médias
const imagesFilter = images.filter((image) => {
    return favorites.has(image.id);
});

// Initialisation de l'état des favoris
imagesFilter.forEach((image) => {
    image.isFavorite = true;
});

// Affichage des favoris
createCard(imagesFilter);

// Récupération de la galerie
const gallery = document.querySelector(".gallery");

// Compteur de favoris
const countMedia = document.querySelector(".favoris-count");

function updateCount() {
    countMedia.textContent = `${imagesFilter.length} médias`;
}

updateCount();

// Gestion des interactions
activateFavoriteButtons(
    gallery,
    imagesFilter,
    favorites,
    (media, btn) => {

        if (!media.isFavorite) {

            // Supprimer la carte de l'affichage
            btn.closest(".gallery-image").remove();

            // Mettre à jour le tableau
            const index = imagesFilter.findIndex(
                image => image.id === media.id
            );

            if (index !== -1) {
                imagesFilter.splice(index, 1);
            }

            // Actualiser le compteur
            updateCount();
        }

    }
);