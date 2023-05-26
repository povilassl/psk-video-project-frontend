import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserInfo, updateUserInfo } from "../../services/user_endpoints/userInteractions"
import "../../css/UsersPages/profilePage.css";
import { changeUsername } from '../../services/user_redux/store';
import { useDispatch } from 'react-redux';
import  ProfileConfirmPopup from '../UserPage/ProfileConfirmPopup';

export const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        lastInfoUpdateDateTime: '',
        state: null
    });
    const [showPopup, setShowPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const dispatch = useDispatch();

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
            notifyError("errorMsg");
    }
    
    const notifyError = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);

    const handlePopupClose = (value) => {
        setIsSubmitting(true);
        if(value)
        {
            updateUserInfo(user.username, user.email, user.firstName, 
                user.lastName, user.lastInfoUpdateDateTime, true)
                 .then((response) => {
                     setUser({ ...user, lastInfoUpdateDateTime: response.data.lastInfoUpdateDateTime, state: "success" })
                     localStorage.setItem('user', JSON.stringify(user.username));
                     notifySuccess("the changes were successful")
                     setShowPopup(false);

                     dispatch(changeUsername(user.username))
                 })
                 .catch((error) => {
                     if(error.response.status === 400)
                     {
                         handleErrorMsg(error.response.data)
                         setUser({ ...user, state: "data failed" })

                     }    
                     else
                     {
                         setUser({ ...user, state: "data failed" })
                     }
                 })
                 .finally(() => {
                    setIsSubmitting(false);
                }); 
        }
        else
        {
            getUserInfo()
            .then((response) => {
                setUser({...user, username: response.data.username,
                                  email: response.data.emailAddress,
                                  firstName: response.data.firstName,
                                  lastName: response.data.lastName,
                                  lastInfoUpdateDateTime: response.data.lastInfoUpdateDateTime})
                setShowPopup(false);
            })
            .catch((error) => {
                setUser({...user, state: "failed"})
            });
        }

      };


    useEffect(() => {
        getUserInfo()
            .then((response) => {
                setUser({...user, username: response.data.username,
                                  email: response.data.emailAddress,
                                  firstName: response.data.firstName,
                                  lastName: response.data.lastName,
                                  lastInfoUpdateDateTime: response.data.lastInfoUpdateDateTime})
            })
            .catch((error) => {
                setUser({...user, state: "failed"})
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const handleUpdateInfo = (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        updateUserInfo(user.username, user.email, user.firstName, 
                       user.lastName, user.lastInfoUpdateDateTime)
                        .then((response) => {
                            setUser({ ...user, lastInfoUpdateDateTime: response.data.lastInfoUpdateDateTime, state: "success" })
                            localStorage.setItem('user', JSON.stringify(user.username));
                            notifySuccess("the changes were successful")
                            console.log(response.data);
                            dispatch(changeUsername(user.username))
                        })
                        .catch((error) => {
                            if(error.response.status === 400)
                            {
                                handleErrorMsg(error.response.data)
                                setUser({ ...user, state: "data failed" })
                            }    
                            else if(error.response.status === 409) //jei koinfliktas
                            {   
                                setUser({ ...user, state: "conflict" })
                                setShowPopup(true)
                            }
                            else
                            {
                                setUser({ ...user, state: "data failed" })
                            }
                        })
                        .finally(() => {
                            setIsSubmitting(false);
                        });     
    };
        
    return (
        <div className="videoProfileDiv">
            {showPopup && <ProfileConfirmPopup key={showPopup.toString()} onPopupClose={handlePopupClose}/>}
            {user.state === "failed" && notifyError("something went wrong while uploading your data")}
            <div className="videoProfileCard">
                <img src="https://ionicframework.com/docs/img/demos/avatar.svg" 
                     className="profileLogo"
                     alt="avatar"/>
                <h1>Change your profile</h1>
                <div className="profileInputSection">
                    <form className='profileForm'>
                        <div className="profileFormGroup">
                            <input type="text" 
                                   className="profileInput" 
                                   placeholder="Username" 
                                   onChange={(e) => setUser({ ...user, username: e.target.value })}
                                   value= {user.username}
                                   pattern='^[a-zA-Z0-9]{5,19}$'
                                   title='you can only use letters and numbers'
                            />
                            <i className="profileInputIcon uil uil-user"></i>
                        </div>
                        <div className="profileFormGroup">
                            <input type="email" 
                                   className="profileInput" 
                                   placeholder="Email" 
                                   onChange={(e) => setUser({ ...user, email: e.target.value })}
                                   value={user.email}
                                   pattern='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
                                />
                            <i className="profileInputIcon uil uil-at"></i>
                        </div>
                                            
                        
                        <div className="profileFormGroup">
                            <input type="text" 
                                   className="profileInput" 
                                   placeholder="Name" 
                                   onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                   value={user.firstName} 
                                   pattern='^[a-zA-Z]{0,49}$'
                                   title='you can only use letters'
                            />
                            <i className="profileInputIcon uil uil-user"></i>
                        </div>
                        <div className="profileFormGroup">
                            <input type="text" 
                                   className="profileInput" 
                                   placeholder="Surname" 
                                   onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                   value={user.lastName}
                                   pattern='^[a-zA-Z]{0,49}$'
                                   title='you can only use letters'
                            />
                            <i className="profileInputIcon uil uil-user"></i>
                        </div>
                        <button className="profileBtn" 
                                type="submit" 
                                onClick={handleUpdateInfo}
                                disabled={isSubmitting}
                        >Submit changes</button>
                    </form>
                </div>
        </div>
    </div>

    )
}