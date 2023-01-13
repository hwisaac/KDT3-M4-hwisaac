import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function getCart(username) {
  return get(ref(database, `carts/${username}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(username, product) {
  return set(ref(database, `carts/${username}/${product.productId}`), product);
}

export async function removeFromCart(username, productIds) {
  if (typeof productIds === 'string') {
    await remove(ref(database, `carts/${username}/${productIds}`));
  } else {
    for (let id of productIds) {
      await remove(ref(database, `carts/${username}/${id}`));
    }
  }
  return;
}

export async function getKeepProducts(username) {
  return get(ref(database, `keep-products/${username}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToKeepProducts(username, product) {
  return set(ref(database, `keep-products/${username}/${product.productId}`), product);
}

export async function removeFromKeepProducts(username, productIds) {
  remove(ref(database, `keep-products/${username}/${productIds}`));
}
