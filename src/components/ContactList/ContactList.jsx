import {StyledList} from "components/CommonStyled/List.styled"
import {StyledListItem} from "components/CommonStyled/ListItem.styled"
import {StyledRemoveBtn} from "components/ContactList/BtnRemove.styled"
import PropTypes from 'prop-types';
export const ContactList = ({ contacts, removeContact }) => {
    return <StyledList>
        {contacts.map(contact =>
        {
        return (
        <StyledListItem key={contact.id}>
                {contact.name}: {contact.number}
                <StyledRemoveBtn type="button" onClick={() => removeContact(contact.id)}>Remove</StyledRemoveBtn>
            </StyledListItem>)
        })}
    </StyledList>
    
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number:PropTypes.string
  })),
  removeContact: PropTypes.func
}