export const authUrl = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth';

export const HEADERS_USER = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202209',
  username: 'KDT3_TEAM-4',
};

export const HEADERS = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202209',
  username: 'KDT3_TEAM-4',
  masterKey: 'true',
};

export const API_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/';
export const ACCOUNT_URL = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/account`;

// 함수들
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
export async function getCategorizedProducts(searchText, searchTags) {
  const res = await fetch(API_URL + `products/search`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      apikey: 'FcKdtJs202209',
      username: 'KDT3_TEAM-4',
    },
    body: JSON.stringify({ searchText, searchTags }),
  });

  const json = await res.json();
  return json;
}

export async function addProduct(payload) {
  const { title, price, description, tags, thumbnailBase64, photoBase64 } = payload;
  console.log({ title, price, description });
  const res = await fetch(API_URL + 'products', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ title, price, description, tags, thumbnailBase64, photoBase64 }),
  });
  const json = await res.json();
  console.log('addProduct >> ', json);
  return json;
}

export async function deleteProduct(id) {
  try {
    const editedURL = API_URL + `products/${id}`;
    const res = await fetch(editedURL, {
      method: 'DELETE',
      headers: HEADERS,
    });
    const json = await res.json();
    console.log(`deleteProduct ${id}>>`, json);
    return json;
  } catch (e) {
    console.log('에러 발생', e);
  }
}
async function updateProduct(id, payload) {
  const { title, price, description, tags, thumbnailBase64, photoBase64, isSoldOut } = payload;

  const editedURL = API_URL + `/${id}`;
  const res = await fetch(API_URL + `products/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  console.log('updateProduct >> ', json);
  return json;
}

export const deleteAll = async () => {
  let products = await getProducts();
  for (let i = 0; i < products.length; i++) {
    const { id } = products[i];
    deleteProduct(id);
  }
};

const getDetailProduct = async (id) => {
  const res = await fetch(API_URL + `products/${id}`, {
    method: 'GET',
    headers: HEADERS,
  });
  const json = await res.json();
  console.log(json);
  return json;
};

// image -> base64
export async function encodeImageFileAsURL(files, setPreview) {
  if (files.length === 0) {
    setPreview('');
    return;
  }
  let file = files[0];
  let reader = new FileReader();

  reader.onloadend = async function () {
    await setPreview(reader.result);
    return reader.result;
  };
  reader.readAsDataURL(file);
}
//
