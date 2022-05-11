import { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Loader } from '../styled-components/exports';

export default function CategorieForm({ onSubmit, defaults={}, title="Add categorie" }){
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitData = e => {
        e.preventDefault();
        setLoading(true);
        onSubmit(name)
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }

    useEffect(() => {
        if(!defaults.name) return;
        setName(defaults.name);
    }, [defaults])

    return (
        <Form onSubmit={onSubmitData}>
             <h1>{title}</h1>
            <Input
                required
                value={name}
                placeholder="Categorie name"
                onChange={e => setName(e.target.value)}
            />
            {loading ? <Loader/> : <Button color="gray" type="submit">{title}</Button>}
        </Form>
    )
}