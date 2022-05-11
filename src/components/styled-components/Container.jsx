import styled from "styled-components";

export const Container = styled.div`
    width: ${props => props.width || '90%'};
    margin-inline: ${props => props.marginX || 'auto'};
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => props.flexDirection || 'row'};
    align-items: ${props => props.alignItems || 'center'};
    justify-content: ${props => props.justifyContent || 'space-evenly'};
`