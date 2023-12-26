import ModalCreateUser from "./ModalCreateUser";
import { CgAdd } from "react-icons/cg";
import './ManageUser.scss'
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from '../../../services/ApiServices'
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalShowUser, setShowModalShowUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});

    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickBtnShow = (user) => {
        setShowModalShowUser(true);
        setDataView(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

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
                    <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnShow={handleClickBtnShow}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />

                <ModalViewUser
                    show={showModalShowUser}
                    setShow={setShowModalShowUser}
                    dataView={dataView}
                />
            </div>


        </div>
    )
}

export default ManageUser;