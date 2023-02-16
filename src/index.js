import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

import NewsApiService from './api.js';
import Markup from './markup.js';
import LoadMoreBtn from './components/LoadMoreBtn.js';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

const formEl = document.querySelector('#search-form');

console.log(loadMoreBtn);
formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.btn.addEventListener('click', onLoadMoreClick);

function onFormSubmit(evt) {
  evt.preventDefault();
  newsApiService.resetPage();
  Markup.clearMarkup();
  loadMoreBtn.show();
  const searchValue = evt.currentTarget.elements.searchQuery.value.trim();
  newsApiService.searchQuery = searchValue;
  getDataSearchValue();
}

async function getDataSearchValue() {
  loadMoreBtn.disable();
  if (newsApiService.searchQuery) {
    try {
      const foundData = await newsApiService.getData();
      if (foundData.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
        Markup.renderMarkup(foundData.hits);
        loadMoreBtn.enable();
      }
    } catch (err) {
      Notify.failure('Sorry, an error occurred, try again later');
    }
  } else Notify.failure('Enter request.');
}

function onLoadMoreClick(foundData) {
  console.log(foundData.total);
}
