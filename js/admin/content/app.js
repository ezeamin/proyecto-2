import {
  validateCategory,
  validateDescription,
  validateName,
  validateType,
  validateURL,
} from '../../validators.js';
import { createContent, editContent } from './abm.js';
import {
  isEditingContent,
  loadCategoriesList,
  loadContentTable,
} from './utilities.js';

// -----------------------------------------
// 1. Proteger ruta
// -----------------------------------------

const isLogged = JSON.parse(sessionStorage.getItem('isLogged'));
if (!isLogged) {
  // No deberia poder ver la página
  window.location.href = './login.html';
}

// -----------------------------------------
// 2. Cargar listado de contenido
// -----------------------------------------

loadContentTable();

// -----------------------------------------
// 3. Cargar categorias en select
// -----------------------------------------

loadCategoriesList();

// -----------------------------------------
// 4. Seleccionar elementos del DOM
// -----------------------------------------

const formContent = document.getElementById('form-content');
const nameInput = document.getElementById('name-input');
const typeInput = document.getElementById('type-select');
const categoryInput = document.getElementById('category-select');
const coverInput = document.getElementById('cover-input');
const trailerInput = document.getElementById('trailer-input');
const descriptionInput = document.getElementById('description-input');
const isPublishedInput = document.getElementById('is-published-input');

// -----------------------------------------
// 5. Blur
// -----------------------------------------

nameInput.addEventListener('blur', () => {
  const value = nameInput.value;

  validateName(value, nameInput);
});

typeInput.addEventListener('blur', () => {
  const value = typeInput.value;

  validateType(value, typeInput);
});

categoryInput.addEventListener('blur', () => {
  const value = categoryInput.value;

  validateCategory(value, categoryInput);
});

coverInput.addEventListener('blur', () => {
  const value = coverInput.value;

  validateURL(value, coverInput);
});

trailerInput.addEventListener('blur', () => {
  const value = trailerInput.value;

  validateURL(value, trailerInput);
});

descriptionInput.addEventListener('blur', () => {
  const value = descriptionInput.value;

  validateDescription(value, descriptionInput);
});

// -----------------------------------------
// 6. Manejar el submit
// -----------------------------------------

formContent.addEventListener('submit', (e) => {
  e.preventDefault();

  // Extraemos los valores
  const name = nameInput.value;
  const type = typeInput.value;
  const category = categoryInput.value;
  const cover = coverInput.value;
  const trailer = trailerInput.value;
  const description = descriptionInput.value;
  const isPublished = isPublishedInput.value;

  // Repetimos validacion por si no se produjo el blur
  if (
    validateName(name, nameInput) &&
    validateType(type, typeInput) &&
    validateCategory(category, categoryInput) &&
    validateURL(cover, coverInput) &&
    validateURL(trailer, trailerInput) &&
    validateDescription(description, descriptionInput)
  ) {
    // Entra SOLAMENTE si TODAS son validas

    if (isEditingContent()) {
      editContent(
        name,
        type,
        category,
        cover,
        trailer,
        description,
        isPublished
      );
    } else {
      createContent(
        name,
        type,
        category,
        cover,
        trailer,
        description,
        isPublished
      );
    }

    console.log(name, type, category, cover, trailer, description, isPublished);

    // Recargar tabla
    loadContentTable();

    // Vaciar campos
    formContent.reset();

    // Resetear clases
    nameInput.classList.remove('is-valid');
    typeInput.classList.remove('is-valid');
    categoryInput.classList.remove('is-valid');
    coverInput.classList.remove('is-valid');
    trailerInput.classList.remove('is-valid');
    descriptionInput.classList.remove('is-valid');
  }
});
