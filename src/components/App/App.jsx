import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIServise from '../../ApiServise/ApiServise';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: '',
    isLoading: false,
    showModal: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1, error: null });
    }
  }

  ImageSearching = async () => {
    const { query, page } = this.state;

    if (query.trim() === '') {
      return toast.warning('Please enter something!');
    }
    this.Loader();

    try {
      const response = await APIServise(query, page);
      this.setState(({ images, page }) => ({
        images: [...images, ...response],
        page: page + 1,
      }));
      if (response.length === 0) {
        this.setState({ error: toast.info(`No results for ${query}!`) });
      }
    } catch (error) {
      this.setState({ error: toast.error('Something went wrong...') });
    } finally {
      this.Loader();
    }
  };

  Loader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.ImageSearching();
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  LoadMore = () => {
    this.ImageSearching();
  };

  render() {
    const { query, images, isLoading, showModal, error, largeImageURL } =
      this.state;
    return (
      <div className={css.App}>
        <ToastContainer autoClose={2000} position="top-center" closeOnClick />
        <Searchbar
          onHandleSubmit={this.handleSubmit}
          onSearchQuery={this.handleChange}
          value={query}
        />

        {images.length > 0 && !error && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {!isLoading && images.length >= 12 && !error && (
          <Button LoadMore={this.LoadMore} />
        )}

        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />
        )}
      </div>
    );
  }
}
