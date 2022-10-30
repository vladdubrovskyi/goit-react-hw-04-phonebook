import React, { useState } from "react"
import { nanoid } from 'nanoid'
import {StyledForm} from "components/ContactForm/ContactForm.styled"
import { StyledLabel } from "components/CommonStyled/Label.styled"
import {StyledInput} from "components/CommonStyled/Input.styled"
import { StyledBtn } from "components/CommonStyled/Btn.styled"
import PropTypes from 'prop-types';

export function ContactForm({ onSubmit }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("")
  
 

const handleInputChange = event => {
  const { name, value } = event.currentTarget
   switch (name) {
      case 'name':
       setName(value);
       setId(nanoid())
        break;

      case 'number':
       setNumber(value);
       setId(nanoid())
        break;

      default:
        throw new Error('Not supported type');
    }
    }
    
      const handleSubmit = e => {
    e.preventDefault();
    onSubmit({name, number, id})
    reset()
    }
    
   const reset = () => {
      setId("");
      setName("");
      setNumber("");
    }

  return (
    <StyledForm onSubmit={handleSubmit}>
          <StyledLabel >Name</StyledLabel>
          <StyledInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          value={name}
          onChange={handleInputChange}
         
            />
            <StyledLabel>Number</StyledLabel>
            <StyledInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
          value={number}
          onChange={handleInputChange}                   
/>
          <StyledBtn type="submit">Add Contact</StyledBtn>
        </StyledForm>
    )     
}

ContactForm.propTypes = {
    
  onSubmit: PropTypes.func
}