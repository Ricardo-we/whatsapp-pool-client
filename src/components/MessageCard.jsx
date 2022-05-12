import Card from "./Card"
import { confirmAlert } from "react-confirm-alert"
import { Button, Container } from '../components/styled-components/exports';
import { BiPencil, BiTrash, BiSend, BiCopy } from 'react-icons/bi';
import { sendMessageToWhatsapp } from "../services/messages-requests";
import { useContext, useState } from "react";
import { AppContext } from './../App';
import { toast } from 'react-toastify';
import { BaseTheme } from "./styled-components/ThemeProvider";

export const MessageCard = ({ message, onUpdate, onDelete }) => {
    const { storedUser } = useContext(AppContext)
    const [copied, setCopied] = useState(false);

    const onDelete_ = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this message?',  
            closeOnEscape: true,
            buttons:[
                {
                    label: 'Ok',
                    onClick: onDelete
                },
                {
                    label: 'Cancel',
                },
            ]
        })
    }

    const uploadMessage = () => {
        if(!message.message_to_number) return toast.warning(`${message.message_to} number, not registered`)
        window.open(`https://wa.me/${message.message_to_number}?text=${message.message}`)
    }
    
    return (
        <Card 
            width="80%" 
            height="auto"
            actions={
                <>
                    <Button marginX="0" color="success" onClick={onUpdate}>
                        <BiPencil/>
                    </Button>
                    <Button marginX="0px" color="danger" onClick={onDelete_}>
                        <BiTrash/>
                    </Button>
                    <Button marginX="0px" color="info" onClick={uploadMessage}>
                        <BiSend/>
                    </Button>
                    <Button 
                        marginX="0px" 
                        color="info" 
                        onClick={() => {
                            setCopied(true);
                            navigator.clipboard.writeText(message.message)
                                .then(() => setTimeout(() => setCopied(false), 1000))
                                .catch(error => toast.error(error.toString()));
                        }}
                    >
                        {copied ? 'copied!' : <BiCopy/>}
                    </Button>
                </>
            } 
        >
            <Container flexDirection="column" alignItems="flex-start">
                <p>{message.message}</p>
                <small>Message to: {message.message_to}</small>
                <strong style={{color: BaseTheme.colors.primary}}>{message.categorie_name}</strong>
                <small><strong>{message.message_to_number}</strong></small>
            </Container>
        </Card>
    )
}