import {
  contentElementInteractivity,
  createCategorySection,
  getCategoriesFromLS,
  getContentFromLS,
  loadFeatured,
  showDefaultMessage,
} from './utilities.js';

// ------------------------------
// 1. Cargar destacada
// ------------------------------

loadFeatured();

// ------------------------------
// 2. Cargar contenido
// ------------------------------

const categories = getCategoriesFromLS();

categories.forEach((category) => {
  createCategorySection(category);
});

// ------------------------------
// 3. Deteccion de contenido
// ------------------------------

const contentList = getContentFromLS();
const isThereNoPublishedContent = contentList.every((content) => {
  return !content.isPublished;
});
if (contentList.length === 0 || isThereNoPublishedContent) {
  showDefaultMessage();
}

// ------------------------------
// 4. Agregar interactividad
// ------------------------------

contentElementInteractivity();
