import { useContext, useLayoutEffect } from "react";
import { AppContext } from './../App';
import { useNavigate } from "react-router-dom";

function Redirect({ to="", logout }) {
    const navigate = useNavigate();
    const { setStoredUser } = useContext(AppContext)

    useLayoutEffect(() => {
        if(logout) setStoredUser({});
        navigate(to);
    }, [])

    return ( <></> );
}

export default Redirect;