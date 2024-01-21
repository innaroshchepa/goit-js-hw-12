import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const api = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "41856327-3235cf4f5968f0d75f22e6e35",
    language: "en",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  },
});

const searchForm = document.getElementById("search-form");
const imageGallery = document.getElementById("image-gallery");
const loadMoreBtn = document.getElementById("load-more");
const loadMoreSpinner = document.getElementById("spinner");

let lightbox;
let currentPage = 1;
let pageSize = 40;
let currentQuery = "";
let isLastPage = false;
let pageQuntity;

const scrollPage = () => {
  const galleryItem = document.querySelector('.gallery-item');
  const galleryItemHeight = galleryItem.getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}
searchForm.addEventListener('submit', async (event) => {
  
  event.preventDefault();
  const query = new FormData(event.currentTarget).get('query');
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  try {
    toggleSpinner(true);
    const data = await fetchImages();
    pageQuntity = data.totalHits;
    if (currentPage === Math.ceil(pageQuntity / pageSize)) {
      loadMoreBtn.classList.add('is-hidden');
      theEnd();
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
    displayImages(data.hits);
  } catch (error) {
    showError();
  } finally {
    toggleSpinner(false);
  }
});

loadMoreBtn.addEventListener('click', async () => { 
  currentPage += 1;
  console.log(currentPage);
  
  if (currentPage === Math.ceil(pageQuntity / pageSize)) {
    loadMoreBtn.classList.add('is-hidden');
    theEnd();
  } else {
    loadMoreBtn.classList.remove('is-hidden');
    
  }
  await fetchAndDisplayImages();
  scrollPage();
  
});

async function fetchImages() {
  const response = await api.get("", {
    params: {
      q: currentQuery,
      page: currentPage,
      per_page: pageSize,
    },
  });
  return response.data;
}
async function fetchAndDisplayImages() {
  try {
    toggleSpinner(true);
    const data = await fetchImages();
    appendImages(data.hits);
  } catch (error) {
    // theEnd();
    showError();
  } finally {
    toggleSpinner(false);
  }
}

function displayImages(images) {
  if (images.length === 0) {
    loadMoreBtn.classList.add('is-hidden');
    showError();
    return;
    
  }

   loadMoreBtn.classList.remove("is-hidden");
  toggleSpinner(false);

  const imageElements = images.map(createImageElement);
  imageGallery.innerHTML = "";
  imageGallery.append(...imageElements);

  if (currentPage === Math.ceil(pageQuntity / pageSize)) {
    loadMoreBtn.classList.add('is-hidden');
  }
  initializeLightbox();
}

function appendImages(images) {
  if (images.length === 0) {
    isLastPage = true;
    loadMoreBtn.classList.add("is-hidden");
    // toggleLoadMoreBtn(false);
    toggleSpinner(false);
    theEnd();
    return;
  }

  const imageElements = images.map(createImageElement);
  imageGallery.append(...imageElements);
  initializeLightbox();
}

function createImageElement(image) {
  const link = document.createElement("a");
  link.href = image.largeImageURL;
  link.setAttribute("data-lightbox", "image-gallery");
  link.innerHTML = `
    <div class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}">
    </div>
  `;
  return link;
}
function initializeLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

function theEnd() {
  
  iziToast.info({
    title: "Info",
    message: "We're sorry, but you've reached the end of search results",
    position: "topRight",
  });
}

function showError() {
  imageGallery.innerHTML = "";
  iziToast.error({
    title: "Error",
    message: "Sorry, there are no images matching your search query. Please try again!",
    position: "center",
  });
}

function toggleSpinner(show) {
  loadMoreSpinner.classList.toggle("is-hidden", !show);
}