import React, { useState } from 'react'
import './login.css'
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'

function Login() {

    let navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault();
        
        let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        let exist = usersData.length &&
          JSON.parse(localStorage.getItem(`usersData`)).some(data => data.username.toLowerCase() == username.toLowerCase() && data.password == password);
      
        if (!exist) {
          e.preventDefault();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Incorrect credintials!'
          })
          localStorage.setItem('logged', `${JSON.stringify(null)}`);
        }
        else {
          localStorage.setItem('logged', `${JSON.stringify(username.toLowerCase())}`);
          navigate('/todo')
        }
      }

      const registered = ()=> {
          navigate('/register')
      }


    return (
        <main className="main-cont">
        <div className="container">
          <div className="header">
            <h2>Sign in</h2>
          </div>
          <form id="form" className="form" onSubmit={signIn}>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={(e)=>{setUsername(e.target.value)}}/>
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small id="result">Error message</small>
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
            <button type="submit" className="log-btn">Sign in</button>
            <p className="font">Don't have an account?</p>
            <button type="button" className="reg-btn" onClick={registered}>Register</button>
          </form>
        </div>
      </main>
    )
}

export default Login
