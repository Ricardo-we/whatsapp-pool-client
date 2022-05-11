import styled from "styled-components";

export const List = styled.ul`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || 'auto'};
    list-style: none;
`

export const ListItem = styled.li`
    list-style: none;
    width: 100%;
`