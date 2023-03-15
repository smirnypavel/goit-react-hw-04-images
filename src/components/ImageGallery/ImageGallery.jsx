import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ response, onOpenModal }) => {
  return (
    <div>
      <ul className={styles.ImageGallery}>
        {response.map(item => (
          <ImageGalleryItem key={item.id} item={item} onClick={onOpenModal} />
        ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  response: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
