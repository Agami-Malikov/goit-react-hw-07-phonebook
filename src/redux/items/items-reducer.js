import { createReducer } from '@reduxjs/toolkit';
import { addContacts, removeContacts } from './items-action';


export const contactsReducer = createReducer([], {
  [addContacts]: (store, { payload }) => [...store, payload],
  [removeContacts]: (store, { payload }) =>
    store.filter(item => item.id !== payload),
});
