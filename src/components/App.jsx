import React, { Component } from 'react';
import Searchbar from './Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import fetchImages from 'components/FetchData';
import Button from 'components/Button';
import Modal from './Modal';
import Loader from 'components/Loader/Loader';

export class App extends Component {
  state = {
    request: '',
    response: [],
    currentPage: 1,
    loading: false,
    error: null,
    totalHits: 0,
    currentImage: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.request !== this.state.request ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  onOpenModal = image => {
    this.setState({ showModal: true, currentImage: image });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, currentImage: '' });
  };

  fetchImages = () => {
    const { currentPage, request } = this.state;
    this.setState({ loading: true });
    fetchImages(request, currentPage)
      .then(response => {
        if (response.hits.length === 0) {
          throw new Error('No photos found');
        }
        this.setState(prevState => ({
          response: [...prevState.response, ...response.hits],
          totalHits: response.totalHits,
        }));
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ loading: false }));
  };

  hanleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleFormSubmit = request => {
    this.setState({ request, response: [], currentPage: 1 });
  };

  render() {
    const { error, loading, response, showModal, totalHits, currentImage } =
      this.state;
    const totalPage = response.length / totalHits;
    return (
      <>
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          {loading && <Loader />}
          {response.length !== 0 && (
            <ImageGallery response={response} onOpenModal={this.onOpenModal} />
          )}
          {showModal && (
            <Modal onClose={this.onCloseModal} currentImage={currentImage} />
          )}
          {totalPage < 1 && !loading && (
            <Button onLoadMore={this.hanleLoadMore} />
          )}
          {error && <h1>{error}</h1>}
          <ToastContainer />
        </div>
      </>
    );
  }
}

export default App;
