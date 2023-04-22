import axios from 'axios';
import { authUrl, HEADERS_USER } from './commonApi';

export const signUp = async ({ email, password, displayName, profileImgBase64 = '' }) => {
  try {
    const res = await axios.post(
      `${authUrl}/signup`,
      { email, password, displayName, profileImgBase64 },
      { headers: HEADERS_USER },
    );
    const {
      user: { profileImg },
      accessToken,
    } = await res.json();
    return { profileImg, accessToken };
  } catch (error) {
    alert(error.response.data);
  }
};

export const logIn = async ({ email, password }) => {
  try {
    const res = await axios.post(`${authUrl}/login`, { email, password }, { headers: HEADERS_USER });
    const {
      user: { displayName, profileImg },
      accessToken,
    } = res.data;
    return { displayName, profileImg, accessToken };
  } catch (error) {
    alert(error.response.data);
  }
};

export const logOut = async ({ accessToken }) => {
  try {
    const res = await fetch(`${authUrl}/logout`, {
      method: 'POST',
      headers: { ...HEADERS_USER, Authorization: accessToken },
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
