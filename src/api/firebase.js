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
