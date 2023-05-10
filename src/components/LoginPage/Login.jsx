import { Link } from "react-router-dom"
import { loginUser } from "../../services/user_endpoints/userInteractions"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../services/user_redux/store"

const LoginState = (state) => {
    return (
        <div className="register_state">
            {state === 'failed' && <p><i style={{ color: 'var(--error-color)' }}>Error in log in</i></p>}
            {state === 'loading' && <span className="small_loader"></span>}
            {state === 'success' && <p><i style={{ color: 'var(--success-color)' }}>Log in successful</i></p>}
        </div>
    )
}

export const Login = () => {

    const dispatch = useDispatch();

    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('')
    const [state, setState] = useState('')

    const handleLogin = async () => {
        console.log("thing");
        setState('loading')

        await loginUser(username, pass)
            .then((response) => {
                setState('success')

                let usr = response.data
                localStorage.setItem('user', JSON.stringify(usr))
                dispatch(login(usr))
            })
            .catch((err) => setState('failed'))
    }

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