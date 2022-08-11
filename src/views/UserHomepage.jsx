import { useState, useLayoutEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { Button, Container, Input } from "../components/styled-components/exports";
import { AppContext } from "../App";
import { getUserCategoriesRequest, getUserMessagesRequest } from "../services/user-requests";
import NavBar from "../components/NavBar";
import BaseModal from "../components/BaseModal";
import MessageForm from "../components/forms/MessageForm";
import { BiPlus } from 'react-icons/bi';
import { addMessageRequest, deleteMessageRequest, updateMessageRequest } from "../services/messages-requests";
import CategoriesSelect from "../components/CategoriesSelect";
import { MessageCard } from "../components/MessageCard";

export function UserHomepage({ }) {
    const navigate = useNavigate();
    const { storedUser } = useContext(AppContext);

    const [categories, setCategories] = useState();
    const [userMessages, setUserMessages] = useState([]);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [createMessageModalOpen, setCreateMessageModalOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState({});
    const [search, setSearch] = useState('');
    const [filterByCategorie, setFilterByCategorie] = useState(0);

    const getCategories = () => {
        return getUserCategoriesRequest(storedUser)
            .then(res => setCategories(res))
    }

    const addMessage = (data) => {
        return addMessageRequest(storedUser, data)
            .then(getUserMessages)
            .catch(error => toast.error(error.toString()));
    }

    const updateMessage = (message, messageTo, categorie_id, message_to_number) => {
        const messageData = { message, message_to: messageTo, categorie_id, message_to_number }
        return updateMessageRequest(storedUser, selectedMessage.id, messageData)
            .then(getUserMessages)
            .catch(error => toast.error(error.toString()));
    }

    const getUserMessages = () => {
        return getUserMessagesRequest(storedUser)
            .then(res => setUserMessages(res))
            .catch(error => toast.warn(error.toString()));
    }

    const deleteMessage = (message) => {
        return deleteMessageRequest(storedUser, message.id)
            .then(getUserMessages)
            .catch(error => toast.error(error.toString()));
    }

    useLayoutEffect(() => {
        if (!storedUser.id || !storedUser.auth_token) return navigate('/')
        getUserMessages();
        getCategories()
    }, [])

    return (
        <>
            <NavBar />
            <ToastContainer />

            <Container width="100%">
                <Input onChange={e => setSearch(e.target.value.toLocaleLowerCase())} placeholder="Search messages" />
                <CategoriesSelect
                    width="100%"
                    categories={categories}
                    value={filterByCategorie || "0"}
                    onChange={e => setFilterByCategorie(parseInt(e.target.value))}
                />
            </Container>

            <Button link onClick={() => setCreateMessageModalOpen(true)}>
                <BiPlus size="25px" />
            </Button>

            <MessageFormModal
                defaults={selectedMessage}
                title="Update message"
                open={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                onSubmit={updateMessage}
                categories={categories}
            />
            <MessageFormModal
                title="Add message"
                open={createMessageModalOpen}
                onClose={() => setCreateMessageModalOpen(false)}
                onSubmit={addMessage}
                categories={categories}
            />

            {userMessages &&
                userMessages
                    .filter(message => filterByCategorie && filterByCategorie >= 0 ? message.categorie === filterByCategorie : true)
                    .filter(message => message.message.toLowerCase().includes(search))
                    .map((message, index) => (
                        <MessageCard
                            key={index}
                            message={message}
                            onUpdate={() => {
                                setSelectedMessage(message);
                                setUpdateModalOpen(true);
                            }}
                            onDelete={() => deleteMessage(message)}
                        />
                    ))
            }
        </>
    )
}

const MessageFormModal = ({ open, onClose, onSubmit, defaults, title, categories }) => {
    return (
        <BaseModal
            isOpen={open}
            onRequestClose={onClose}
        >
            <MessageForm onSubmit={onSubmit} defaults={defaults} title={title} categories={categories} />
        </BaseModal>
    )
}

