import { useState, useEffect } from "react"
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import MultiSelectSerach from "./components/MultiSelectSearch";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  //fetch single Tasks
  const fetchTask = async (id) => {
    const res = await fetch(
      `http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }

  //update the status
  //fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(
      'http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((tasks) => tasks.id != id))
    console.log('delete', tasks)
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    const res = await fetch(
      `http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, reminder: data.reminder } : task))

  }

  //add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
    //const id = Math.floor(Math.random() * 1000 + 1)
    //const newTask = { id, ...task }
    //setTasks([...tasks, newTask])
    console.log(tasks)
  }

  return (
      <div className="container">
        <MultiSelectSerach tasks={tasks}/>
        <Header onAdd={() =>
          setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
          title='Task Tracker' />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ?
          (<Tasks tasks={tasks} onDelete={deleteTask}
            onToggle={toggleReminder} />) :
          'No Tasks To Show'}

      
      </div>
  );
}

export default App;
