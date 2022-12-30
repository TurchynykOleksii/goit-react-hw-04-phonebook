import React, { Component } from 'react';
import { Form } from './Form';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localStorContacts) {
      this.setState({
        contacts: localStorContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  getContact = data => {
    const itsContacts = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (itsContacts) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = { ...data, id: nanoid() };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  onFilterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDeleteContact = id => {
    return this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(contact => contact.id !== id),
        filter: '',
      };
    });
  };

  filterArrContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(current =>
      current.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filterContacts = this.filterArrContacts();
    return (
      <div className="app">
        <h1>Phonebook</h1>
        <Form submitProps={this.getContact} />
        <h2>Contacts</h2>
        <Filter filter={this.onFilterContacts} value={this.state.filter} />
        <ContactList
          changeList={filterContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}
