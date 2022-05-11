import styled from "styled-components";
import { BaseTheme, handleThemeColors } from "./ThemeProvider";

export const Button = styled.button`
    width: ${props => props.width || 'auto'};
    height: auto;
    margin-inline: ${props => props.marginX || 'auto'} ;
    border-radius: 5px;
    padding: ${props => props.padding || '10px'};
    text-align: center;
    display: inline-block;
    background-color: ${props => props.link ? 'transparent' : handleThemeColors(props)};
    border: none;
    outline: 0px solid ${handleThemeColors};
    color: ${props => props.link || props.color === 'white' ? BaseTheme.colors.black : BaseTheme.colors.white };
    cursor: pointer;
    transition: 200ms;
    &:hover {
        background-color: ${props => props.link ? 'transparent' : handleThemeColors(props)};
    }
    &:disabled {
        filter: opacity(30%);
    }
    &:focus{
        box-shadow: 0px 0px 10px 5px ${props => !props.link && handleThemeColors(props)};
    }
`