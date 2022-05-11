import styled from "styled-components";
import { BaseTheme, handleThemeColors } from "./ThemeProvider";

export const Form = styled.form`
    width: ${props => props.width || "80%"};
    margin-inline: ${props => props.marginX || "auto"};
    height: auto;
    min-height: 15vh;
    padding: 25px;
    display: flex;
    flex-direction: ${props => props.flexDirection || 'column'};
    align-items: ${props => props.alignItems || 'center'};
    justify-content: ${props => props.justifyContent || 'space-evenly'};
    border-radius: 0.5rem;
    background-color: ${props => props.Theme && props.Theme.colors.white || BaseTheme.colors.white};
`