import React, { Component } from "react"
import { nanoid } from 'nanoid'
import {StyledForm} from "components/ContactForm/ContactForm.styled"
import { StyledLabel } from "components/CommonStyled/Label.styled"
import {StyledInput} from "components/CommonStyled/Input.styled"
import { StyledBtn } from "components/CommonStyled/Btn.styled"
import PropTypes from 'prop-types';

export class ContactForm extends Component {
    state = {
        id: "",
      name: '',
      number: ""
    }

  nameInputId = nanoid()
  numberInputId = nanoid()

     handleInputChange = event => {
    const {name, value} = event.currentTarget
    this.setState(
        {
            [name]: value,
            id: nanoid()}
    )
    }
    
      handleSubmit = e => {
    e.preventDefault();
          
          this.props.onSubmit(this.state)
          this.reset()
    }
    
    reset = () => {
        this.setState({
             id: "",
            name: '',
            number: ""
        })
    }

    render() {
        const { name, number } = this.state
        return (
            
            <StyledForm onSubmit={this.handleSubmit}>
          <StyledLabel htmlFor={this.nameInputId}>Name</StyledLabel>
          <StyledInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          value={name}
          onChange={this.handleInputChange}
          id={this.nameInputId}
            />
            <StyledLabel htmlFor={this.numberInputId}>Number</StyledLabel>
            <StyledInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
          value={number}
          onChange={this.handleInputChange}
          id={this.numberInputId}
              
/>
          <StyledBtn type="submit">Add Contact</StyledBtn>
        </StyledForm>
        )
    }
}

ContactForm.propTypes = {
    
  onSubmit: PropTypes.func
}