import './App.css';
import axios from 'axios';
import { useEffect, useState, } from 'react';

function App() {

  const [task,setTask]=useState([])
  const [addTask,setAddTask]=useState({
    "task":""
  })


  useEffect(async()=>{
    await axios.get(`https://task1-api.herokuapp.com/api/tasks`)
      .then(res=>setTask(res.data))
      .catch(err=>console.log(err))
  },[])


  const handleChange=(event)=>{
    setAddTask({
      ...addTask,
      [event.target.name]:event.target.value
    })
  }

 

  const handleSubmit=async(event)=>{
    event.preventDefault()
    await axios.post(`https://task1-api.herokuapp.com/api/add-tasks`,addTask)
    .then(res=>console.log(res))

    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={handleSubmit}>
			  <h1> Add your task! </h1>	
			  <input type="text" name="task" placeholder="Add Task" value={addTask.task} onChange={handleChange}/> <br/>
		  	<button type="submit" > Add </button>
		  </form>

      <div>
        {task.map(tsk=>(
          <p key={tsk.id}>{tsk.id}- {tsk.task}</p>
        ))}
      </div>

      </header>
    </div>
    
  );
}

export default App;
