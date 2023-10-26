import React, {Component} from "react";
import {nanoid} from 'nanoid';
import css from 'components/Phonebook/Phonebook.module.css';

class ContactForm extends Component {
    state = {
    name: "",
    number: "",
  };

  handleInputChange = (evt) => {
    const {name, value} = evt.target;
    this.setState({
      [name]: value,
    })};

  handleSubmit = evt => {
    evt.preventDefault();
    const {name, number} = this.state;
    if (name.trim() === "" || number.trim() === "") {
      return;
    };
    
    if (this.props.contacts.some(contact => contact.name === name)) {
      alert(`"${name}" is already in contacts`);
      return;
      };
      
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
      };
      
    this.props.onAddContact(contact);
    this.setState({name: "", number: ""});
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.contactsForm}>
        <label className={css.formLabel}>
          <p>Name</p>
            <input
            className={css.input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label className={css.formLabel}>
          <p>Number</p>
            <input
            className={css.input}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <button type="submit" className={css.addBtn}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
