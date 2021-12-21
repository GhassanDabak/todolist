import AddField from './addField';
import './App.css';
import Footer from './footer';
import Header from './header'
import Login from './login';
import Register from './register';
import Todo from './todo';
import { Route, Routes } from 'react-router-dom'
import {ExpenseTracker} from './ExpenseTracker';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/todo' element={<Todo />} />
                <Route exact path='/ExpenseTracker' element={<ExpenseTracker />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
