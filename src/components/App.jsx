import React, { useState, useEffect } from "react"
import { Section } from "components/Section/Section"
import { ContactForm } from "components/ContactForm/ContactForm"
import {ContactList} from "components/ContactList/ContactList"
import { Filter } from "./Filter/Filter"
// import { nanoid } from 'nanoid';
export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("")


  const formSubmitHandler = data => {
    //  const contact = {
    //   id: nanoid(),
    //   name: data.name,
    //   number: data.number,
    // };

    // if (isDuplicate(contact)) {
    //   return alert(`${contact.name} is already in contacts`);
    // }
    setContacts(prevContacts => [...prevContacts, ...data])
  
  }

  // isDuplicate({ name }) {
  //   const result = contacts.find((item) => item.name === name);
  //   return result;
  // }

 const  removeContact = (id) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((item) => item.id !== id)})
  }
  
  const changeFilter = (e) => {
setFilter(e.currentTarget.value) 
  }

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    const people = localStorage.getItem("contacts");
    const parsedPeople = JSON.parse(people);
    if (parsedPeople) {
      function DoIt () { setContacts((prevContacts) => [...prevContacts, ...parsedPeople]) }
      DoIt ()
    }
},[contacts])

const normalizedFilter = filter.toLocaleLowerCase()
const filteredContacts = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter))
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
