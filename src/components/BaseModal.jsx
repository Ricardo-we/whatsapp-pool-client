import Modal from 'react-modal';
import { Button } from './styled-components/Button';
import { AiOutlineClose } from 'react-icons/ai';

export default function BaseModal({ isOpen, onRequestClose, children, styles = {} }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{ content: defaultStyles.content, ...styles }}
            ariaHideApp={false}
            shouldCloseOnEsc
        >
            <Button style={defaultStyles.closeButton} onClick={onRequestClose} link>
                <AiOutlineClose size="25px"/>
            </Button>
            {children}
        </Modal>
    )
}

const defaultStyles = {
    closeButton: {
        position: 'absolute',
        right: '0px',
        top: '0px',
    },
    content: {
        backgroundColor: 'transparent',
        border: 'none',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    }
}