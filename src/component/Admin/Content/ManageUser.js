import ModalCreateUser from "./ModalCreateUser";
import { CgAdd } from "react-icons/cg";
import './ManageUser.scss'
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    return (
        <div className="manage-user-container">
            <div className="title">
                Manager User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
                        <CgAdd /> Add new user
                    </button>
                </div>
                <div>
                    <TableUser />

                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />
            </div>


        </div>
    )
}

export default ManageUser;