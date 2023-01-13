import { API_URL, ACCOUNT_URL, HEADERS, HEADERS_USER } from './commonApi';
import { getCookie } from './../recoil/userInfo';

// 계좌 조회 api
export const getAccountInfo = async ({ accessToken }) => {
  try {
    const res = await fetch(ACCOUNT_URL, {
      method: 'GET',
      headers: { ...HEADERS_USER, Authorization: accessToken },
    });
    const json = await res.json();

    return json;
  } catch (error) {
    console.error(error.message);
  }
};

// test
const accessToken = getCookie('accessToken');

export const getAccountInfo2 = async () => {
  try {
    const res = await fetch(ACCOUNT_URL, {
      method: 'GET',
      headers: { ...HEADERS_USER, Authorization: accessToken },
    });
    const json = await res.json();

    return json;
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

// 추가 가능한 계좌 목록 불러오기
export const getAvailableBank = async ({ accessToken }) => {
  try {
    const res = await fetch(`${ACCOUNT_URL}/banks`, {
      method: 'GET',
      headers: { ...HEADERS_USER, Authorization: accessToken },
    });
    const json = await res.json();
    let bankList = json;
    // 추가 가능한 계좌만 필터
    bankList = bankList.filter((bank) => !bank.disabled);
    return bankList;
  } catch (error) {
    console.log(error.message);
  }
};

// 계좌추가 api
export const addAccount = async ({ accessToken, inputData }) => {
  try {
    const res = await fetch(`${ACCOUNT_URL}`, {
      method: 'POST',
      headers: { ...HEADERS_USER, Authorization: accessToken },
      body: JSON.stringify(inputData),
    });
    const { id } = await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

// 계좌해지 api
export const deleteAccount = async ({ accessToken, accountId, signature }) => {
  try {
    const res = await fetch(`${ACCOUNT_URL}`, {
      method: 'DELETE',
      headers: { ...HEADERS_USER, Authorization: accessToken },
      body: JSON.stringify({ accountId, signature }),
    });
    const json = await res.json();
  } catch (error) {
    console.log(error.message);
  }
};
