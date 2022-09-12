import s from './contactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, removeContact }) => {
  const elements =
    contacts &&
    contacts.map(({ name, number, id }) => {
      return (
        <li className={s.item} key={id}>
          <p>
            {name}: {number}
          </p>
          <button
            type="button"
            className={s.btn}
            onClick={() => removeContact(id)}
          >
            Delete
          </button>
        </li>
      );
    });

  return <ul>{elements}</ul>;
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};
