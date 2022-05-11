import { useState, useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button, Container, Input } from '../components/styled-components/exports';
import { createUserRequest, loginRequest } from '../services/user-requests.js';
import { toast, ToastContainer } from 'react-toastify';

export default function Login({ ...props }) {
    const navigate = useNavigate();
    const { storedUser, setStoredUser } = useContext(AppContext);

    const [signUpOpen, setSignUpOpen] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const onLogin = () => {
        if (!username || !password) return toast.warn('Ops... some inputs arent filled')
        return loginRequest(username, password)
            .then(res => {
                if (res.error) throw new Error(res.error)
                setStoredUser(res);
                navigate('/home')
            })
            .catch(error => toast.warning('Opps...' + error.toString()));
    }

    const onSignUp = () => {
        if (!username || !password || !email) return toast.warn('Ops... some inputs arent filled')
        return createUserRequest(username, password, email, phoneNumber)
            .then(res => {
                if (res.error) throw new Error(res.error)
                setStoredUser(res);
                navigate('/home')
            })
            .catch(error => toast.warning('Opps...' + error.toString()))
            ;
    }

    useLayoutEffect(() => {
        if (storedUser.id && storedUser.username && storedUser.auth_token) navigate('/home');
    }, [])

    return (
        <>
            <ToastContainer />
            <form style={{ width: '100%' }} onSubmit={e => e.preventDefault()}>
                <Container width="70%">
                    <h2>Login</h2>
                    <Input
                        required
                        onChange={e => setUsername(e.target.value)}
                        placeholder={signUpOpen ? "Username or email" : "Username"}
                    />
                    <Input
                        required
                        placeholder="Password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        onChange={e => setEmail(e.target.value)} 
                        hidden={signUpOpen}
                    />
                    <Input
                        placeholder="Phone number"
                        type="tel"
                        onChange={e => setPhoneNumber(e.target.value)} 
                        hidden={signUpOpen}
                    />
                    <Button disabled={!signUpOpen} color="info" width="100%" onClick={onLogin}>Login</Button>
                    <Button disabled={signUpOpen} color="secondary" width="100%" onClick={onSignUp}>
                        Sign up
                    </Button>
                    <Button link onClick={() => setSignUpOpen(prev => !prev)}>
                        {!signUpOpen ? 'Already have an account?' : 'Not have an account yet?'}
                    </Button>
                </Container>
            </form>
        </>
    )
}

const styles = {
    visible: {
        display: 'inline-block'
    },
    dnone: {
        display: 'none'
    }
}