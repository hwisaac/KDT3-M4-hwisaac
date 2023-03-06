// 포매팅: 1999 -> $ 19.99
export const formatPrice = (price) => {
  const dollar = price / 100;
  return `$ ${dollar.toFixed(2)}`;
};

// 인덱스를 받아 image path 리턴
export const imageURL = (idx) => {
  let path = '';
  switch (idx) {
    case 0:
      path = 'https://i.postimg.cc/KYvqp6bc/home-slider0.jpg';
      break;
    case 1:
      path = 'https://i.postimg.cc/4x125JrF/home-slider1.jpg';
      break;
    case 2:
      path = 'https://i.postimg.cc/htn3TJ3d/home-slider2.jpg';
      break;
    case 3:
      path = 'https://i.postimg.cc/k51j0TMQ/home-slider7.jpg';
      break;
    case 4:
      path = 'https://i.postimg.cc/J4Z2s3K8/home-slider4.jpg';
      break;
    case 5:
      path = 'https://i.postimg.cc/y6J5HCZk/home-slider5.jpg';
      break;
    case 6:
      path = 'https://i.postimg.cc/d1hWwGDz/home-slider6.jpg';
      break;
    case 7:
      path = 'https://i.postimg.cc/k51j0TMQ/home-slider7.jpg';
      break;
    default:
      path = 'https://i.postimg.cc/KYvqp6bc/home-slider0.jpg';
      return;
  }
  return path;
};
