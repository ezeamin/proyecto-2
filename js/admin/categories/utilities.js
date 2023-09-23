import { getCategoriesFromLS } from '../../utilities.js';
import { deleteCategory } from './abm.js';

const prepareEdition = (name, id) => {
  const categoryInput = document.getElementById('category-input');
  const editingWarning = document.getElementById('alert-editing');
  const editingSpan = document.getElementById('category-being-edited');
  const cancelButton = document.getElementById('cancel-edition-button');

  categoryInput.value = name;
  categoryInput.focus();

  sessionStorage.setItem('categoryId', id);

  editingWarning.classList.remove('d-none');
  editingSpan.innerText = name;

  cancelButton.onclick = () => {
    sessionStorage.removeItem('categoryId');
    editingWarning.classList.add('d-none');
    categoryInput.value = '';
  };
};

export const createCategoryCard = (category) => {
  const sectionCategories = document.getElementById('categories-list-section');

  const article = document.createElement('article');
  article.classList.add('col-12', 'col-md-4', 'col-lg-3');

  const card = document.createElement('div');
  card.classList.add('card', 'mb-2', 'w-100');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer', 'justify-content-end', 'd-flex');

  const h3 = document.createElement('h3');
  h3.innerText = category.name;
  h3.classList.add('mb-0');

  const editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-warning', 'me-2');
  editButton.innerText = 'Editar';
  editButton.onclick = () => prepareEdition(category.name, category.id);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.innerText = 'Eliminar';
  deleteButton.onclick = () => deleteCategory(category.id);

  cardBody.appendChild(h3);
  cardFooter.appendChild(editButton);
  cardFooter.appendChild(deleteButton);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  article.appendChild(card);
  sectionCategories.appendChild(article);
};

export const loadCategoriesList = () => {
  // 1. Obtener categorias de LS
  const categories = getCategoriesFromLS();

  // 2. Limpiar lista de categorias
  const sectionCategories = document.getElementById('categories-list-section');
  sectionCategories.innerHTML = '';

  // 3. Generar HTML
  categories.forEach((category) => {
    createCategoryCard(category);
  });
};
