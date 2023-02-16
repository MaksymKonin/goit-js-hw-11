import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

import Api from './api';

const formEl = document.querySelector('#search-form');
const cardsContainer = document.querySelector('.gallery');
console.log(cardsContainer);
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  search = evt.currentTarget.elements.searchQuery.value;
  Api.getData(search).then(data => {
    console.log(data);
    renderMarkup(data.hits);
  });
}
// 'tiger-white';
function markupOneCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const photoCard = `<div class="photo-card">
            <img src='${webformatURL}' alt="${tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b> <br> ${likes}
                </p>
                <p class="info-item">
                  <b>Views</b> <br> ${views}
                </p>
                <p class="info-item">
                  <b>Comments</b> <br> ${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b> <br> ${downloads}
                </p>
              </div>
            </div>`;

  return photoCard;
}

function renderMarkup(hits) {
  let cards = hits
    .map(hit => {
      return markupOneCard(hit);
    })
    .join('');
  cardsContainer.insertAdjacentHTML('beforeend', cards);
}
