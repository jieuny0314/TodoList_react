// TodoList의 큰 틀을 담당할 컴포넌트 

import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AiOutlineSetting, AiOutlineMenu } from 'react-icons/ai';
import { TbNotes } from 'react-icons/tb';
import { GrPowerReset, GrPrevious } from 'react-icons/gr';
import { MdOutlinePets, MdPeopleOutline, MdCalendarMonth } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi'
import useFetch from "../util/useFetch";
import moment from "moment";

import cinnamon from '../계피_.png';

const Template = styled.div`
  background-size: cover;
  position: relative;
  width: 390px;
  height: 844px;
  background-color: #FEFCF3;
  padding: 10px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  overflow: hidden;

  .hide-menu{
    position: absolute;
    width: 100%;
    height: 80%;
    background-color: #F5EBE0;
    margin: 0;
    border-radius: 15px 15px 0 0;
    padding: 1rem;
    bottom: -80%;
    left: 0;
    transition: 1s;
  }

  .show-menu {
    position: absolute;
    width: 100%;
    height: 80%;
    background-color: #F5EBE0;
    margin: 0;
    border-radius: 15px 15px 0 0;
    padding: 1rem;
    bottom: 0;
    left: 0;
    transition: 1s;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
    }

    .titleBox {
      width: 100%;
      height: 10%;
    }

`;

const Header = styled.header`
  width: 100%;
  height: 7%;
  padding: 10px;
  display: flex;
  align-items: flex-end;
  border-radius: 15px;

  .menu{
    cursor: pointer;
    width: 30px;
    height: 40px;
  }

`

const NowDate = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin : 0;
  text-align: right;
  width: 90%;
  color: #1B1A17;
`

const Title = styled.h1`
  text-align : center;
  font-size : 2rem;
  margin : 0;
  margin: 0.5rem;
  font-weight: 600;
  color: #1B1A17;
`;

const CompletedTodo = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 400;
  color: #1B1A17;
`


const MenuHeader = styled.div`
  width: 100%;
  height: 10%;
  margin: 10px;

  .previous {
    width: 40px;
    height: 40px;
    background-color: #DBA39A;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    
    &:hover {
      color: white;
    }
  }
`

const MenuLi = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #DBA39A;
  width: 80%;
  margin-left: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  padding: 10px;
  color: #1B1A17;

  &:hover {
    background-color: #DBA39A;
    border-radius: 50px;
    transition: 0.5s;
  }

  .icon {
    margin-right: 1rem;
    color: black;
  }

  .listTitle {
    margin-right: 10px;
  }
`

const ImgContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.3);

  .cinnamon {
    transform: scale(1.3);
    transition: 1s;

    &:hover {
      transform: scale(1.6);
      transition: 1s;
    }
  }
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

const ResetConfirmWrapper = styled.div`
  width: 100%;
  height: 140%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: -25%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ResetConfirm = styled.div`
  width: 80%;
  height: 20%;
  border-radius: 15px;
  background-color: #DBA39A;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .btn {
    border: none;
    background-color: #F5EBE0;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    margin: 10px;
    margin-top: 30px;
    font-size: 1rem;
    
    :hover {
      border: 2px solid #EA5455;
    }
  }

  .alert {
    font-size: 1.2rem;
  }
`



function TodoTemplate({children, font, setFont}){
  let today = new Date();
  let todayStr = today.toISOString().slice(0, 10);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let todayWeek = week[today.getDay()];
  const todos = useSelector((state) => state.todoReducer.todos);
  const { datas, isPending, error } = useFetch('http://localhost:3001/todos');
  const todayDatas = datas ? datas.filter((data) => data.createdDate === moment().format('YYYY-MM-DD')) : null;
  let completedTodo = todayDatas ? todayDatas.filter((data) => data.isCompleted) : null;
  const [menuOn, setMenuOn] = useState(false);
  const [imgOn, setImgOn] = useState(false);
  const [reset, setReset] = useState(false);

  const toggleMenu = () => {
    setMenuOn(!menuOn);
  }

  const toggleImg = () => {
    setImgOn(!imgOn);
  }

  const changeFont = () => {
    setFont(!font);
  }

  const changeReset = () => {
    setReset(!reset);
  }
  
  const todoReset = () => {
    if(datas){
      datas.map((data) => {
      fetch(`http://localhost:3001/todos/${data.id}`,{
           method:"DELETE",
           headers: {
             'Content-Type': 'application/json'
         },
         })
         .then( () => {
         })
         .catch( err => console.log(err) )
         console.log();
    })}
    window.location.reload();
  }

  return(
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >

      <Template>
       <Header>
        <AiOutlineMenu onClick={toggleMenu} className="menu" size="30" color="#1B1A17"/>
        <Link to="/memolist"><TbNotes className="memo" size="30" color="#1B1A17"/></Link> 
        <NowDate>{todayStr}{`(${todayWeek})`}</NowDate>
        </Header> 
        <div className="titleBox">
        <Title> 오늘의 할 일 </Title>
        <CompletedTodo>
          {todayDatas ? todayDatas.length !== 0 ?
            completedTodo.length !== 0 ?
            todayDatas.length === completedTodo.length ?
              '오늘 할 일을 모두 끝냈어요!' 
              : `${todayDatas.length}개 중 ${completedTodo.length}개 완료!` 
              : `아직 완료한 일이 없어요!`
            : `오늘은 할 일이 없어요!`
          : null}
        </CompletedTodo>
        </div>
        {children}
          <ul className={menuOn ? 'show-menu': 'hide-menu'}>
            <MenuHeader><GrPrevious onClick={toggleMenu} className="previous" color="#1B1A17"/></MenuHeader>
            <StyledLink to="/creator"><MenuLi><MdPeopleOutline className="icon" size="40" color="#1B1A17" />제작자</MenuLi></StyledLink>
            <StyledLink to="/calender"><MenuLi>< MdCalendarMonth className="icon" size="35" color="#1B1A17"/>달력</MenuLi></StyledLink>
            <MenuLi onClick={toggleImg}>< MdOutlinePets className="icon" size="35" color="#1B1A17"/>햄스터 보기</MenuLi>
            <MenuLi onClick={changeFont}><AiOutlineSetting className="icon" size="35" color="#1B1A17"/>폰트</MenuLi>
            <MenuLi onClick={changeReset}><GrPowerReset className="icon" size="35" color="#1B1A17"/>초기화하기</MenuLi>
            {reset ?
              <ResetConfirmWrapper>
                <ResetConfirm>
                  <span className="alert">정말 초기화하시겠습니까?</span>
                  <div className="btnBox">
                    <button className="btn yes" onClick={todoReset}>네</button>
                    <button onClick={changeReset} className="btn no">아니오</button>
                  </div>
                </ResetConfirm>
              </ResetConfirmWrapper> 
              : null
            }
            <StyledLink to="/"><MenuLi><BiLogOut className="icon" size="35" color="#1B1A17"/>로그아웃</MenuLi></StyledLink>
          </ul>
          { imgOn ? 
              <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              >
            <ImgContainer onClick={toggleImg}>
              <img src={cinnamon} className="cinnamon" alt="크기가 변하는 햄스터"></img>
            </ImgContainer>
              </motion.div>
            :
            null
          } 
    </Template>

    </motion.div>
  )
}

export default TodoTemplate;