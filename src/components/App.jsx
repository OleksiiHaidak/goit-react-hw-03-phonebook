import React, { Component } from "react";
import css from 'components/Phonebook/Phonebook.module.css';
import ContactForm from "components/Phonebook/ContactForm";
import ContactList from "components/Phonebook/ContactList";
import ContactFilter from "components/Phonebook/ContactFilter";


export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem("contactlst");
    if (savedContacts) {
      this.setState({contacts: JSON.parse(savedContacts)});
    }};

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contactlst", JSON.stringify(this.state.contacts));
    }};

  handleAddContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = evt => {
    const {value} = evt.target;
    this.setState({filter: value});
  };

  render() {
    const {contacts, filter} = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()));

    return (
      <div className={css.phonebookForm}>
        <h1 className={css.mainTitle}>Phonebook</h1>
        <ContactForm contacts={contacts} onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <ContactFilter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    )}};