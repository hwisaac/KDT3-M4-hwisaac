export async function getProducts(searchText, searchTags) {
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      apikey: 'FcKdtJs202209',
      username: 'KDT3_TEAM-4',
    },
    body: JSON.stringify({ searchText, searchTags }),
  });

  const json = await res.json();
  // console.log('getProducts >> ', json);
  return json;
}
