import styled from "styled-components";
import { Container } from "./styled-components/Container";

const CardHeading = styled.div`
    width: 100%;
    height: 20%;
    align-self: flex-start;
`

const CardContent = styled.div`
    width: 100%;
    height: 60%;
`

export default function Card({style, heading=<></>, children, actions=<></>, width=300, height=300 }){
    return (
        <Container 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            style={{width, height, padding: 20, ...styles.card, ...style}}
        >
            <CardHeading>
                <Container width="100%">
                    {heading}
                </Container>
            </CardHeading>
            <CardContent>
                {children}
            </CardContent>
            <Container width="100%" height="20%" alignItems="flex-end" justifyContent="flex-end">
                {actions}
            </Container>
        </Container>
    )
}

const styles = {
    card: {
        background: 'rgb(236, 236, 236)',
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
    }
}