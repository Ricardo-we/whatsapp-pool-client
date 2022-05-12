import { useContext, useEffect } from "react";
import { AppContext } from './../App';
import { useNavigate } from "react-router-dom";

function Redirect({ to="", logout }) {
    const navigate = useNavigate();
    const { setStoredUser } = useContext(AppContext)

    useEffect(() => {
        if(logout) setStoredUser({});
        navigate(to);
    }, [])
}

export default Redirect;