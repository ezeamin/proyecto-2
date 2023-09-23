import { getCategoriesFromLS } from '../../utilities.js';
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

export const editCategory = (name) => {};

export const deleteCategory = (categoryId) => {};
