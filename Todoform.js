import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react'

//get data from local storage
function getLocalItems() {
  let list = localStorage.getItem('lists')



  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}


function Todoform() {
  const [task, settasks] = useState(getLocalItems())
  const [inputValue, setInputValue] = useState('')
  const [editIndex, setEditindex] = useState(null)

  function Change(e) {
    setInputValue(e.target.value)
  }
  // used to change state of input feild everytime new task is added

  function handleSubmit(e) {
    e.preventDefault()
    if (inputValue.trim() !== "") {
      if (editIndex !== null) {
        const editTask = [...task];
        editTask[editIndex] = { inputValue: inputValue, completed: task[editIndex].completed, isEditing: false }
        console.log({ editTask })
        settasks(editTask)
      }
      else {
        settasks([...task, { inputValue: inputValue, completed: false, isEditing: false }])
      }
    }
    setInputValue("")
  }
  // after clicking add button, it will add the input value to task and again reset the form value 

  function handleDelete(index) {
    const removeItem = [...task]
    removeItem.splice(index, 1)
    //overwrites original array
    //settasks([...task, inputValue])
    settasks(removeItem)
  }
  // adds new todo to the state and clears the previous value when submitted


  function handleToggle(index) {
    settasks(task.map((task, i) => (i === index ? {
      ...task, completed: !task.completed
    }
      : task)));
  }

  function handleEdit(index) {
    setEditindex(index)
    setInputValue(task[index].inputValue)
    {
      editIndex === index ? (
        <input type='text' value={inputValue} />) :
        (
          <span> {task.inputValue} </span>
        )
    }
  }

  function clearAll() {
    settasks([])
  }

  //add data to local storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(task))
  }, [task])


  return (
    <>
      <div className='background'>
        <h1 className='head'> To Do List </h1>
        <form className='form'>
          <input className='inputbar' type='text' placeholder='Add Task' value={inputValue} onChange={Change} />
          {/* inputValue -> state, Change-> function which updates state of input value every time new task entered */}
          <button className='addbutton' onClick={handleSubmit}> Add Task </button>
        </form>

        {task.map((task, index) => (
          <ul className='items' key={index}>
            <input className='completebutton' type="checkbox" checked={task.completed} onChange={() => handleToggle(index)} />
            {task.inputValue}
            <FontAwesomeIcon icon={faEdit} className='editbutton' onClick={() => handleEdit(index)} />
            <FontAwesomeIcon icon={faTrashAlt} className='deletebutton' onClick={() => handleDelete(index)} />
          </ul>
        ))}
        <button className='clearbutton' onClick={clearAll}> Clear All </button>
        {/* map function used for display each task as a list */}

      </div>
    </>
  )
}

export default Todoform;
