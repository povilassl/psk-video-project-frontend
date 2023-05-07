import { useUser } from "./UserContext"
import { Link } from "react-router-dom"
import { loginUser } from "../../services/user_endpoints/userInteractions"
import { useState } from "react"

const LoginState = (state) => {
    return (
        <div className="register_state">
            {state === 'failed' && <p><i style={{color:'var(--error-color)'}}>Error in log in</i></p>}
            {state === 'loading' && <p><i style={{color:'var(--info-color)'}}>Logging in...</i></p>}
            {state === 'success' && <p><i style={{color:'var(--success-color)'}}>Log in successful</i></p>}
        </div>
    )
}

export const Login = () => {
    const {user, setUser} = useUser()

    const [pass, setPass] = useState('');

    const handleLogin = () => {
        setUser({...user, state: 'loading'})

        loginUser(user.username, pass)
            .then((response) => setUser({...user, state: 'success'}))
            .catch((error) => setUser({...user, state: 'failed'}))
    }

    return (
        <div className="card-front">
            <LoginState state={user.state}/>
            <div className="center-wrap">
                <div className="inputSection">
                    <h3>Log In</h3>
                    <div className="form-group">
                        <input type="username" className="form-style" placeholder="Username" onChange={(e) => setUser({...user, username: e.target.value})}/>
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-style" placeholder="Password" onChange={(e) => setPass(e.target.value)}/>
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button onClick={() => handleLogin()} className="btn">Login</button>
                    <p><Link to={"/password_change"} className="link">Want to change your password?</Link></p>
                </div>
            </div>
        </div>
    )
} 