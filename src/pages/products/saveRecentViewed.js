const saveRecentViewed = (id) => {
  if (!localStorage.watched) {
    localStorage.setItem('watched', JSON.stringify([]));
  }
  const watched = localStorage.getItem('watched');
  const watchedArr = JSON.parse(watched);
  watchedArr.unshift(id);
  localStorage.setItem('watched', JSON.stringify(watchedArr));
  const watchedSet = new Set(watchedArr);
  const watchedProducts = [...watchedSet].slice(0, 3);
  localStorage.setItem('watched', JSON.stringify(watchedProducts));
};

export default saveRecentViewed;
