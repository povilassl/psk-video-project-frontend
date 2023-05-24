import { useState } from "react"
import { registerUser, isUsernameTaken } from "../../services/user_endpoints/userInteractions";

const Checks = ({ password, email, username }) => {
    let checks = []

    // length is 8 - 20
    if (password.length < 8 || password.length > 20) checks.push("Invalid password length");

    // At least 1 uppercase character
    if (!/[A-Z]/.test(password)) checks.push("Password should have at least 1 uppercase character");

    // At least 1 lowercase character
    if (!/[a-z]/.test(password)) checks.push("Password should have at least 1 lowercase character");

    // At least 1 special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) checks.push("Password should have at least 1 special character");

    //email checker
    if(!/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/.test(email)) checks.push("Not valid email")

    //username length check
    if(username.length < 5) checks.push("Too short username")
    
    return (
        <div className="password_checks">
            {checks.map((check, index) => <p key={index}>{check}</p>)}
        </div>
    );
}

const RegisterState = ({ state }) => {
    return (
        <div className="register_state">
            {state === 'failed' && <p><i style={{color:'var(--error-color)'}}>Error in registration</i></p>}
            {state === 'taken' && <p><i style={{color:'var(--error-color)'}}>Username is taken</i></p>}
            {state === 'loading' && <span className="small_loader"></span>}
            {state === 'success' && <p><i style={{color:'var(--success-color)'}}>Registration successful</i></p>}
        </div>
    )
}

export const Register = () => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        state: null
    });

    const handleRegister = () => {
        setUser({ ...user, state: "loading" })

        isUsernameTaken(user.username)
            .then((responseU) => {
                console.log(responseU.data);
                if(responseU.data === true){
                    setUser({ ...user, state: "taken" })
                }
                else{
                    registerUser(user.username, user.email, user.password, user.firstName, user.lastName)
                        .then((response) => setUser({ ...user, state: "success" }))
                        .catch((error) => setUser({ ...user, state: "failed" }))                    
                }
            })
            .catch((error) => setUser({ ...user, state: "failed" }))
    }

    return (
        <div className="card-back">
            <Checks password={user.password} email={user.email} username={user.username}/>
            <RegisterState state={user.state} />
            <div className="center-wrap">
                <div className="inputSection">
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <input type="text" className="form-style" placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-style" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-style" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-style" placeholder="Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-style" placeholder="Surname" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <button className="btn mt-4" type="submit" onClick={() => handleRegister()}>Register</button>
                </div>
            </div>
        </div>

    )
}