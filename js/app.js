import {
  contentElementInteractivity,
  createCategorySection,
  getCategoriesFromLS,
  loadFeatured,
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
// 2. Agregar interactividad
// ------------------------------

contentElementInteractivity();
