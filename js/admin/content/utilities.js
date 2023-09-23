import { getCategoriesFromLS, getContentFromLS } from "../../utilities.js";

export const isEditingContent = () => {
  return JSON.parse(sessionStorage.getItem('contentId'));
};

export const loadContentTable = () => {};

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
}