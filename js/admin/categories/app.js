import { getCategoriesFromLS } from '../../utilities.js';
import { validateName } from '../../validators.js';
import { createCategory, editCategory } from './abm.js';
import { loadCategoriesList } from './utilities.js';

// -----------------------------------------
// 1. Proteger ruta
// -----------------------------------------

const isLogged = JSON.parse(sessionStorage.getItem('isLogged'));
if (!isLogged) {
  // No deberia poder ver la página
  window.location.href = './login.html';
}

// -----------------------------------------
// 2. Cargar listado de categorias
// -----------------------------------------

loadCategoriesList();

// -----------------------------------------
// 3. Seleccionar elementos del DOM
// -----------------------------------------

const formCategories = document.getElementById('form-categories');
const categoriesInput = document.getElementById('category-input');
const credentialsAlert = document.getElementById('alert-categories');

// -----------------------------------------
// 4. Manejar el submit
// -----------------------------------------

formCategories.addEventListener('submit', (e) => {
  // A. Prevenimos comportamiento por defecto
  e.preventDefault();

  // B. Leer valores de los campos
  const category = categoriesInput.value;

  // C. Validar los campos (solo el contenido)
  if (validateName(category, categoriesInput)) {
    // los campos estan OK pero no sabemos aun si son las credenciales

    // i. Resetear las clases
    categoriesInput.classList.remove('is-invalid');

    // ii. Corroboramos que no existe otra categoria con el mismo nombre
    const categories = getCategoriesFromLS();
    const categoryExists = categories.find(
      (item) => item.name.toLowerCase() === category.trim().toLowerCase()
    );

    // La categoria ya existe
    if (categoryExists) {
      credentialsAlert.classList.remove('d-none');
      return;
    }

    // Si está todo bien -----------------------------------------

    // 1. Ocultar alert
    credentialsAlert.classList.add('d-none');

    // 2. Crear categoria (como obj)
    const isEditing = JSON.parse(sessionStorage.getItem('categoryId'));
    if (isEditing) {
      editCategory(category);
    } else {
      createCategory(category);
    }

    // 3. Resetear formulario
    formCategories.reset();

    // 4. Limpiar clases
    categoriesInput.classList.remove('is-valid');

    // 5. Recargar listado
    loadCategoriesList();
  }
});
