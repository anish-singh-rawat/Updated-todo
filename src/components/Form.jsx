import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Form = ({ inputData, setInputData, todos, setTodos, editTodo, setEditTodo,errorMessage,setErrorMessage }) => {
    

    const onInputChange = (e) => {
        setInputData(e.target.value);
        setErrorMessage('');
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = inputData.trim();
        if (!editTodo && trimmedInput !== '') {
            setTodos([...todos, { id: uuidv4(), title: trimmedInput, completed:false }]);
            setInputData('');
        } else {
            setErrorMessage('please enter data');
        }
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="todo-heading">Todo APP </div>
            <br />
            <input type="text" className='form-input-field' placeholder='Enter todo here...' required value={inputData} onChange={onInputChange} />
            <button className='btn' type='submit'><FontAwesomeIcon icon={faPlus} /></button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </form>
    );
};

export default Form;