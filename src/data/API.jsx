import { getCookie } from './LoginData';
const originProducts = require('./originProducts.json');

/**
 * image 를 로드 하면 -> base64 로 인코딩
 * @param {*} files
 * @param {*} setPreview
 * @returns
 */
export async function encodeImageFileAsURL(files, setPreview) {
  if (files.length === 0) {
    setPreview('');
    return '아무것도 들어오지 않았습니다.';
  }
  let file = files[0];
  let reader = new FileReader();

  reader.onloadend = async function () {
    await setPreview(reader.result);
    console.log(reader.result);

    return reader.result;
  };
  reader.readAsDataURL(file);
}

/**
 * image url 을 받아서 base64 로 인코딩하여 리턴
 */

// export const toDataURL = (url) =>
//   fetch(url)
//     .then((response) => response.blob())
//     .then(
//       (blob) =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           // reader.onerror = reject;
//           reader.readAsDataURL(blob);
//         }),
// );
// function toDataURL(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function () {
//     var reader = new FileReader();
//     reader.onloadend = function () {
//       callback(reader.result);
//     };
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }

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
/**
 * @returns 상품 데이터 객체가 담긴 리스트
 */
export async function getProducts() {
  const res = await fetch(API_URL + 'products', {
    method: 'GET',
    headers: HEADERS,
  });

  const json = await res.json();
  // console.log('getProducts >> ', json);
  return json;
}

/**  상품 상세페이지 정보 */
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

/**
 *
 * @param {string} id
 * @param {*} payload =: { title, price, description, tags, thumbnailBase64, photoBase64, isSoldOut }
 * @returns {void}
 */
export async function updateProduct(id, payload) {
  console.log(payload);
  const { title, price, description, tags, thumbnailBase64, photoBase64, isSoldOut } = payload;

  const res = await fetch(API_URL + `products/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  console.log('updateProduct >> ', json);
}

export const deleteAll = async () => {
  let products = await getProducts();
  for (let i = 0; i < products.length; i++) {
    const { id } = products[i];
    deleteProduct(id);
  }
};

export const getDetailProduct = async (id) => {
  const res = await fetch(API_URL + `products/${id}`, {
    method: 'GET',
    headers: HEADERS,
  });
  const json = await res.json();
  console.log(json);
  return json;
};

//
export const deleteSelectedProducts = (checkList) => {
  // 프로미스 객체가 생성되면 executor 함수가 바로 실행
  return new Promise(async (resolve, reject) => {
    for (let id of Object.keys(checkList)) {
      if (checkList[id]) {
        await deleteProduct(id);
      }
    }
    console.log('console.log (전부 삭제 완료)');
    resolve('resolve: 삭제완료');
  });
};

// const getBase64FromUrl = async (url) => {
//   console.log('fetch직전');
//   const data = await fetch(url);
// const blob = await data.blob();
// return new Promise((resolve) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(blob);
//   reader.onloadend = function () {
//     const base64data = reader.result;
//     resolve(base64data);
//   };
// });
// };
var getDataUri = function (targetUrl, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
};
// 검색
export async function getSearch(title = '', tags = '') {
  const res = await fetch(API_URL + 'products/search', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      searchText: `${title}`,
      searchTags: [`${tags}`],
    }),
  });

  const json = await res.json();
  return json;
}

// 계좌 조회 api
const accessToken = getCookie('accessToken');

export const getAccountInfo = async () => {
  try {
    const res = await fetch(ACCOUNT_URL, {
      method: 'GET',
      headers: { ...HEADERS_USER, Authorization: accessToken },
    });
    const { accounts } = await res.json();

    return accounts;
  } catch (error) {
    console.error(error.message);
  }
};

// 결제 함수
export const getBuy = async (productId, accountId) => {
  try {
    const res = await fetch(API_URL + 'products/buy', {
      method: 'POST',
      headers: { ...HEADERS, Authorization: accessToken },
      body: JSON.stringify({
        productId,
        accountId,
      }),
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

// function getBase64(url) {
//   return Axios.get(url, {
//     responseType: 'arraybuffer',
//   }).then((response) => Buffer.from(response.data, 'binary').toString('base64'));
// }

// 상품을 처음 상태로 초기화 한다
export const resetAllProducts = async () => {
  const { title, price, tags, description, detail_url, thumbnail } = originProducts[0];
  // console.log(await getBase64(thumbnail));
  getDataUri(detail_url, function (base64) {
    console.log(base64);
  });
  return new Promise(async (resolve, reject) => {
    // await deleteAll();
    // for (let i = 0; i < originProducts.length; i++) {
    //   const { title, price, tags, description, detail_url, thumbnail } = originProducts[i];
    // getBase64FromUrl(thumbnail).then((a) => {
    //   console.log(a);
    // });
    // toDataURL(proxyUrl + thumbnail, function (dataUrl) {
    //   console.log('RESULT:', dataUrl);
    // });
    // toDataURL(proxyUrl + thumbnail).then((dataUrl) => {
    //   console.log('RESULT:', dataUrl);
    // });
    // const thumbnailBase64 = await toDataURL(thumbnail).then((dataUrl) => {
    //   console.log('RESULT:', dataUrl);
    // });
    // addProduct({ title, price, description, tags, thumbnailBase64, photoBase64 });
    // toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0').then((dataUrl) => {
    //   console.log('RESULT:', dataUrl);
    // });
    // }
  });
};

export async function getTransactionsAll() {
  const res = await fetch(API_URL + 'products/transactions/all', {
    method: 'GET',
    headers: HEADERS,
  });

  const json = await res.json();
  // console.log('getTransactionsAll >> ', json);
  return json;
}
