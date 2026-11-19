import {getStorage, createCard, getDatasPixabay} from "./gallery.js"

const images = await getDatasPixabay('../images.json');
const savedFavorites = getStorage("favorites");
const favorites = new Set(JSON.parse(savedFavorites || "[]"));
const imagesFilter = images.filter((image) => favorites.has(image.id));
createCard(imagesFilter);


