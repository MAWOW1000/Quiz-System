import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../../services/apiService';
import { Bounce, toast } from 'react-toastify';

function ModalDeleteUser(props) {
  const { show, handleClose, fetchAllUsers, userClick } = props;
  const handleDelete = async () => {
    try {
      const data = await deleteUser(userClick.id);
      if (data && data.EC === 0) {
        toast.success(data.EM);
      }
      if (data && data.EC > 0) {
        toast.error(data.EM);
      }
      await fetchAllUsers();
      handleClose(!show)
    } catch (e) {
      toast.error("Internal Server Error");
    }
  }
  return (
    <>
      <Modal show={show} onHide={() => handleClose(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want delete this user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You want delete user <b>{userClick.username}</b> with email is <b>{userClick.email}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(!show)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;