import { useContext, useState, useLayoutEffect } from "react";
import { AppContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import { addCategorieRequest, deleteCategorieRequest, updateCategorieRequest } from '../services/categories-requests';
import { getUserCategoriesRequest } from "../services/user-requests";
import CategorieForm from "../components/forms/CategorieForm";
import BaseModal from "../components/BaseModal";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { Container, Button } from "../components/styled-components/exports";
import { BiPencil, BiTrash, BiPlus } from 'react-icons/bi';
import { confirmAlert } from "react-confirm-alert";

export default function Categories({ }) {
    const { storedUser } = useContext(AppContext);

    const [formModalOpen, setFormModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState({});

    const getUserCategories = () => {
        return getUserCategoriesRequest(storedUser)
            .then(res => setCategories(res))
            .catch(error => toast.error(error.toString()));
    }

    const addCategorie = (name) => {
        return addCategorieRequest(storedUser, { name })
            .then(getUserCategories)
            .catch(error => toast.error(error.toString()));
    }

    const updateCategorie = (name) => {
        return updateCategorieRequest(storedUser, selectedCategorie.id, name)
            .then(getUserCategories)
            .catch(error => toast.error(error.toString()));
    }

    const deleteCategorie = (categorie) => {
        return deleteCategorieRequest(storedUser, categorie.id)
            .then(getUserCategories)
            .catch(error => toast.error(error.toString()));
    }

    useLayoutEffect(() => {
        getUserCategories();

    }, [])

    return (
        <>
            <ToastContainer />
            <NavBar/>
            <Button onClick={() => setFormModalOpen(true)}>Add categorie</Button>

            <ModalCategorieForm 
                open={formModalOpen} 
                onClose={() => setFormModalOpen(false)} 
                title="Add catgories"
                onSubmit={addCategorie}
            />
            <ModalCategorieForm 
                open={updateModalOpen} 
                onClose={() => setUpdateModalOpen(false)} 
                title="Update catgorie"
                onSubmit={updateCategorie}
            />

            <h1>My Categories</h1>
            <Container>
                {categories && categories.map((categorie, index) => (
                    <CategorieCard 
                        key={index}
                        categorie={categorie} 
                        onDelete={() => {
                            confirmAlert({
                                title: 'Confirm to submit',
                                message: 'Are you sure you want to delete this message?',  
                                closeOnEscape: true,
                                buttons:[
                                    {
                                        label: 'Ok',
                                        onClick: () => deleteCategorie(categorie)
                                    },
                                    {
                                        label: 'Cancel',
                                    },
                                ]
                            })
                        }}
                        onUpdate={() => {
                            setSelectedCategorie(categorie);
                            setUpdateModalOpen(true);
                        }}
                    />
                ))}
            </Container>
        </>
    )
}

const ModalCategorieForm = ({ open, onClose, onSubmit, defaults, title }) => {
    return (
        <BaseModal
            isOpen={open}
            onRequestClose={onClose}
        >
            <CategorieForm onSubmit={onSubmit} defaults={defaults} title={title} />
        </BaseModal>
    )
}

const CategorieCard = ({ categorie, onDelete, onUpdate }) => {
    return (
        <Card
            width={250}
            style={{alignItems: 'flex-start', justifyContent: 'space-evenly', margin: '10px'}}
            height='auto'
            actions={
                <>
                    <Button color="success" onClick={onUpdate}><BiPencil/></Button>
                    <Button color="danger" onClick={onDelete}><BiTrash/></Button>
                </>
            }
            heading={
                <>
                    <h4>{categorie.name}</h4>
                </>
            }
        />
    )
}