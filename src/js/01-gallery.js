import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryRef = document.querySelector('.gallery');
const imgMarkup = createGallery(galleryItems);
console.log(galleryItems);

function createGallery(img) {
  return img
    .map(
      ({ preview, original, description }) => `<div class="gallery__item">
    <a class="gallery__link" href = "${original}">
    <img class="gallery__image" src = "${preview}" data-source = "${original}" alt = "${description}" >
    </a>
    </div>`
    )
    .join('');
}

galleryRef.insertAdjacentHTML('beforeend', imgMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: 250,
});

// =================================================================================

// function onGalleryImageClick(evt) {
//   evt.preventDefault();

//   if (evt.target.nodeName !== 'IMG') {
//     return;
//   }

//   const instance = basicLightbox.create(
//     `<img src =${evt.target.dataset.source}>`,
//     {
//       onShow: () => {
//         window.addEventListener('keydown', onEscape);
//         console.log('Добавил Слушатель');
//       },
//       onClose: () => {
//         window.removeEventListener('keydown', onEscape);
//         console.log('Удалил Слушатель');
//       },
//     }
//   );

//   function onEscape(evt) {
//     if (evt.key === 'Escape') {
//       instance.close();
//       return;
//     }
//   }

//   instance.show();
// }

// const galleryRef = document.querySelector('.gallery');

// galleryRef.insertAdjacentHTML('beforeend', createGallery(galleryItems));
// galleryRef.addEventListener('click', onGalleryImageClick);

// console.log(galleryItems);
