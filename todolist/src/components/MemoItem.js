import React from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { memoRemove, memoUpdate } from '../reducer/Memo';
import { BsFillTrashFill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { useState } from 'react';

const MemoItemBox = styled.article`
  display: flex;
  margin: 1rem;
  padding: 1rem;
  background-color: #FEFCF3;
  justify-content: center;
  align-items: center;
  width: 90%;
  flex-direction: column;
  border-radius: 15px;
  color: #1B1A17;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  .box {
    display: flex;
    width: 60%;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(0, 0, 0, 0.2);
    padding: 15px 10px 5px 10px;
  }

  .textContainer {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TextBox = styled.textarea`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: ${(props) => (!props.readOnly ? "rgb(0, 0, 0, 0.1)" : "transparent")};
  cursor: ${(props) => (!props.readOnly ? "defalut" : "pointer")};
  width: 100%;
  text-align: center;
  font-size: 1rem;
  height: ${(props) => props.line !== 1 ? `${props.line * 21}px` : "24px"};
  resize: none;
  font-weight: 200;
`;

const DateBox = styled.div`
  width: 50%;
  font-size: 0.8rem;
`

const Button = styled.div`
  display: inline;
  width: 30px;
  background-color: none;
  border: none;
  cursor: pointer;
`;

function MemoItem({memo}) {
  const {id, text, isCompleted, createdDate} = memo;
  const [readOnly, setReadOnly] = useState(true);
  const [updateText, setUpdateText] = useState(text);
  const dispatch = useDispatch();

  const onChangeText = (e) => {
    const value = e.target.value;
    setUpdateText(value);
  }

  const updateMemo = () => {
    if(!isCompleted) {
      setReadOnly(!readOnly);
    }
  };

  return(
    <MemoItemBox>
      <div className="textContainer">
        <TextBox 
          name="text" 
          readOnly={readOnly}
          defaultValue={text} 
          checked={isCompleted} 
          onChange={onChangeText}
          onBlur={() => dispatch(memoUpdate(id, updateText))}
          line={Math.ceil(text.length / 23)}
        ></TextBox>
      </div>
      <section className="box">
        <DateBox>{createdDate}</DateBox>
        {/* 나중에 수정기능 위해서 readOnly 선언해준다. */}
        {/* onBlur => TextBox에 포커스가 사라지면 변경된 텍스트 값을 dispatch를 사용해서 스토어에 반영 */}

        {!isCompleted ? (
          <Button onClick={updateMemo}>
            <BiPencil size="25px" color="#a5a58d" />
          </Button>
        ) : null}

        <Button onClick={() => dispatch(memoRemove(id))}>
          <BsFillTrashFill size="25px" color="#e56b6f" />
        </Button>
        </section>
    </MemoItemBox>
  )
}

export default MemoItem;