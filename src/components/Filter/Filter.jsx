import css from '../Form/Form.module.css';
import React from 'react';
import { PropTypes } from 'prop-types';

export const Filter = ({ filter }) => {
  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        className={css.input}
        type="text"
        onChange={filter}
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.func,
};
