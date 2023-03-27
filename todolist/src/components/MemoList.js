import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MemoItem from "./MemoItem";

const MemoListContainer = styled.main`
  width: 100%;
  height: 90%;
  padding: 10px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`


function MemoList() {
  const memos = useSelector((state) => state.memoReducer.memos);
  //useselector라는 Hooks을 사용해서 state를 가져온다.
  return (
    <MemoListContainer>
      {memos.map((memo) => {
        return <MemoItem key={memo.id} memo={memo} />
      })}
    </MemoListContainer>
  )
}

export default MemoList;