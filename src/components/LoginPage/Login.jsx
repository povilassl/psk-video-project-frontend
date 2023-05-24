import { Link } from "react-router-dom"
import { loginUser } from "../../services/user_endpoints/userInteractions"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../services/user_redux/store"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import Cookies from "js-cookie"

const LoginState = ({state}) => {
    const notifyError = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);

    return (
        <div className="login_state">
            {state === 'failed' && notifyError("Error in log in")  && null}
            {state === 'loading' && <div className="loaderDiv"><span className="small_loader"></span></div>}
            {state === 'success' && notifySuccess("Log in successful") && null}
        </div>
    )
}

export const Login = () => {

    const dispatch = useDispatch();

    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('')
    const [state, setState] = useState('')
    const navigate = useNavigate();

    const handleLogin = async () => {
        setState('loading')

        loginUser(username, pass)
            .then((response) => {

                if(response.status === 200){

                    setState('success')

                    let usr = username
                    localStorage.setItem('user', JSON.stringify(usr))

                    let date = new Date(); // current date
                    date.setDate(date.getDate() + 10); // add 10 days to the current date
                    let isoString = date.toISOString();
                    localStorage.setItem('expiration', JSON.stringify(isoString))
                    
                    dispatch(login(usr))

                    navigate('/login') 
                }
                
            })
            .catch((err) => {
                console.error(err)
                setState('failed')})
    }

    useEffect(() => {
        if (state === 'failed') 
            setState(''); 
      }, [state]);


    return (
        <div className="card-front">
            <LoginState state={state} />
            <div className="center-wrap">
                <div className="inputSection">
                    <h3>Log In</h3>
                    <div className="form-group">
                        <input type="username" className="form-style" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-style" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button onClick={() => handleLogin()} className="btn">Login</button>
                    <p><Link to={"/password_change"} className="link">Want to change your password?</Link></p>
                </div>
            </div>
        </div>
    )
} 