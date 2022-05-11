import styled from "styled-components"

export const Input = styled.input`
    width: ${props => props.width || '100%'};
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    background: #e8e8e8;
    transition: 0.3s;
    &:focus {
        outline-color: #e8e8e8;
        background: #e8e8e8;
        box-shadow: inset 20px 20px 60px #c5c5c5,
        inset -20px -20px 60px #ffffff;

        transition: 0.3s;
    }
`
