import { setFirstLetterToUpperCase } from '../../utilities.js';
import { Content } from './Content.js';
import { addContentToLS } from './utilities.js';

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

export const deleteContent = (contentId) => {};
