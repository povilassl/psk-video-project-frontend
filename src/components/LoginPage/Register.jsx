import { useState, useEffect , useRef, useCallback   } from "react"
import { registerUser, isUsernameTaken } from "../../services/user_endpoints/userInteractions";
import { toast } from 'react-toastify';

const RegisterState = ({ state, err }) => {
    const notifyError = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);
    
    useEffect(() => {
        const handleErrorMsg = (errorMsg) => {
            if(errorMsg === 'BadEmail')
                notifyError("Your email is not valid");
            else if(errorMsg === 'BadUsername')
                notifyError("Your username is not valid");
            else if(errorMsg === 'BadFirstName')
                notifyError("Your first name is not valid");
            else if(errorMsg === 'BadLastName')
                notifyError("Your last name is not valid");
            else
                notifyError(errorMsg);
        }

        if (state === 'failed') {
            if(err.length > 0)
                handleErrorMsg(err);
            else
                notifyError('something went wrong, check your input data')
        } else if (state === 'taken') {
            notifyError("The username is taken");
        } else if (state === 'success') {
            notifySuccess("Your registration was successful");
        }
      }, [state, err]);

    return (
        <div className="register_state">
            {state === 'loading' && <div className="loaderDiv"><span className="small_loader"></span></div>}
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

    const [showRules, setShowRules] = useState(false);
    const [validPasswordRules, setValidRules] = useState([]);
    const [invalidEmail, setIvalidEmail] = useState(false);
    const [showEmail, setShowEmail] = useState(false); 
    const emailInputRef = useRef(null); 
    const passwordInputRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState(''); 

    const handleEmailClick = useCallback(() => {
        if (invalidEmail === true)
          setShowEmail(true);
      }, [invalidEmail]);
    

      useEffect(() => {
        var handleFocus = () => {
          handleEmailClick();
        }; 
        
        if (emailInputRef.current) {
          emailInputRef.current.addEventListener('focus', handleFocus);
        }
      }, [handleEmailClick]);
      
    
    const handleEmailBlur = () => {
        setShowEmail(false);
    };

    useEffect(() => {
        const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;
            setIvalidEmail(!emailRegex.test(user.email));

        
    }, [user.email, invalidEmail]);


    const handlePasswordClick = useCallback(() => {
        if (validPasswordRules.length > 0)
          setShowRules(true);
      }, [validPasswordRules]);

    const handleBlur = () => {
        setShowRules(false);
    };

    useEffect(() => {
        var handleFocus = () => {
            handlePasswordClick();
          }; 
          
          if (passwordInputRef.current) {
            passwordInputRef.current.addEventListener('focus', handleFocus);
          }
      }, [handlePasswordClick]);

    useEffect(() => {
    const regexArray = [
        {
        regex: /[A-Z]/, 
        message: 'Upper-case letter',
        },
        {
        regex: /[a-z]/, 
        message: 'Lower-case letter',
        }, 
        {
            regex: /[!@#$%^&*(),.?":{}|<>]/, 
            message: '1 special symbol',
        },
        {
            regex: /^(.{9,19})$/,
            message: 'More than 8 characters',
        }
    ];

    const validRules = regexArray.filter((rule) => !rule.regex.test(user.password));
    setValidRules(validRules);
    }, [user.password]);  

    

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
                        .catch((error) => {
                            setUser({ ...user, state: "failed" })
                            console.log(error.response)
                            console.log(error.response.data)
                            setErrorMsg(error.response.data)
                        })                    
                }
            })
            .catch((error) => setUser({ ...user, state: "failed" }))
    }

    return (
        <div className="card-back">
            <RegisterState state={user.state} err={errorMsg}/>
            <div className="center-wrap">
                <div className="inputSection">
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <input type="text" className="form-style" placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group">
                        <input type="email" 
                               className="form-style" 
                               placeholder="Email"
                               onChange={(e) => setUser({ ...user, email: e.target.value })}
                               onClick={handleEmailClick}
                               ref={emailInputRef}
                               onBlur={handleEmailBlur} />
                        <i className="input-icon uil uil-at"></i>
                    </div>
                    {showEmail && (<div>{invalidEmail === true ?  (
                    <span className="invalid">Email is invalid</span>) : null}</div>)}

                    <div className="form-group">
                        <input type="password" 
                               className="form-style" 
                               placeholder="Password" 
                               onChange={(e) => setUser({ ...user, password: e.target.value })}
                               onClick={handlePasswordClick}
                               ref={passwordInputRef}
                               onBlur={handleBlur}/>
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>

                    {showRules && (<div className="form-group">
                            {validPasswordRules.length > 0 ? (
                            <div className="password_div">
                                <span>Password must contain:</span>
                                    {validPasswordRules.map((rule, index) => (
                                    <span key={index} className="invalid">
                                        {rule.message}
                                </span>))}
                            </div>
                            ) : null}
                    </div>)}
                    
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