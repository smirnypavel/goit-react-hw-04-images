import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import fetchImages from 'components/FetchData';
import Button from 'components/Button';
import Modal from './Modal';
import Loader from 'components/Loader/Loader';

export function App() {
  const [isMounted, setIsMounted] = useState(true);
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isMounted) {
      setIsMounted(false);
    } else {
      setLoading(true);
      fetchImages(request, currentPage)
        .then(response => {
          if (response.hits.length === 0) {
            throw new Error('No photos found');
          }
          setResponse(prevResponse => [...prevResponse, ...response.hits]);
          setTotalHits(response.totalHits);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, currentPage]);

  const handleFormSubmit = query => {
    setRequest(query);
    setResponse([]);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = image => {
    setCurrentImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentImage('');
    setShowModal(false);
  };

  const totalPage = response.length / totalHits;

  return (
    <>
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        {loading && <Loader />}
        {response.length !== 0 && (
          <ImageGallery response={response} onOpenModal={handleOpenModal} />
        )}
        {showModal && (
          <Modal onClose={handleCloseModal} currentImage={currentImage} />
        )}
        {totalPage < 1 && !loading && <Button onLoadMore={handleLoadMore} />}
        {error && <h1>{error}</h1>}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
