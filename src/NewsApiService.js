import axios from 'axios';
const ENDPOINT = `https://pixabay.com/api`;
const searchParams = new URLSearchParams({
  key: '33670116-4dfcd9849459bc1b79bb05430',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
});

export default class NewsApiService {
  constructor() {
    this.page = 1;
    this.loadCards = 0;
    this.searchQuery = '';
  }

  async getData() {
    let URL = `${ENDPOINT}?${searchParams}&q=${this.searchQuery}&page=${this.page}`;
    const response = await axios.get(URL);
    this.nextPage();
    return response.data;
  }

  nextPage() {
    this.page += 1;
  }
  resetData() {
    this.page = 1;
    this.loadCards = 0;
  }

  addLoadCards(quantityLoadCards) {
    this.loadCards = this.loadCards + quantityLoadCards;
  }
}
