import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './Form/Form';

import { useSelector, useDispatch } from 'react-redux';
import { addContacts, removeContacts } from 'redux/items/items-action';

import { setFilter } from 'redux/filter/filter-action';

const App = () => {
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);
  const dispatch = useDispatch();

  const onAddContact = ({ name, number }) => {
    const action = addContacts(name, number);
    const arrayOfName = contacts && contacts.map(contact => contact.name);
    if (arrayOfName && arrayOfName.includes(name)) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(action);
  };

  const onRemoveContact = contact_id => {
    dispatch(removeContacts(contact_id));
  };

  const getFiltredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    const filterContacts =
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizeFilter)
      );
    return filterContacts;
  };

  const filtredArray = getFiltredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={event => dispatch(setFilter(event.currentTarget.value))}
      />
      <ContactList contacts={filtredArray} removeContact={onRemoveContact} />
    </div>
  );
};

export default App;
