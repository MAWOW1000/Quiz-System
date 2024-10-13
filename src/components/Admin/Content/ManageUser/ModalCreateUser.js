import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalCreateUser.scss'
import { FcPlus } from "react-icons/fc";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postCreateUser } from '../../../../services/apiService';

function ModalCreateUser(props) {
  const {setPage, show, handleClose, fetchAllUsers } = props;

  const handleCloseNew = () => {
    handleClose(!show);
    setEmail('')
    setPassword('')
    setUsername('')
    setRole('')
    setImage('') 
    setPreviewImage(false)
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(false);

  const handleImage = (e) => {
    if (e.target.files[0] && e.target && e.target.files) {
      setImage(e.target.files[0])
      setPreviewImage(true)
    }
  }

  const handleSubmit = async () => {
    //validate
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    if (!validateEmail(email)) {
      toast.error("Email dosen't valid!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return
    }
    if (!password) {
      toast.error("Password dosen't valid!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return
    }
    //submit form
    const data = await postCreateUser(email, password, username, role, image)
    if (data && data.EC === 0) {
      setPage(1);
      toast.success(data.EM, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      await fetchAllUsers();
      handleCloseNew()
    }
    if (data && data.EC > 0) {
      toast.error(data.EM, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleCloseNew} size="xl" backdrop='static' className='modalCreateUser'>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>

        <Modal.Body className='modalCreateUser__body'>
          <form className='modalCreateUser__form'>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <div className='row'>
              <div className="form-group col-md-6">
                <label>User name</label>
                <input type="text" className="form-control" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="form-group col-md-6">
                <label>Role</label>
                <select id="inputState" className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                  <option value='User'>User</option>
                  <option value='Admin'>Admin</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className='addImage' htmlFor='addPreviewImage'>
                <FcPlus />
                Add Image
              </label>
              <input onChange={(e) => { handleImage(e) }} type='file' hidden id='addPreviewImage' />
            </div>

            <div className="form-group previewImage">
              {previewImage ?
                <img className='image' src={URL.createObjectURL(image)} />
                :
                <h1>Preview Image</h1>
              }
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNew}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;