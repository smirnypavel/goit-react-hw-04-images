import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';

const SearchBar = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handleRequestChange = event => {
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (request.trim() === '') {
      return toast.error('Введите запрос!');
    }
    onSubmit(request);
    setRequest('');
  };

  return (
    <header className={styled.Searchbar}>
      <form className={styled.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styled.SearchForm_button}>
          <FcSearch className={styled.icon} />
        </button>
        <input
          className={styled.SearchForm_input}
          type="text"
          placeholder="Search..."
          name="request"
          value={request}
          onChange={handleRequestChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
