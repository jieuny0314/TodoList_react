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
  const {id, text, isCompleted} = todo;
  const [readOnly, setReadOnly] = useState(true);
  const [updateText, setUpdateText] = useState(text);
  const dispatch = useDispatch();

  const onChangeText = (e) => {
    const value = e.target.value;
    setUpdateText(value);
  }

  const updateTodo = () => {
    if(!isCompleted) {
      setReadOnly(!readOnly);
    }
  };

  return(
    <TodoItemBox>
      <CheckBox onClick={() => dispatch(todoToggle(id))}>
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
        onBlur={() => dispatch(todoUpdate(id, updateText))}
        />
      {/* 나중에 수정기능 위해서 readOnly 선언해준다. */}
      {/* onBlur => TextBox에 포커스가 사라지면 변경된 텍스트 값을 dispatch를 사용해서 스토어에 반영 */}

      {!isCompleted ? (
        <Button onClick={updateTodo}>
          <BiPencil size="25px" color="#a5a58d" />
        </Button>
      ) : null}

      <Button onClick={() => dispatch(todoRemove(id))}>
        <BsFillTrashFill size="25px" color="#e56b6f" />
      </Button>
    </TodoItemBox>
  )
}
export default TodoItem;