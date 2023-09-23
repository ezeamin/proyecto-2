import {
  getContentFromLS,
  setFirstLetterToUpperCase,
} from '../../utilities.js';
import { Content } from './Content.js';
import { addContentToLS, loadContentTable } from './utilities.js';

export const createContent = (
  name,
  type,
  category,
  cover,
  trailer,
  description,
  isPublished
) => {
  const newContent = new Content(
    name,
    type,
    category,
    cover,
    trailer,
    description,
    isPublished
  );

  addContentToLS(newContent);

  swal.fire({
    title: 'Exito',
    text: `${setFirstLetterToUpperCase(type)} agregada exitosamente`,
    icon: 'success',
    timer: 1500,
    timerProgressBar: false,
    showConfirmButton: false,
  });
};

export const editContent = (
  name,
  type,
  category,
  cover,
  trailer,
  description,
  isPublished
) => {};

export const deleteContent = (contentId) => {
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
        const content = getContentFromLS();

        // 3. Filtrar lista (tambien se puede con splice)
        const filteredList = content.filter((item) => item.id !== contentId);

        // 4. Actualizamos la lista en LS
        localStorage.setItem('contents', JSON.stringify(filteredList));

        // 5. Mensaje de exito
        swal.fire({
          title: 'Exito',
          text: 'El contenido se eliminó correctamente',
          icon: 'success',
        });

        // 6. Recargar datos en tabla
        loadContentTable();
      }
    });
};
