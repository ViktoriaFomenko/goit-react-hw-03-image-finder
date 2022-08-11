import css from './Button.module.css';

export const Button = ({ LoadMore }) => {
  return (
    <button type="button" className={css.btn} onClick={LoadMore}>
      Load more
    </button>
  );
};
