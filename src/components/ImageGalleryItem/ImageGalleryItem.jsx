import React from 'react';
import PropTypes from 'prop-types';
import styled from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item, onClick }) => {
  const handleClick = () => {
    onClick(item.largeImageURL);
  };

  return (
    <li className={styled.ImageGalleryItem}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        className={styled.ImageGalleryItem_image}
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
