import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import APIServise from '../ApiServise/ApiServise';

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
      return alert('Please enter something!');
    }
    this.Loader();

    try {
      const response = await APIServise(query, page);
      this.setState(({ images, page }) => ({
        images: [...images, ...response],
        page: page + 1,
      }));
      if (response.length === 0) {
        this.setState({ error: alert(`No results for ${query}!`) });
      }
    } catch (error) {
      this.setState({ error: alert('Something went wrong...') });
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
    console.log(largeImageURL);

    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };
  render() {
    const { query, images, largeImageURL, isLoading, showModal, error } =
      this.state;
    return (
      <>
        <Searchbar
          onHandleSubmit={this.handleSubmit}
          onSearchQuery={this.handleChange}
          value={query}
        />
        <ImageGallery images={images} OpenModal={this.openModal} />
      </>
    );
  }
}
