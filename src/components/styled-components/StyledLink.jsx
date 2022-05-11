import styled from "styled-components";
import { Link } from "react-router-dom";
import { BaseTheme, handleThemeColors } from "./ThemeProvider";

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props =>props.color || '#009fbb'} ;
    font-size: 16px;
`