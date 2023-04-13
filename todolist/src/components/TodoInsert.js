// 새로운 할 일(Todo)을 추가할 수 있는 컴포넌트

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoInsert } from '../reducer/Todo';
import styled from 'styled-components';
import useFetch from '../util/useFetch';
// insert 액션 불러오기
import moment from 'moment';

const TodoInputBox = styled.section`
    border-top: 1px solid #F5EBE0;
    display: flex;
    margin: 1rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    padding-top: 1rem;
  `;

  const Input = styled.input`
    flex: 1;
    outline: none;
    border: none;
    background: transparent;
    font-size: 1rem;
  `;

  const AddButton = styled.button`
    outline: none;
    border: none;
    border-radius: 15px;
    background-color: #F5EBE0;
    padding: 1rem 2rem;
    color: black;
    font-size: 15px;
    cursor: pointer;
    &:hover {
      background-color: #DBA39A;
      color: #ffffff;
    }
    &:active {
      background-color: #DBA39A;
      color: #ffffff;
    }
  `;


function TodoInsert(){
  const [todoInput, setTodoInput] = useState('');
  const {datas, isPending, error} = useFetch('http://localhost:3001/todos');
  let dataCount = datas ? datas.length : 0;
  let nextId = dataCount + 1;

  const dispatch = useDispatch();
  // 디스패치를 사용할 수 있게 해주는 Hooks

  const onChangeInput = (e) => {
    setTodoInput(e.target.value);
  }

  const onRemove = () => {
    setTodoInput('');
  }

  const onKeyPress = (e) => {
    if(e.key === "Enter") addTodo();
  }

  const addTodo = () => {
    if(todoInput.length === 0){
      alert("할 일을 입력해주세요!");
      return;
    }
    const putData = { id: nextId,
      text: todoInput, 
      isCompleted: false, 
      createdDate: moment().format('YYYY-MM-DD') };
    dispatch(todoInsert(nextId, todoInput));
    // 액션을 dispatch를 통해 리듀서로 전달한다.
    // 추가 될 할 일의 id와 내가 입력한 값(할 일 텍스트)을 전달한다.
    fetch('http://localhost:3001/todos',{
           method:"POST",
           body : JSON.stringify(putData),
           headers: {
             'Content-Type': 'application/json'
         },
         })
         .then( () => {
          console.log(putData)
         })
         .catch( err => console.log(err) )

    nextId++; // 다음에 들어올 할 일을 위해서 id+1 해준다. 
    onRemove();  
    window.location.reload();
  } 

  return(
    <TodoInputBox>
      <Input 
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
        value={todoInput}
        placeholder="할 일을 입력해주세요."
      ></Input>
      <AddButton onClick={addTodo}>추가</AddButton>
    </TodoInputBox>
  )

}

export default TodoInsert;