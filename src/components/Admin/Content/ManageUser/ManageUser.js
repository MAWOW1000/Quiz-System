import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import TableUser from "./TableUser";

import { useEffect, useState } from "react";
import { getAllUser, getAllUserPaginate } from "../../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

function ManageUser() {
    const [showModal, setShowModal] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [listUser, setListUser] = useState([])
    const [userClick, setUserClick] = useState({})
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(5)
    useEffect(() => {
        fetchAllUsersPaginate();
    }, [page])

    const fetchAllUsers = async () => {
        try {
            const data = await getAllUser();
            if (data && data.EC === 0) {
                setListUser(data.DT);
            } else if (data && data.EC > 0) {
                console.error('Error fetching users:', data.EM); // Display the error message
            }
        } catch (error) {
            console.error('Error fetching users:', error); // Catch any network or other errors
        }
    };

    const fetchAllUsersPaginate = async () => {
        try {
            const data = await getAllUserPaginate(page, 9);
            if (data && data.EC === 0) {
                setListUser(data.DT.users);
                setTotalPage(data.DT.totalPages);
            } else if (data && data.EC > 0) {
                console.error('Error fetching users:', data.EM); // Display the error message
            }
        } catch (error) {
            console.error('Error fetching users:', error); // Catch any network or other errors
        }
    };
    return (
        <>
            <div className="manageUser__header">
                <h1 className="title">ManageUser</h1>
            </div>
            <div className="manageUser__content">
                <button onClick={() => { setShowModal(!showModal) }} className="btn btn-primary addUserBtn">Add new user</button>
                <div className="tableUser">
                    <TableUserPaginate totalPage={totalPage} setUserClick={setUserClick} setShowModalUpdate={setShowModalUpdate} setShowModalDelete={setShowModalDelete} listUser={listUser} setPage={setPage} />
                </div>
            </div>
            <ModalCreateUser fetchAllUsers={fetchAllUsersPaginate} show={showModal} handleClose={setShowModal} />
            <ModalUpdateUser show={showModalUpdate} handleClose={setShowModalUpdate} fetchAllUsers={fetchAllUsersPaginate} userClick={userClick} />
            <ModalDeleteUser show={showModalDelete} handleClose={setShowModalDelete} fetchAllUsers={fetchAllUsersPaginate} userClick={userClick} />
        </>

    );
}

export default ManageUser
