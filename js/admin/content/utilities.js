import { getCategoriesFromLS, getContentFromLS } from '../../utilities.js';
import { deleteContent } from './abm.js';

export const types = [
  {
    id: 'film',
    name: 'Pelicula',
  },
  {
    id: 'serie',
    name: 'Serie',
  },
];

export const isEditingContent = () => {
  return JSON.parse(sessionStorage.getItem('contentId'));
};

const prepareContentEdition = (contentId) => {};

export const createContentRow = (content) => {
  const contentTable = document.getElementById('content-table');
  const contentTableBody = contentTable.querySelector('tbody');

  const contentRow = document.createElement('tr');

  const coverCell = document.createElement('td');
  const coverImg = document.createElement('img');
  coverImg.src = content.cover;
  coverImg.alt = content.name;
  coverImg.width = 100;
  coverImg.height = 70;
  coverImg.classList.add('admin-table__cover');
  coverCell.appendChild(coverImg);

  const nameCell = document.createElement('td');
  nameCell.innerText = content.name;

  const typeCell = document.createElement('td');
  const typeName = types.find((type) => type.id === content.typeId).name;
  typeCell.innerText = typeName;

  const categoryCell = document.createElement('td');
  const categories = getCategoriesFromLS();
  const categoryName = categories.find(
    (category) => category.id === content.categoryId
  ).name;
  categoryCell.innerText = categoryName;

  const trailerCell = document.createElement('td');
  const trailerLink = document.createElement('a');
  trailerLink.href = content.trailer;
  trailerLink.target = '_blank';
  trailerLink.innerText = 'Ver trailer';
  trailerLink.classList.add('btn', 'btn-light');
  trailerCell.appendChild(trailerLink);

  const descriptionCell = document.createElement('td');
  descriptionCell.innerText = content.description.substring(0, 30) + '...';

  const isPublishedCell = document.createElement('td');
  isPublishedCell.classList.add('text-center');
  const isPublishedIcon = document.createElement('i');
  isPublishedIcon.classList.add(
    'fa-solid',
    content.isPublished ? 'fa-circle-check' : 'fa-circle-minus',
    content.isPublished ? 'text-success' : 'text-warning'
  );
  isPublishedCell.appendChild(isPublishedIcon);

  const actionsCell = document.createElement('td');

  const editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-warning', 'mb-2', 'd-block');
  const editIcon = document.createElement('i');
  editIcon.classList.add('fa-solid', 'fa-pencil');
  editButton.appendChild(editIcon);
  editButton.onclick = () => prepareContentEdition(content.id);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid', 'fa-trash');
  deleteButton.appendChild(deleteIcon);
  deleteButton.onclick = () => deleteContent(content.id);

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);

  contentRow.appendChild(coverCell);
  contentRow.appendChild(nameCell);
  contentRow.appendChild(typeCell);
  contentRow.appendChild(categoryCell);
  contentRow.appendChild(trailerCell);
  contentRow.appendChild(descriptionCell);
  contentRow.appendChild(isPublishedCell);
  contentRow.appendChild(actionsCell);

  contentTableBody.appendChild(contentRow);
};

export const loadContentTable = () => {
  const contentList = getContentFromLS();

  const contentTable = document.getElementById('content-table');
  const contentTableBody = contentTable.querySelector('tbody');
  const noContentTitle = document.getElementById('no-data-title');

  contentTableBody.innerHTML = '';

  if (contentList.length > 0) {
    contentTable.classList.remove('d-none');
    noContentTitle.classList.add('d-none');
  }

  contentList.forEach((content) => {
    createContentRow(content);
  });
};

export const loadCategoriesList = () => {
  const categories = getCategoriesFromLS();
  const categoryInput = document.getElementById('category-select');

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.innerText = category.name;

    categoryInput.appendChild(option);
  });
};

export const addContentToLS = (newContent) => {
  const contentList = getContentFromLS();

  contentList.push(newContent);

  localStorage.setItem('contents', JSON.stringify(contentList));
};
