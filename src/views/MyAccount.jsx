import { useContext, useState } from "react";
import { AppContext } from "../App";
import { Container, List, ListItem, Form, Input, Button } from '../components/styled-components/exports';
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import { updateUserRequest } from "../services/user-requests";

function MyAccount() {
    const { storedUser, setStoredUser } = useContext(AppContext);

    const [username, setUsername] = useState(storedUser.username);
    const [password, setPassword] = useState(storedUser.password);
    const [phoneNumber, setPhoneNumber] = useState(storedUser.phoneNumber || '');

    const updateUser = e => {
        e.preventDefault()
        const updatedData = { username, password, phone_number: phoneNumber }
        return updateUserRequest(storedUser, updatedData)  
            .then(res =>{
                if(res.error) throw new Error(res.error)
                setStoredUser(res)
            })
            .catch(error => toast.error(error.toString()))
    }

    return (
        <>
            <ToastContainer/>
            <NavBar />
            <Form onSubmit={updateUser}>
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder={"Username"}
                />
                <Input
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <Input
                    value={phoneNumber}
                    placeholder="Phone number"
                    type="tel"
                    onChange={e => setPhoneNumber(e.target.value)}
                />
                <Button type="submit" color="gray" width="100%">Update user</Button>
            </Form>
        </>
    );
}

export default MyAccount;