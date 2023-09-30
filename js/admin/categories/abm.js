import {
  getCategoriesFromLS,
  getContentFromLS,
  setFirstLetterToUpperCase,
} from '../../utilities.js';
import { Category } from './Category.js';
import { loadCategoriesList } from './utilities.js';

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

export const deleteCategory = (categoryId) => {
  const content = getContentFromLS();

  const isThereAnyContentWithThisCategory = content.some(
    (item) => item.categoryId === categoryId
  );

  if(isThereAnyContentWithThisCategory) {
    swal.fire({
      title: 'Error',
      text: 'No se puede eliminar una categoría con contenido cargado',
      icon: 'error',
      confirmButtonText: 'Ok patrón',
    });
    return;
  }

  // 1. Confirmar eliminacion
  swal
    .fire({
      title: '¿Estas seguro?',
      text: 'Esta opcion no será reversible',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
    })
    .then((action) => {
      if (action.isConfirmed) {
        // 2. Traer lista
        const categories = getCategoriesFromLS();

        // 3. Filtrar lista (tambien se puede con splice)
        const filteredList = categories.filter(
          (item) => item.id !== categoryId
        );

        // 4. Actualizamos la lista en LS
        localStorage.setItem('categories', JSON.stringify(filteredList));

        // 5. Mensaje de exito
        swal.fire({
          title: 'Exito',
          text: 'La categoría se eliminó correctamente',
          icon: 'success',
        });

        // 6. Recargar datos en tabla
        loadCategoriesList();
      }
    });
};
