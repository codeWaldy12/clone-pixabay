import {getStorage, createCard, getDatasPixabay} from "./gallery.js"

const images = await getDatasPixabay('../images.json');
const savedFavorites = getStorage("favorites");
const favorites = new Set(JSON.parse(savedFavorites || "[]"));
const imagesFilter = images.filter((image) => favorites.has(image.id));
createCard(imagesFilter);

const countMedia = document.querySelector(".favoris-count");
let numberMedia = 0;
for(let i = 0; i < imagesFilter.length; i++) {
    numberMedia++
    countMedia.textContent = `${numberMedia} medias`;
}

