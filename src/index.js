import { Notify } from 'notiflix/build/notiflix-notify-aio';

import NewsApiService from './NewsApiService.js';
import Markup from './markup.js';
import LoadMoreBtn from './components/LoadMoreBtn.js';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

console.log(loadMoreBtn.btn);
const formEl = document.querySelector('#search-form');

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.btn.addEventListener('click', onLoadMoreClick);

function onFormSubmit(evt) {
  evt.preventDefault();
  newsApiService.resetData();
  Markup.clearMarkup();
  loadMoreBtn.show();
  const searchValue = evt.currentTarget.elements.searchQuery.value.trim();
  newsApiService.searchQuery = searchValue;
  getDataSearchValue();
}

async function getDataSearchValue() {
  loadMoreBtn.disable();
  console.log(loadMoreBtn.btnSpiner);
  if (newsApiService.searchQuery === '') {
    Notify.failure('Enter request.');
  } else {
    try {
      const foundData = await newsApiService.getData();
      if (foundData.total === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
        Markup.renderMarkup(foundData.hits);
        newsApiService.addLoadCards(foundData.hits.length);
        loadMoreBtn.enable();
      }
    } catch (err) {
      Notify.failure('Sorry, an error occurred, try again later');
    }
  }
}

async function onLoadMoreClick() {
  loadMoreBtn.disable();
  try {
    const foundData = await newsApiService.getData();
    let diffHit = foundData.totalHits - newsApiService.loadCards;
    if (foundData.totalHits >= newsApiService.loadCards) {
      Markup.renderMarkup(foundData.hits);
      newsApiService.addLoadCards(foundData.hits.length);
      loadMoreBtn.enable();
    }
    if (diffHit <= 40) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
    }
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}
