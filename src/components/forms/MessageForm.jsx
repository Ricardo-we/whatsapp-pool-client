import { useState, useEffect } from "react";
import { Input, Button, Form, Loader } from "../styled-components/exports";
import { ReCron } from "@sbzen/re-cron"
import CategoriesSelect from './../CategoriesSelect';

function MessageForm({ onSubmit, defaults = {}, title = "Add message", categories }) {
    const [message, setMessage] = useState('');
    const [message_to, setMessageTo] = useState('');
    const [message_to_number, setMessageToNumber] = useState('');
    const [categorie, setCategorie] = useState(0);
    const [message_interval, setMessageInterval] = useState(0);
    const [intervalSelectorOpen, setIntervalSelectorOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const onSubmitData = e => {
        e.preventDefault();
        setLoading(true)
        onSubmit({ message, message_to, categorie, message_to_number, message_interval })
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }

    useEffect(() => {
        if (!defaults.message || !defaults.message_to || !defaults) return
        setMessage(defaults.message);
        setMessageTo(defaults.message_to);
        setMessageToNumber(defaults.message_to_number);
        setMessage(defaults.message_type);
        setMessageToNumber(defaults.message_type);
        setCategorie(defaults.categorie);
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
                value={message_to}
                placeholder="Message to"
                onChange={e => setMessageTo(e.target.value)}
            />
            <Input
                value={message_to_number}
                placeholder="Message to number"
                type="tel"
                onChange={e => setMessageToNumber(e.target.value)}
            />
            <Button color="info" width="100%" onClick={() => setIntervalSelectorOpen(prev => !prev)}>
                Select interval
            </Button>

            {intervalSelectorOpen && (
                <ReCron
                    value={message_interval}
                    onChange={e => setMessageInterval(e)}
                />
            )}
            <CategoriesSelect
                categories={categories}
                value={categorie}
                onChange={e => setCategorie(e.target.value)}
            />
            {loading ? <Loader /> : <Button type="submit" color="gray">{title}</Button>}
        </Form>
    );
}

export default MessageForm;