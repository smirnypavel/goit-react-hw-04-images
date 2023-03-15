import { Component } from 'react';
import PropTypes from 'prop-types';
import styled from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';

export default class SearchBar extends Component {
  state = {
    request: '',
  };

  handleRequestChange = event => {
    this.setState({ request: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.request.trim() === '') {
      return toast.error('Введите запрос!');
    }
    this.props.onSubmit(this.state.request);
    this.setState({ request: '' });
  };

  render() {
    return (
      <header className={styled.Searchbar}>
        <form className={styled.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styled.SearchForm_button}>
            <FcSearch className={styled.icon} />
          </button>
          <input
            className={styled.SearchForm_input}
            type="text"
            placeholder="Search..."
            name="request"
            value={this.state.request}
            onChange={this.handleRequestChange}
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
