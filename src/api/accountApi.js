import { API_URL, ACCOUNT_URL, HEADERS, HEADERS_USER } from './commonApi';

// 계좌 조회 api
export const getAccountInfo = async ({ accessToken }) => {
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
export const getBuy = async (productId, accountId, accessToken) => {
  try {
    const res = await fetch(API_URL + 'products/buy', {
      method: 'POST',
      headers: { ...HEADERS, Authorization: accessToken },
      body: JSON.stringify({
        productId,
        accountId,
      }),
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error.message);
  }
};
