import React, { useState, useEffect } from "react"
import { Section } from "components/Section/Section"
import { ContactForm } from "components/ContactForm/ContactForm"
import {ContactList} from "components/ContactList/ContactList"
import { Filter } from "./Filter/Filter"
// import { nanoid } from 'nanoid';
export function App() {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState("")


  const formSubmitHandler = data => {
     const { name, number, id } = data;
   
    if (isDuplicate(name)) {
       alert(`${name} is already in contacts`);
    return
    }
  const contactItem = {
      name,
    number,
      id
    };
    setContacts(contacts => [contactItem, ...contacts])
  }
  
  const isDuplicate = contactName => {
   const lowercaseName = contactName.toLowerCase();
   return contacts.find(({name}) => name.toLowerCase().includes(lowercaseName));
    
  }


  const removeContact = contactId  => {

     setContacts(contacts.filter(contact => contact.id !== contactId ));
  }
  
  const changeFilter = (e) => {
setFilter(e.currentTarget.value) 
  }

useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
 
const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={formSubmitHandler} />
        <Filter value={filter} onChange={changeFilter } />
      </Section>
      <Section title="Contacts">
        <ContactList contacts={filteredContacts}  removeContact={removeContact}  />
        
      </Section>
    </>
     )  
};
