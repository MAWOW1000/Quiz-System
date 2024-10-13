import './Signup.scss'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { postSignup } from '../../services/apiService'
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTachometerAlt, FaGem, FaLowVision } from 'react-icons/fa';

function Signup() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [togglePassword, setTogglePassword] = useState(false)

    const navigate = useNavigate()
    const handleSignup = async () => {
        const validateEmail = (email) => {
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
        if (!validateEmail(email)) {
            toast.error("Email dosen't valid!!");
            return
        }
        if (!password) {
            toast.error("Password dosen't valid!!");
            return
        }
        //submit form
        const data = await postSignup(email, username, password)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    const handleTogglePassword = () => {
        setTogglePassword(!togglePassword)
    }
    return (
        <div className='sign-up'>
            <div className="content">
                <h1 className="title">Dev Pham</h1>
                <h2 className="sub-title">Sign Up Account</h2>
                <div className='formLogin'>
                    <div className="form-group">
                        <label >Emai(*)</label>
                        <input type="email" className="form-control"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label >User name</label>
                        <input type="text" className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label >Password(*)</label>
                        <input
                            type={togglePassword ? 'text' : "password"}
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i onClick={handleTogglePassword} className='iconPassword'>
                            {!togglePassword ? <FaLowVision /> : <FaGem />}
                        </i>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={handleSignup}>Sign up free</button>

                    <a onClick={() => { navigate('/') }} className="backHomepage"> &#60;&#60;Go to homepage</a>

                </div>
            </div>
        </div>
    );
}

export default Signup;