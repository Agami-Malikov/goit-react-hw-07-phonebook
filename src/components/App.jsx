import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './Form/Form';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchContacts,
  addContact,
  removeContact,
} from 'redux/items/items-operations';
import { setFilter } from 'redux/filter/filter-action';

import { getItems } from 'redux/items/selectors';
import { getFilter } from 'redux/filter/selectors';

const App = () => {
  const getState = ({ contacts }) => ({
    loading: contacts.loading,
    error: contacts.error,
  });

  const contacts = useSelector(getItems);
  const filter = useSelector(getFilter);
  const { loading, error } = useSelector(getState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onAddContact = data => {
    const action = addContact(data);
    dispatch(action);
  };

  const onRemoveContact = id => {
    dispatch(removeContact(id));
  };

  const getFiltredContacts = () => {
    const normalizeFilter = filter?.toLowerCase();
    const filterContacts = contacts?.filter(contact =>
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
      {error && <p>Не удалось загрузить контакты! </p>}
      {loading ? (
        <p>...Loadind</p>
      ) : (
        <ContactList contacts={filtredArray} removeContact={onRemoveContact} />
      )}
    </div>
  );
};

export default App;
