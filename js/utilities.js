export const generateRandomId = () => {
  return self.crypto.randomUUID();
};

export const getCategoriesFromLS = () => {
  return JSON.parse(localStorage.getItem('categories')) || [];
};

export const getContentFromLS = () => {
  return JSON.parse(localStorage.getItem('contents')) || [];
};

export const setFirstLetterToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const createContentElement = (content) => {
  const link = document.createElement('a');
  link.classList.add('content-element', 'me-2', 'd-inline-block', 'mb-2');
  link.href = `./pages/detail.html?id=${content.id}`;

  const firstDiv = document.createElement('div');
  firstDiv.classList.add('d-inline-block');

  const img = document.createElement('img');
  img.src = content.cover;
  img.alt = content.name;

  const iframe = document.createElement('iframe');
  const url = new URL(content.trailer);
  const videoId = url.searchParams.get('v');
  iframe.src = `https://www.youtube.com/embed/VIDEO_ID?controls=0&autoplay=1&disablekb=1&rel=0&showinfo=0&modestbranding=1&fs=0`;
  iframe.title = videoId;
  iframe.frameborder = 0;
  iframe.allow = 'autoplay';

  const title = document.createElement('h3');
  title.innerText = content.name;

  firstDiv.appendChild(img);
  firstDiv.appendChild(iframe);
  firstDiv.appendChild(title);

  const secondDiv = document.createElement('div');
  secondDiv.classList.add('content-button');

  const button = document.createElement('button');
  button.innerText = 'Ver más';

  secondDiv.appendChild(button);

  link.appendChild(firstDiv);
  link.appendChild(secondDiv);

  return link;
};

export const createCategorySection = (category) => {
  const content = getContentFromLS();
  const contentSection = document.getElementById('content-section');

  // if no films or series in the same category, return
  const hasContent = content.some((content) => {
    return content.categoryId === category.id && content.isPublished;
  });

  if (!hasContent) return;

  const categorySection = document.createElement('article');

  const title = document.createElement('h2');
  title.innerText = category.name;

  const list = document.createElement('div');
  list.classList.add('d-flex', 'mb-5', 'flex-wrap');

  content.forEach((content) => {
    if (content.categoryId !== category.id) return;
    if (!content.isPublished) return;

    const element = createContentElement(content);
    list.appendChild(element);
  });

  categorySection.appendChild(title);
  categorySection.appendChild(list);

  contentSection.appendChild(categorySection);
};

export const contentElementInteractivity = () => {
  const cards = document.querySelectorAll('.content-element');

  cards.forEach((card) => {
    const iframe = card.querySelector('iframe');

    iframe.addEventListener('mouseenter', () => {
      // find card parent and modify its z-index to 9999
      const parent = iframe.closest('.content-element');
      parent.style.zIndex = 9999;

      const title = iframe.getAttribute('title');
      const src = iframe.getAttribute('src');
      const modifiedSrc = src.replace('VIDEO_ID', title);
      iframe.setAttribute('src', modifiedSrc);
    });

    iframe.addEventListener('mouseleave', () => {
      setTimeout(() => {
        // find card parent and modify its z-index to 9999
        const parent = iframe.closest('.content-element');
        parent.style.zIndex = 0;

        const title = iframe.getAttribute('title');
        const src = iframe.getAttribute('src');
        const modifiedSrc = src.replace(title, 'VIDEO_ID');
        iframe.setAttribute('src', modifiedSrc);
      }, 1200);
    });
  });
};

export const loadFeatured = () => {
  const contentList = getContentFromLS();
  let content = contentList.find((content) => {
    return content.isFeatured;
  });

  if (!content) {
    // traer un contenido aleatorio de la lista
    const randomIndex = Math.floor(Math.random() * contentList.length);
    content = contentList[randomIndex];
  }

  const mainContentVideo = document.getElementById('main-content-video');
  const mainContentTitle = document.getElementById('main-content-title');

  const videoId = new URL(content.trailer).searchParams.get('v');

  mainContentVideo.src = `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&disablekb=1&rel=0&showinfo=0&modestbranding=1&fs=0&mute=1`;
  mainContentTitle.innerText = content.name;
};
