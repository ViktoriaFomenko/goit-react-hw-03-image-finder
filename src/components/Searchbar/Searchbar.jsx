import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export const Searchbar = ({ onHandleSubmit, onSearchQuery, value }) => {
  return (
    <header className={css.searchbar} onSubmit={onHandleSubmit}>
      <form className={css.form}>
        <button type="submit" className={css.button}>
          <FiSearch size="16px" />
        </button>
        <input
          className={css.input}
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onSearchQuery}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
