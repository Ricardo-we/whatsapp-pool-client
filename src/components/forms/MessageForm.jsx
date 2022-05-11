import { useState, useEffect } from "react";
import { Input, Button, Form, Loader } from "../styled-components/exports";
import CategoriesSelect from './../CategoriesSelect';

function MessageForm({ onSubmit, defaults={}, title="Add message", categories }) {
    const [message, setMessage] = useState('');
    const [messageTo, setMessageTo] = useState('');
    const [messageToNumber, setMessageToNumber] = useState('');
    const [selectedCategorie, setSelectedCategorie] = useState(0);
    const [loading, setLoading] = useState(false);

    const onSubmitData = e => {
        e.preventDefault();
        setLoading(true)
        onSubmit(message, messageTo, selectedCategorie, messageToNumber)
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    } 

    useEffect(() => {
        if(!defaults.message || !defaults.message_to || !defaults) return
        setMessage(defaults.message);
        setMessageTo(defaults.message_to);
        setMessageToNumber(defaults.message_to_number);
        setSelectedCategorie(defaults.categorie);
    }, [defaults])

    return ( 
        <Form onSubmit={onSubmitData}>
            <h1>{title}</h1>
            <Input
                required
                value={message}
                placeholder="Message"
                onChange={e => setMessage(e.target.value)}
            />
            <Input
                value={messageTo}
                placeholder="Message to"
                onChange={e => setMessageTo(e.target.value)}
            />
            <Input
                value={messageToNumber}
                placeholder="Message to number"
                type="tel"
                onChange={e => setMessageToNumber(e.target.value)}
            />
            <CategoriesSelect 
                categories={categories} 
                value={selectedCategorie} 
                onChange={e => setSelectedCategorie(e.target.value)}
            />

            {loading ? <Loader/> : <Button type="submit" color="gray">{title}</Button>}            
        </Form>            
    );
}

export default MessageForm;