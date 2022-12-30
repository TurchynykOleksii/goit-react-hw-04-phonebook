import React, { useEffect, useState } from 'react';
import { Form } from './Form';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getContact = ({ name, number }) => {
    const itsContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (itsContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prev => [newContact, ...prev]);
  };

  const onFilterContacts = e => setFilter(e.target.value);

  const onDeleteContact = id =>
    setContacts(prev => prev.filter(contact => contact.id !== id));

  const filterArrContacts = () => {
    return contacts.filter(current =>
      current.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className="app">
      <h1>Phonebook</h1>
      <Form submitProps={getContact} />
      <h2>Contacts</h2>
      <Filter filter={onFilterContacts} value={filter} />
      <ContactList
        changeList={filterArrContacts()}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
};
