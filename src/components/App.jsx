import React, { Component } from "react"
import { Section } from "components/Section/Section"
import { ContactForm } from "components/ContactForm/ContactForm"
import {ContactList} from "components/ContactList/ContactList"
import { Filter } from "./Filter/Filter"
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
  contacts: [],
  filter: ''
  }

  formSubmitHandler = data => {
     const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (this.isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data]
    }))
  
  }

  isDuplicate({ name }) {
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name === name);
    return result;
  }

  removeContact = (id) => {
    this.setState((prev) => {
      const newContacts = prev.contacts.filter((item) => item.id !== id);

      return {
        contacts: newContacts
      }
    })
  }
  
  changeFilter = (e) => {
this.setState({filter: e.currentTarget.value})
  }

  componentDidUpdate(_, prevState) {
    
    if (this.state.contacts !== prevState.contacts) {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  }
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contacts")
    const parsedContacts = JSON.parse(contacts)

    if(parsedContacts){ this.setState({contacts: parsedContacts})}
   
  }

  render() {
    const { contacts, filter } = this.state
    const normalizedFilter = filter.toLocaleLowerCase()
    const filteredContacts = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter))
  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Filter value={filter} onChange={this.changeFilter } />
      </Section>
      <Section title="Contacts">
        <ContactList contacts={filteredContacts}  removeContact={this.removeContact}  />
        
      </Section>
    </>
     )
   }
};
