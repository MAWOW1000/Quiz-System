import ReactPaginate from 'react-paginate';

function TableUserPaginate(props) {
    const {totalPage, setPage, listUser, setShowModalUpdate, setUserClick, setShowModalDelete } = props
    const handlePageClick = (selected) => {
        setPage(+selected.selected + 1)
    }
    return (
        <>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(listUser && listUser.length > 0) ?
                        (listUser.map((user, index) => {
                            return (<tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-primary">View</button>
                                    <button onClick={() => (setShowModalUpdate(true), setUserClick(user))} className="btn btn-info mx-3">Update</button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => (setShowModalDelete(true), setUserClick(user))}
                                    >Delete</button>
                                </td>
                            </tr>)
                        }))
                        :
                        (<tr><td style={{ textAlign: "center" }} colSpan='5'>Not found user</td></tr>)
                    }
                </tbody>
            </table>
            <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="<Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.page -1}
            />
        </>
    );
}

export default TableUserPaginate;