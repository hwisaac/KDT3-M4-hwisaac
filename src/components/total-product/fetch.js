import { API_URL, HEADERS } from '../../data/API.jsx';

export async function getProducts() {
  const res = await fetch(API_URL + 'products', {
    method: 'GET',
    headers: HEADERS,
  });

  const json = await res.json();
  // console.log('getProducts >> ', json);
  return json;
}
