import { useState } from 'react'
import './Login.scss'
import { useNavigate } from "react-router-dom"
import { postLogin } from '../../services/apiService'
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTachometerAlt, FaGem, FaLowVision } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [togglePassword, setTogglePassword] = useState(false)
    const navigate = useNavigate()
    const handleClick = async () => {
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
        const data = await postLogin(email, password)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    const handleTogglePassword = () => {
        setTogglePassword(!togglePassword)
    }
    return (
        <>
            <div className="header">
                <span>Don't have an account yet?</span>
                <button type="button" className="btn btn-outline-dark btnSignup" onClick={() => navigate('/sign-up')}>Sign up</button>
            </div>
            <div className="content">
                <h1 className="title">Dev Pham</h1>
                <h2 className="sub-title">Hello, who's this?</h2>
                <div className='formLogin'>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
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

                    <a className="forgotPassword">Forgot password ?</a>

                    <button type="button" className="btn btn-primary" onClick={handleClick}>Login to Home Page</button>

                    <a onClick={() => { navigate('/') }} className="backHomepage"> &#60;&#60;Go to homepage</a>

                </div>
            </div>
        </>
    );
}

export default Login;