import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDzb5aj4VYGm8wiXwRF92gSqMt6_im5GJc',
  authDomain: 'kdt-m4.firebaseapp.com',
  databaseURL: 'https://kdt-m4-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'kdt-m4',
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
