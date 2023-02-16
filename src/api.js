import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '33670116-4dfcd9849459bc1b79bb05430',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

function getData(q) {
  searchParams.set('q', `${q}`);
  let URL = `https://pixabay.com/api/?${searchParams}`;

  return axios
    .get(URL)
    .then(({ data }) => {
      let nextPage = Number(searchParams.get('page')) + 1;
      searchParams.set('page', `${nextPage} `);
      return data;
    })
    .catch(eror => console.log(eror));
}
export default { getData };
