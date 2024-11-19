import React, { useRef } from 'react';
import styles from "../../styles/SignIn.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../authContext';


export default function SignIn() {

    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { SignIn } = useAuthValue();

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        const status = await SignIn(data);
        {status? navigate('/') : navigate('/signin')}
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.inputForm}>

                <h1>SignIn</h1>

                <form action='' onSubmit={handleSubmit}>

                    <input type='email' placeholder='Enter Email....' required ref={emailRef}/>

                    <input type='password' placeholder='Enter Password....' required ref={passwordRef}/>

                    <button> Submit </button>
                </form>

                <br />

                <span> or &nbsp; </span>

                <NavLink to="/signup"> Create New Account </NavLink>

            </div>

        </div>
    )
}
