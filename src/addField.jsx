import React, {useState} from 'react'

function AddField() {

    const [field, setField] = useState('')

    const addToList = (e) =>{
        e.preventDefault();

        if(localStorage.getItem('todolist')){
            let toDoArray = []
            toDoArray = JSON.parse(localStorage.getItem('todolist'));
            toDoArray.push(field)
            localStorage.setItem('todolist', JSON.stringify(toDoArray))
        }
        else{
            localStorage.setItem('todolist', JSON.stringify(field))
        }
    }

    return (
        <div>
            <input type="text" placeholder='What do you want to do?' onChange={(e)=>{setField(e.target.value)}}/>
            <button >Add Todo List</button>
        </div>

    )
}

export default AddField
