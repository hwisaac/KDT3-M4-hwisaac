import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { authUrl, Headers } from '../data/API';

const firebaseConfig = {
  apiKey: 'AIzaSyDzb5aj4VYGm8wiXwRF92gSqMt6_im5GJc',
  authDomain: 'kdt-m4.firebaseapp.com',
  databaseURL: 'https://kdt-m4-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'kdt-m4',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function login(email, password) {
  const res = await fetch(`${authUrl}/login`, {
    method: 'POST',
    headers: Headers,
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  console.log('json:', json);
  const userName = json.user.displayName;
  const accessToken = json.accessToken;

  document.cookie = `user=${userName};  path=/; max-age=3600; secure`;
  document.cookie = `token=${accessToken}; path=/; max-age=3600; secure`;
  document.cookie = `email=${email}; path=/; max-age=3600; secure`;
  document.cookie = `password=${password}; path=/; max-age=3600; secure`;
  return json.user;
}

/**
 * user
 * displayName
 * email
 * profileImg
 */

export async function getCart(username) {
  return get(ref(database, `carts/${username}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      console.log('items:', items);
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(username, product) {
  return set(ref(database, `carts/${username}/${product.productId}`), product);
}

export async function removeFromCart(username, productId) {
  return remove(ref(database, `carts/${username}/${productId}`));
}
