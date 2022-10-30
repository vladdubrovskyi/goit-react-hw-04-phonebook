import {StyledSection} from "components/Section/Section.styled"
import {StyledHeader} from "components/Section/Header.styled"
import PropTypes from 'prop-types';
export const Section = ({ title, children }) => {
    return <StyledSection>
        <StyledHeader>{title}</StyledHeader>
        {children}
    </StyledSection>
    
}


Section.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node    
}