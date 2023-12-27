
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/ApiServices';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();

            // Gọi lại func này ở thằng cha để call lại API get lại data
            // await props.fetchListUser();

            props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(1);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal backdrop="static" show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Are you sure delete user email: ${dataDelete.email} ?`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser;