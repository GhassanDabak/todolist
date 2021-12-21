import React, {useState,useEffect} from 'react';
import './todo.css';
import ListItems from './ListItems'


function Todo(){

   const [state,setState] = useState({
     text: "",
     toDos: []
   })
   const[data,setData] = useState(null)
   const [api,setApi] = useState("3025d0777154910572eb91d5d128c969")

   useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=jordan&appid=" +
      api +
      "&units=metric");
      const dataArray = await response.json();
      console.log(dataArray)
      setData(dataArray)
    }
    fetchData()
  }, [api])
   
  const addItem = (e) => {
    e.preventDefault();
    if(state.text === ""){
      alert("nothing is entered")
    } else {
      state.toDos = JSON.parse(localStorage.getItem("toDo"))
      if(state.toDos){
        let newToDo = state.toDos
        newToDo.push(state.text)
        localStorage.setItem("toDo", JSON.stringify(newToDo))
        setState({
          ...state,
          toDos: newToDo,
          text: ""
        }) 
      } else {
        state.toDos = [];
        let newToDo = state.toDos
        newToDo.push(state.text)
        localStorage.setItem("toDo", JSON.stringify(newToDo))
        setState({
          ...state,
          toDos: newToDo,
          text: ""
        }) 
      }
    }
}
  
  const handleInput = (e) => {
    setState({
      ...state,
      text: e.target.value
    })
  }
  const deleteItem = (index) => {
    state.toDos = JSON.parse(localStorage.getItem("toDo"))
    const filteredItems= state.toDos.filter((item,ind) =>
      ind!==index);
      localStorage.setItem("toDo", JSON.stringify(filteredItems))
    setState({
      ...state,
      toDos: filteredItems
    })
  }

  return (
    <div className='container-foreverything'>
      <div className="todo-container">
          <div className='heading-start'>
            <h2> ToDo List </h2>
          </div>
        <form id="to-do-form" onSubmit={addItem}>
          <input type="text" placeholder="What's next?" value= {state.text} onChange={handleInput} />
          <button type="submit">Add</button>
        </form>
          {JSON.parse(localStorage.getItem('toDo'))? JSON.parse(localStorage.getItem('toDo')).map((item,ind) => (<ListItems item={item} index={ind} key={ind} deleteItem={deleteItem} />)): null} 
          
    </div>
      {data ? <div className='weather-container'>
          <div> <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="weather-icon"/> </div>
              <h5 className="card-title">{data.name}</h5>   
              <span className='temp' >{ data.main.temp}C</span>     
              <p className="card-text ">Weather conditions are described as: {data.weather[0].description}</p>
              <p className='temp' >humidity: {data.main.humidity} |  wind: {data.wind.speed}</p>  
            
          </div> : ""}
    </div>
    
  );
}

export default Todo;