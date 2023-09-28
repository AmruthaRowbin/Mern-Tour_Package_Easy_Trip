
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { googleregister } from "../../../redux/features/userrSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import './google.css';

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export default function GoogleLogin() {
    const [formValue, setFormValue] = useState(initialState)
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useSelector((state) => state.userr);
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const handleClick = () => {

        signInWithPopup(auth, provider).then((data) => {
            setEmail(data.user.email);
            setName(data.user.displayName);
            const email = data.user.email;
            const name = data.user.displayName;
            const userdata = { email, name };
           dispatch(googleregister({ userdata, navigate, toast }))
            
        })
    }
console.log(name,'uuuuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiuuuuuuuuuuuuuuuuuuuu')
console.log(email,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    useEffect(() => {
        if (user) {
            setRedirect('/')
        }
    }, [user])


 
    return (
        <div>
        <button class="google-signin-button" onClick={handleClick}>
          <span class="google-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                fill="#4285F4"
                d="M17.64 9.204c0-.633-.057-1.244-.163-1.84H9v3.482h4.849a4.14 4.14 0 01-1.806 2.717v2.264h2.916c1.71-1.577 2.693-3.896 2.693-6.623z"
              ></path>
              <path
                fill="#0F9D58"
                d="M9 18c2.45 0 4.49-.818 5.976-2.217l-2.916-2.264c-.81.546-1.847.872-3.06.872-2.347 0-4.343-1.587-5.046-3.722H.957v2.336A8.997 8.997 0 009 18z"
              ></path>
              <path
                fill="#F4B400"
                d="M3.954 10.712a5.41 5.41 0 010-3.425V4.951H.957A8.978 8.978 0 000 9c0 1.447.348 2.823.957 4.049l2.997-2.337z"
              ></path>
              <path
                fill="#DB4437"
                d="M9 3.058c1.321 0 2.51.454 3.451 1.345l2.583-2.583C13.488.818 11.45 0 9 0A8.997 8.997 0 00.957 4.951L3.954 7.29A5.41 5.41 0 019 3.058z"
              ></path>
            </svg>
          </span>
          Sign in with Google
        </button>
      </div>
      
    )
}


