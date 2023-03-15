export const fetchImages = async (query, page) => {
  const url = `https://pixabay.com/api/?key=31868905-6d4cb3c5703ea270b013ab0a6&q=${query}&image_type=all&orientation=horizontal&per_page=12&page=${page}`;
  const resp = await fetch(url);
  return await resp.json();
};

export default fetchImages;
