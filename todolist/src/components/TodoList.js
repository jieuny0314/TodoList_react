// TodoItem을 모아 리스트로 보여줄 컴포넌트

import React from "react";
import TodoItem from './TodoItem';
import { useSelector } from "react-redux";
import styled from "styled-components";

const TodoListContainer = styled.div`
  width: 100%;
  height: 41.7%;
  padding: 5px;
  background-color: #F5EBE0;
  border-radius: 5%;
  margin-bottom: 10px;
  overflow: scroll;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

   &::-webkit-scrollbar {
    display: none;
  }
`


function TodoList() {
  const todos = useSelector((state) => state.todoReducer.todos);
  //useselector라는 Hooks을 사용해서 state를 가져온다.
  //combineReducer 사용했으므로 저렇게 가져와줘야함.

  return (
    <TodoListContainer>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />
      })}
    </TodoListContainer>
  )
}

export default TodoList;