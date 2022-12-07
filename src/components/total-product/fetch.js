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

// 상품 상세페이지 정보
export async function getProductDetail(id) {
  const res = await fetch(`${API_URL}products/${id}`, {
    method: 'GET',
    headers: HEADERS,
  });

  const json = await res.json();
  return json;
}
