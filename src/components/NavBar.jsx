import { useState, useContext, useEffect } from "react";
import { StyledLink, Button } from '../components/styled-components/exports';
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import '../assets/css/NavBar.css';
import { AppContext } from './../App';

function NavBar() {
    const { storedUser } = useContext(AppContext);
    const [navOpen, setNavOpen] = useState(false);

    return (
        <nav className="navbar">
            <Button color="white" marginX="0px" onClick={() => setNavOpen(true)}>
                <AiOutlineBars size="20px" />
            </Button>
            <small>Logged in: {storedUser.username}</small>
            <div className={navOpen ? "sidebar-container" : "sidebar-container sidebar-closed"}>
                <Button link onClick={() => setNavOpen(false)} className="close-btn">
                    <AiOutlineClose size="20px" />
                </Button>
                <br />
                <br />
                <StyledLink className="sidebar-item" color="white" to="/my-account">My account</StyledLink>
                <StyledLink className="sidebar-item" color="white" to="/home">Home</StyledLink>
                <StyledLink className="sidebar-item" color="white" to="/categories">Categories</StyledLink>
                <StyledLink className="sidebar-item" color="white" to="/logout">Logout</StyledLink>
            </div>
        </nav>
    );
}

export default NavBar;