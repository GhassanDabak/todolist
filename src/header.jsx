import React from 'react'
import './header.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const navigation = () => {
        if (JSON.parse(localStorage.getItem('logged')) !== null) {
            navigate('/todo')
        }
        else {
            navigate('/')
        }
    }
    const navigationToExpenses = () => {
        navigate('/')
    }


    const signOut = () => {
        localStorage.setItem('logged', null)
        navigate('/')

    }

    return (
        <header>
            <nav>
                <div className="logo-container">
                    <h2 onClick={navigation} className="rainbow-text">
                        3 musketeers
                    </h2>

                </div>
                <div className="list1">
                    <ul>
                        {JSON.parse(localStorage.getItem('logged')) !== null ?
                            <Link to='todo'><li>ToDo List</li></Link> : <Link to='/' ><li>To Do List</li></Link>}
                        {JSON.parse(localStorage.getItem('logged')) !== null ?
                            <Link to='ExpenseTracker' ><li>Expenses</li></Link> : <Link to='/' ><li>Expenses</li></Link>}
                    </ul>
                </div>
                <div className="navbar-buttons">
                    {JSON.parse(localStorage.getItem('logged')) !== null ?
                        <button onClick={signOut}>Sign out</button> : location.pathname!=='/'?
                            <Link to="/" ><button>Login</button></Link> : null
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header
