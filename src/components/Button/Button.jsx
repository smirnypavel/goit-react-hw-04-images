import React from 'react';
import PropTypes from 'prop-types';
import styled from './Button.module.css';

const LoadMore = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className={styled.Button}>
      Load More
    </button>
  );
};

LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMore;
