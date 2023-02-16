import axios from 'axios';
const ENDPOINT = `https://pixabay.com/api`;
const searchParams = new URLSearchParams({
  key: '33670116-4dfcd9849459bc1b79bb05430',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

export default class NewsApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async getData() {
    const URL = `${ENDPOINT}?${searchParams}&q=${this.searchQuery}&pageSize=5&page=${this.page}`;
    const response = await axios.get(URL);
    this.nextPage();
    return response.data;
  }

  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
