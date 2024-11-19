import React, { useRef } from 'react';
import styles from '../../styles/SignIn.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../authContext';

export default function SignUp() {

    const navigate = useNavigate();
    const nameref = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { createUser } = useAuthValue();

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name : nameref.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
        }
        createUser(data);
        navigate('/signin')

    }

  return (
      <div className={styles.mainContainer}>
          <div className={styles.inputForm}>
              
              <h1> SignUp </h1>

              <form action='' onSubmit={handleSubmit}>
                  
                  <input type='text' placeholder='Name' required ref={nameref}/>
                  <input type='email' placeholder='Email' required ref={emailRef}/>
                  <input type='password' placeholder='Password' required ref={passwordRef}/>
                  <button> Submit </button>

              </form>
              
          </div>
    </div>
  )
}
