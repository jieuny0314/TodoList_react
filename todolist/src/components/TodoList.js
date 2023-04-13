// TodoItem을 모아 리스트로 보여줄 컴포넌트

import React from "react";
import TodoItem from './TodoItem';
import styled from "styled-components";
import useFetch from "../util/useFetch";
import moment from "moment";
import { SyncLoader } from "react-spinners";

const TodoListContainer = styled.div`
  width: 100%;
  height: 41.7%;
  padding: 5px;
  background-color: #f5ebe0;
  border-radius: 5%;
  margin-bottom: 10px;
  overflow: scroll;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

   &::-webkit-scrollbar {
    display: none;
  }

  .loadingBox {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`


function TodoList() {
  // const todos = useSelector((state) => state.todoReducer.todos);
  //useselector라는 Hooks을 사용해서 state를 가져온다.
  //combineReducer 사용했으므로 저렇게 가져와줘야함.

  const today = moment().format('YYYY-MM-DD');
  const { datas, isPending, error } = useFetch(`http://localhost:3001/todos`);
  const todos = datas ? datas.filter((data) => data.createdDate === today) : null;
  
  return (
    <TodoListContainer>
      {isPending ? todos && todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />
      }) : <div className="loadingBox"><SyncLoader
      color="#DBA39A"
      size={15}
    /></div>}
    </TodoListContainer>
  )
}

export default TodoList;