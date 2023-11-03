


import React, { useEffect, useState } from 'react'
import Form from './Form'
import TodosList from './TodosList';

const getLocalItems =()=>{
  let list = localStorage.getItem('lists')
  if(list){
    return JSON.parse(localStorage.getItem('lists'))
  }
  else{
    return []
  }
  
}

const Todo = () => {
    const [inputData,setInputData] = useState('');              
  const [todos,setTodos] = useState(getLocalItems());   
  const [editTodo,setEditTodo] =useState(null);         
  const [isEdit,setIsEdit] = useState(false);        
  const [errorMessage, setErrorMessage] = useState('');
  const [completed,setCompleted] =useState(false);

  useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(todos))
    
},[todos])

  return (
    <div className='parent'>
      <div className='child'>
        <div className='container'>
        <Form 
          inputData = {inputData} 
          setInputData = {setInputData} 
          todos = {todos} 
          setTodos = {setTodos} 
          editTodo={editTodo} 
          setEditTodo={setEditTodo}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />

        <TodosList 
          todos={todos} 
          setTodos={setTodos} 
          editTodo={editTodo}
          setEditTodo={setEditTodo} 
          setInputData={setInputData}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          completed={completed}
          setCompleted={setCompleted}
        />
          </div>
      </div>
    </div>
  )
}

export default Todo



