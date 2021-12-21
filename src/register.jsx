import React, { useState } from 'react'
import './register.css'
import Swal from 'sweetalert2';

function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [state, setState] = useState('')

    // form.addEventListener('keyup', e => {
    //     e.preventDefault();
    //     checkInputs()
    // });
    // form.addEventListener('submit', e => {
    //     e.preventDefault();
    //     if (checkInputs())
    //         signUp();
    // });


    const checkInputs = () => {
        // trim to remove the whitespaces
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedPassword2 = password2.trim();

        const flags = [];

        if (trimmedUsername === '') {
            // setErrorFor(username, 'Username cannot be blank');
            setState(false)
            flags.push(false);
        } else {
            // setSuccessFor(username);
            setState(true)

            flags.push(true);
        }
        //
        if (trimmedEmail === '') {
            // setErrorFor(email, 'Email cannot be blank');
            flags.push(false);

        } else if (!isEmail(trimmedEmail)) {
            // setErrorFor(email, 'Not a valid email');
            flags.push(false);
            
        } else {
            // setSuccessFor(email);
            flags.push(true);

        }

        //
        if (trimmedPassword === '') {
            // setErrorFor(password, 'Password cannot be blank');
            flags.push(false);

        } else if (trimmedPassword.length < 6) {

            // setErrorFor(password, 'Password cannot be less than 6 characters');
            flags.push(false);

        } else {
            // setSuccessFor(password);
            flags.push(true);
        }
        //
        if (trimmedPassword2 === '') {
            // setErrorFor(password2, 'Password cannot be blank');
            flags.push(false);

        } else if (trimmedPassword2.length < 6) {

            flags.push(false);
            // setErrorFor(password2, 'Password cannot be less than 6 characters');
        } else {
            // setSuccessFor(password2);
            flags.push(true);
        }

        if (trimmedPassword !== trimmedPassword2) {
            // setErrorFor(password2, 'Passwords do not match');
            flags.push(false);
        }



        console.log(flags);
        // let flag = true;
        // if any flag is false, return false;
        for (let index = 0; index < flags.length; index++) {
            if (flags[index] === false) {
                // flag = false;
                return false;

            }
        }
        //if every flag is true return true;
        return true;
    }

    const signUp = (e) => {
        e.preventDefault();
        if (checkInputs()) {
            if (JSON.parse(localStorage.getItem('usersData'))) {
                let usersData = []
                usersData = JSON.parse(localStorage.getItem('usersData'));
                let exist = usersData.length && usersData.some(data => data.username.toLowerCase() === username.toLowerCase()
                );

                if (!exist) {
                    // get length of registered users
                    usersData.push({ 'username': username, 'email': email, 'password': password });
                    localStorage.setItem(`usersData`, JSON.stringify(usersData));
                    Swal.fire(
                        'Good job!',
                        'Account Created!',
                        'success'
                    )

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Username already registered!'
                    })
                }
            }
            else {
                let firstUser = [];
                firstUser.push({ 'username': username, 'email': email, 'password': password })
                localStorage.setItem('usersData', JSON.stringify(firstUser))
                Swal.fire(
                    'Good job!',
                    'Account Created!',
                    'success'
                )
            }
        }

    }


    // function setErrorFor(input, message) {
    //     const formControl = input.parentElement;
    //     console.log(formControl)
    //     const small = formControl.querySelector('small');
    //     formControl.classList.add('form-control error')
    //     small.innerText = message;
    // }

    // function setSuccessFor(input) {
    //     const formControl = input.parentElement;
    //     console.log(input)
    //     console.log(formControl)
    //     formControl.classList.add('form-control success')
    // }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    return (
        <main className="main-cont">
            <div className="container">
                <div className="header">
                    <h2>Create Account</h2>
                </div>
                <form id="form" className="form" onSubmit={signUp

                }>
                    <div className="form-control">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" onChange={(e) => { setUsername(e.target.value) }} />
                        {state ?
                            <i className="fas fa-check-circle"></i> :
                            <div>
                                <i className="fas fa-exclamation-circle"></i>
                                <small>Error message</small>
                            </div>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="username">Email</label>
                        <input type="text" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                        <i className="fas fa-check-circle"></i>
                        <i className="fas fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                        <i className="fas fa-check-circle"></i>
                        <i className="fas fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="passwordcheck">Repeat Password</label>
                        <input type="password" id="password2" onChange={(e) => { setPassword2(e.target.value) }} />
                        <i className="fas fa-check-circle"></i>
                        <i className="fas fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <button type="submit" className="sub-btn">Submit</button>
                </form>
            </div>
        </main>
    )
}

export default Register
