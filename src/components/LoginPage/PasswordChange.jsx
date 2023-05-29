import { changePassword } from "../../services/user_endpoints/userInteractions";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom"
import "../../css/UsersPages/passwordChange.css";

export function PasswordChange() {
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [username, setUsername] = useState('')
    const [state, setState] = useState('')
    const navigate = useNavigate();
    const usernamePattern = /^[a-zA-Z0-9]{5,19}$/;
    const userPt = "^[a-zA-Z0-9]{5,19}$" //nes su regex nesuveikia prie input pattern
    const passPattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?:{}|<>]).{9,19}/;
    const passPt = "(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?:{}|<>]).{9,19}"


    const handleChange = (e) => {
        e.preventDefault();
        setState('loading')
        if (!username || !pass || !newPass) {
            toast.error("Fields cannot be empty");
            setState('')
            return;
        }

        if (!usernamePattern.test(username) || !passPattern.test(pass) || !passPattern.test(newPass)) {
            toast.error("Your fiels are not valid");
            setState('')
            return;
        }

        changePassword(username, pass, newPass)
            .then((response) => {

                if (response.status === 200) {

                    setState('success')
                    toast.success("you successfully change your password")
                    navigate('/login')
                }

            })
            .catch((err) => {
                toast.error("Something went wrong")
                setState('failed')
            })
    }

    return (
        <div className="passdDiv">
            <div className="passCard">
                {state === 'loading' && <div className="loaderDiv"><span className="small_loader"></span></div>}
                <div className="passInputSection">
                    <h3>Change your password</h3>
                    <form onSubmit={handleChange}>
                        <div className="form-group">
                            <input type="username"
                                className="passInput"
                                placeholder="Username"
                                pattern={userPt}
                                title='you can only use letters and numbers'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="passInputGroup">
                            <input type="password"
                                className="passInput"
                                placeholder="Password"
                                pattern={passPt}
                                title="Password must contain an upper-case letter, a lower-case letter, a special symbol like ?/*..., and be 9-19 characters long"
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <div className="passInputGroup">
                            <input type="password"
                                className="passInput"
                                placeholder="New password"
                                pattern={passPt}
                                title="Password must contain an upper-case letter, a lower-case letter, a special symbol like ?/*..., and be 9-19 characters long"
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button type="submit"
                            className="passBtn">Change password</button>
                    </form>
                    <p><Link to={"/login"} className="link">Back to login</Link></p>
                </div>
            </div>
        </div>
    );
}