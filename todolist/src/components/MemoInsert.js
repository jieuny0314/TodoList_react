import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { memoInsert } from '../reducer/Memo';
import styled from 'styled-components';
import { BsPinAngle } from 'react-icons/bs';

const MemoInputContainer = styled.section`
  width: 100%;
  height: 27%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  border-radius: 5%;
  background-color: #F5EBE0;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  .hidePopup {
    position: absolute;
    top: -7%;
    width: 100%;
    height: 7%;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    background-color: #DBA39A;
    transition: 0.5s;
  }

  .showPopup {
    top: 0;
    transition: 0.5s;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
`

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .title {
    margin: 0;
    font-weight: 500;
  }

  .pin {
    margin-left: -20px;
    margin-right: 10px;
  }
`

const MemoInputBox = styled.div`
    display: flex;
    width: 90%;
    height: 70%;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  `;

  const Input = styled.textarea`
    flex: 1;
    outline: none;
    border: none;
    background-color: transparent;
    border-radius: 15px;
    width: 100%;
    padding: 10px;
    resize: none;
    font-size: 1rem;
  `;

  const AddButton = styled.button`
    outline: none;
    border: none;
    width: 80%;
    border-radius: 20px 20px;
    background-color: #DBA39A;
    padding: 1rem 2rem;
    color: black;
    margin-top: 20px;
    font-size: 15px;
    cursor: pointer;
    &:hover {
      background-color: #DBA39A;
      color: #ffffff;
    }
  `


function MemoInsert(){
  const [memoInput, setMemoInput] = useState('');
  const [memoPopup, setMemoPopup] = useState(false);
  let nextId = useRef(4); // 렌더링이 계속 되면 안되기 때문에 useRef사용

  const dispatch = useDispatch();
  // 디스패치를 사용할 수 있게 해주는 Hooks

  const onChangeInput = (e) => {
    setMemoInput(e.target.value);
  }

  const onRemove = () => {
    setMemoInput('');
  }

  const addMemo = () => {
    if(memoInput.length === 0){
      alert("메모를 입력해주세요!");
      return;
    }

    dispatch(memoInsert(nextId.current, memoInput));
    popUpToggle();
    // 액션을 dispatch를 통해 리듀서로 전달한다.
    // 추가 될 할 일의 id와 내가 입력한 값(할 일 텍스트)을 전달한다.
    nextId.current += 1; // 다음에 들어올 할 일을 위해서 id+1 해준다. 
    onRemove();  
  } 

  const popUpToggle = () => {
    setMemoPopup(true);
    setTimeout(function(){
      setMemoPopup(false);
    }, 1500);
  }

  return(
    <MemoInputContainer>
        <div className={memoPopup ? "hidePopup showPopup" : "hidePopup"}> 메모가 성공적으로 추가되었습니다!</div>
      <Title><BsPinAngle className="pin" size="25" color="#e56b6f" /><h2 className="title">오늘의 메모</h2></Title>
      <MemoInputBox>
        <Input 
          onChange={onChangeInput}
          value={memoInput}
          placeholder="메모를 입력해주세요."
        ></Input>
        <AddButton onClick={addMemo}>추가</AddButton>
      </MemoInputBox>
    </MemoInputContainer>
  )

}

export default MemoInsert;