const cardsContainer = document.querySelector('.gallery');

function markupOneCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
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
}

function renderMarkup(hits) {
  let cards = hits
    .map(hit => {
      return markupOneCard(hit);
    })
    .join('');
  cardsContainer.insertAdjacentHTML('beforeend', cards);
}

function clearMarkup() {
  cardsContainer.innerHTML = ``;
}

export default { renderMarkup, clearMarkup };
