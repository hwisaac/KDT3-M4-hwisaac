import { API_URL, ACCOUNT_URL, HEADERS, HEADERS_USER } from './commonApi';
import { getCookie } from './userInfo';

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
