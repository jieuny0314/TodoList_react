import React from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { todoRemove, todoToggle, todoUpdate } from '../reducer/Todo';
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { useState } from 'react';

const TodoItemBox = styled.div`
  display: flex;
  margin: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #DBA39A;
  justify-content: center;
  align-items: center;
  color: #1B1A17;
`;

const CheckBox = styled.div`
  display: inline;
  margin: 0 1rem;
  cursor: pointer;
  color: ${(props) => props.color || "gray"};
`;

const TextBox = styled.input`
  flex: 1;
  display: inline;
  border: none;
  outline: none;
  background-color: ${(props) => (!props.readOnly ? "rgb(0, 0, 0, 0.1)" : "transparent")};
  width: 500px;
  cursor: ${(props) => (!props.readOnly ? "defalut" : "pointer")};
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  color: ${(props) => (props.checked ? "gray" : "black")};
  font-size: 1rem;
`;

const Button = styled.div`
  display: inline;
  width: 30px;
  background-color: none;
  border: none;
  cursor: pointer;
  color: #1B1A17;
`;

function TodoItem({todo}) {
  const {id, text, isCompleted, createdDate} = todo;
  const [readOnly, setReadOnly] = useState(true);
  const [updateText, setUpdateText] = useState(text);
  const dispatch = useDispatch();

  const onChangeText = (e) => {
    const value = e.target.value;
    setUpdateText(value);
  }

  const onChangePut = () => {
    const putData = {  // 기존 데이터를 덮어씌우기 때문에 데이터 전부다 보내줘야한다.
      'id' : todo.id,
      "text" : updateText,
      "isCompleted" : todo.isCompleted,
      "createdDate" : todo.createdDate,
    }
    fetch(`http://localhost:3001/todos/${id}`,{
         method:"PUT",
         body : JSON.stringify(putData),
         headers: {
           'Content-Type': 'application/json'
       },
       })
       .then( () => {
        console.log(todo.text);
       })
       .catch( err => console.log(err) )
       window.location.reload();
  }

  const onCheckbox = () => {
    const putData = {
      "id": todo.id,
      "text": todo.text,
      "isCompleted": !todo.isCompleted,
      "createdDate" : todo.createdDate
    }
    fetch(`http://localhost:3001/todos/${todo.id}`,{
         method:"PUT",
         body : JSON.stringify(putData),
         headers: {
           'Content-Type': 'application/json'
       },
       })
       .then( () => {
        //  navigate(`/blogs/${blog.id}`);
        //  window.location.reload();
        console.log(todo.isCompleted)
        console.log(todo);
        // window.location.reload();
       })
       .catch( err => console.log(err) )
       window.location.reload();
  }

  const updateTodo = () => {
    if(!isCompleted) {
      setReadOnly(!readOnly);
    }
  };

  const removeTodo = () => {
    fetch(`http://localhost:3001/todos/${todo.id}`,{
           method:"DELETE",
           headers: {
             'Content-Type': 'application/json'
         },
         })
         .then( () => {
         })
         .catch( err => console.log(err) )
         window.location.reload();
         
  }

  return(
    <TodoItemBox>
      <CheckBox onClick={onCheckbox}>
        {isCompleted ? (
          <FiCheckSquare size="25px" />
        ) : (
          <FiSquare size="25px" color="black" />
        )}
      </CheckBox>
      <TextBox 
        name="text" 
        readOnly={readOnly}
        defaultValue={text} 
        checked={isCompleted} 
        onChange={onChangeText}
        onBlur={onChangePut}
        />
        {/* {todo.createdDate.slice(5,)} */}
      {/* 나중에 수정기능 위해서 readOnly 선언해준다. */}
      {/* onBlur => TextBox에 포커스가 사라지면 변경된 텍스트 값을 dispatch를 사용해서 스토어에 반영 */}

      {!isCompleted ? (
        <Button onClick={updateTodo}>
          <BiPencil size="25px" color="#a5a58d" />
        </Button>
      ) : null}

      <Button onClick={removeTodo}>
        <BsFillTrashFill size="25px" color="#e56b6f" />
      </Button>
    </TodoItemBox>
  )
}
export default TodoItem;