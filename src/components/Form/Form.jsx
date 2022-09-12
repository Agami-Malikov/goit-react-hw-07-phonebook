import PropTypes from 'prop-types';
import { useState } from 'react';

const ContactForm = ({onSubmit}) => {

  const [state, setState] = useState({
      name: '',
      phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(state);
    setState({
      name: '',
      phone: ''
    })
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
        ...state,
        [name]: value
    })
  };

  const { name, phone } = state;

        return (
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="">Name</label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <label htmlFor="">Number</label>
            <input
              onChange={handleChange}
              value={phone}
              type="tel"
              name="phone"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <button type="submit">Add contact</button>
          </form>
        );

    
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};