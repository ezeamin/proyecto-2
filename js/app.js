import {
  contentElementInteractivity,
  createCategorySection,
  getCategoriesFromLS,
} from './utilities.js';

// ------------------------------
// 1. Cargar elementos
// ------------------------------

const categories = getCategoriesFromLS();

categories.forEach((category) => {
  createCategorySection(category);
});

// ------------------------------
// 2. Agregar interactividad
// ------------------------------

contentElementInteractivity();
