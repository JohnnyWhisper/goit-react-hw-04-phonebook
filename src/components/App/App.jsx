import s from 'components/App/App.module.css';
import React, { Component } from 'react';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {

    if (this.state.contacts.some(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts.`);
    } else {
      const contact = {
        id: nanoid(10),
        name: data.name,
        number: data.number,
      };
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };
  
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);


    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }


  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  render() {
    const { filter } = this.state;

    const normalizeFilter = this.state.filter.toLowerCase();
    const filterContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );

    return (
      <div className={s.wrapper}>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={filterContacts}
            onDelete={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
