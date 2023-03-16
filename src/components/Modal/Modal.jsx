import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ currentImage, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickOverlay = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styled.Overlay} onClick={handleClickOverlay}>
      <div>
        <img src={currentImage} alt="" className={styled.Modal} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  currentImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
