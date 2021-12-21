import React,{useState} from 'react';
import './ListItems.css';

function ListItems({item,deleteItem,index}){ 
    const [complete,setComplete] = useState(false)

    const didComplete = () => {
        setComplete(!complete)
    }

    return(
       <div className="list">
            <span className={`${complete ? "finished-to-do" : ""} to-do-item`}>{item}</span>
            <div>
            <span className='remove' onClick={didComplete}>&#10003;</span>
            <span className='remove' onClick={() => deleteItem(index)}>&#10005;</span>
            </div>
       </div>
    )
  }

  export default ListItems;