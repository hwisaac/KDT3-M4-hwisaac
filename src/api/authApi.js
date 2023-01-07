import axios from 'axios';
import { authUrl, HEADERS_USER } from './commonApi';

export const signUp = async ({ email, password, displayName, profileImgBase64 }) => {
  try {
    const res = await fetch(`${authUrl}/signup`, {
      method: 'POST',
      headers: HEADERS_USER,
      body: JSON.stringify({ email, password, displayName, profileImgBase64 }),
    });
    const {
      user: { profileImg },
      accessToken,
    } = await res.json();
    return { profileImg, accessToken };
  } catch (error) {
    console.log(error);
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
    if (error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.log(error);
    }
  }
};
