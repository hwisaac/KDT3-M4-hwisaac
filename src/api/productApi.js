import { API_URL, HEADERS, HEADERS_USER } from './commonApi';

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
// 상품을 처음 상태로 초기화 한다
// export const resetAllProducts = async () => {
//   const { title, price, tags, description, detail_url, thumbnail } = originProducts[0];
//   // console.log(await getBase64(thumbnail));
//   getDataUri(detail_url, function (base64) {
//     console.log(base64);
//   });
//   return new Promise(async (resolve, reject) => {
//     // await deleteAll();
//     // for (let i = 0; i < originProducts.length; i++) {
//     //   const { title, price, tags, description, detail_url, thumbnail } = originProducts[i];
//     // getBase64FromUrl(thumbnail).then((a) => {
//     //   console.log(a);
//     // });
//     // toDataURL(proxyUrl + thumbnail, function (dataUrl) {
//     //   console.log('RESULT:', dataUrl);
//     // });
//     // toDataURL(proxyUrl + thumbnail).then((dataUrl) => {
//     //   console.log('RESULT:', dataUrl);
//     // });
//     // const thumbnailBase64 = await toDataURL(thumbnail).then((dataUrl) => {
//     //   console.log('RESULT:', dataUrl);
//     // });
//     // addProduct({ title, price, description, tags, thumbnailBase64, photoBase64 });
//     // toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0').then((dataUrl) => {
//     //   console.log('RESULT:', dataUrl);
//     // });
//     // }
//   });
// };

export const getTransactionsAll = async () => {
  const res = await fetch(API_URL + 'products/transactions/all', {
    method: 'GET',
    headers: HEADERS,
  });
  const json = await res.json();
  return json;
};

export const editTransaction = async (detailId, { isCanceled, done }) => {
  console.log(detailId);
  console.log({ isCanceled, done });
  const res = await fetch(API_URL + `products/transactions/${detailId}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({ isCanceled, done }),
  });
  const json = await res.json();
  console.log(json);
};

/**
 * 유저의 거래내역 불러오는 함수
 * @param {string} accessToken
 * @returns {} 배송비를 제외한 거래내역[]
 */
export const getOrderList = async ({ accessToken }) => {
  const res = await fetch(`${API_URL}products/transactions/details`, {
    method: 'GET',
    headers: { ...HEADERS_USER, Authorization: accessToken },
  });
  const json = await res.json();
  let sortedByLatest = [...json].sort((a, b) => new Date(b.timePaid) - new Date(a.timePaid));
  const exceptDelivery = sortedByLatest.filter((order) => order.product.title !== '배송비');
  return exceptDelivery;
};
/**
 * 거래내역(주문) 확정 or 취소
 * @param {string} menu
 * @param {string} accessToken
 * @param {detailId} detailId
 */
export const handleOrder = async ({ menu, accessToken, detailId }) => {
  const res = await fetch(`${API_URL}products/${menu === '구매확정' ? 'ok' : 'cancel'}`, {
    method: 'POST',
    headers: { ...HEADERS_USER, Authorization: accessToken },
    body: JSON.stringify({ detailId }),
  });
};
/**
 * 거래내역 상세정보 불러오기
 * @param {string} accessToken
 * @param {string} detailId
 */
export const getOrderDetail = async ({ accessToken, detailId }) => {
  const res = await fetch(`${API_URL}products/transactions/detail`, {
    method: 'POST',
    headers: { ...HEADERS_USER, Authorization: accessToken },
    body: JSON.stringify({ detailId }),
  });
  const json = await res.json();
  return json;
};
