import {
  getCategoriesFromLS,
  setFirstLetterToUpperCase,
} from '../../utilities.js';
import { Category } from './Category.js';

export const createCategory = (name) => {
  // 1. Obtener categorias de LS
  const categories = getCategoriesFromLS();

  // 2. Crear categoria (como obj)
  const newCategory = new Category(name);
  categories.push(newCategory);

  // 3. Actualizar categorias en LS
  localStorage.setItem('categories', JSON.stringify(categories));

  // 4. Mensaje de exito
  swal.fire({
    title: 'Categoria guardada!',
    icon: 'success',
    timer: 1500,
    timerProgressBar: false,
    showConfirmButton: false,
  });
};

export const editCategory = (name) => {
  // 1. Traer ID de sessionStorage
  const categoryId = sessionStorage.getItem('categoryId');

  // 2. Obtener categorias de LS
  const categories = getCategoriesFromLS();

  // 3. Buscar categoria por ID
  const categoryIndex = categories.findIndex((item) => item.id === categoryId);

  // 4. Editar categoria
  categories[categoryIndex].name = setFirstLetterToUpperCase(name).trim();

  // 5. Guardar nuevamente en LS
  localStorage.setItem('categories', JSON.stringify(categories));

  // 6. Mensaje de exito
  swal.fire({
    title: 'Categoria editada!',
    icon: 'success',
    timer: 1500,
    timerProgressBar: false,
    showConfirmButton: false,
  });

  // 7. Ocultar warning de edicion
  const editingWarning = document.getElementById('alert-editing');
  editingWarning.classList.add('d-none');

  // 8. Limpiar id del sessionStorage
  sessionStorage.removeItem('categoryId');
};

export const deleteCategory = (categoryId) => {};
