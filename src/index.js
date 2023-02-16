import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

import Api from './api';

const formEl = document.querySelector('#search-form');
const cardsContainer = document.querySelector('.gallery');
console.log(cardsContainer);
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  searchValue = evt.currentTarget.elements.searchQuery.value.trim();
  Api.getData(searchValue).then(data => {
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
            <div class="thumb">
            <img src='${webformatURL}' alt="${tags}" loading="lazy" />
             </div>
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
