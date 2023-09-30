import { types } from '../admin/content/utilities.js';
import { getCategoriesFromLS, getContentFromLS } from '../utilities.js';

export const loadDetailData = (contentId) => {
  const contentList = getContentFromLS();
  let content = contentList.find((content) => {
    return content.id === contentId;
  });

  if (!content) {
    alert('Error');
  }

  const mainContentVideo = document.getElementById('main-content-video');
  const mainContentTitle = document.getElementById('main-content-title');
  const mainContentDescription = document.getElementById('content-description');
  const mainContentCategory = document.getElementById('content-category');
  const mainContentType = document.getElementById('content-type');

  const videoId = new URL(content.trailer).searchParams.get('v');

  mainContentVideo.src = `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&disablekb=1&rel=0&showinfo=0&modestbranding=1&fs=0&mute=1`;
  mainContentTitle.innerText = content.name;
  mainContentDescription.innerText = content.description;

  const categories = getCategoriesFromLS();
  const categoryName = categories.find((category) => {
    return category.id === content.categoryId;
  }).name;

  mainContentCategory.innerText = categoryName;

  const type = types.find((type) => type.id === content.typeId);
  mainContentType.innerText = type.name;
};
