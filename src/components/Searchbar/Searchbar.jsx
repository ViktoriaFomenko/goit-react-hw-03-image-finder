import PropTypes from 'prop-types';
// import css from './Searchbar.module.css'

export const Searchbar = ({ onHandleSubmit, onSearchQuery, value }) => {
  return (
    <header className="searchbar" onSubmit={onHandleSubmit}>
      <form className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
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
