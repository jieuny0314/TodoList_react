// TodoList의 큰 틀을 담당할 컴포넌트 

import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AiOutlineSetting, AiOutlineMenu } from 'react-icons/ai';
import { TbNotes } from 'react-icons/tb';
import { GrPowerReset, GrPrevious } from 'react-icons/gr';
import { MdOutlinePets, MdPeopleOutline  } from 'react-icons/md';
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

  .show-menu{
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


function TodoTemplate({children}){
  let today = new Date();
  let todayStr = today.toISOString().slice(0, 10);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let todayWeek = week[today.getDay()];
  const todos = useSelector((state) => state.todoReducer.todos);
  let completedTodo = todos.filter((todo) => todo.isCompleted);
  const [menuOn, setMenuOn] = useState(false);
  const [imgOn, setImgOn] = useState(false);

  const toggleMenu = () => {
    setMenuOn(!menuOn);
  }

  const toggleImg = () => {
    setImgOn(!imgOn);
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
      <Title> 오늘의 할 일 </Title>
      <CompletedTodo>
        {todos.length? 
          completedTodo.length !== 0 ?
           todos.length === completedTodo.length ?
            '오늘 할 일을 모두 끝냈어요!' 
            : `${todos.length}개 중 ${completedTodo.length}개 완료!` 
            : `아직 완료한 일이 없어요!`
          : `오늘은 할 일이 없어요!`}
      </CompletedTodo>
      {children}
          <ul className={menuOn ? 'show-menu': 'hide-menu'}>
            <MenuHeader><GrPrevious onClick={toggleMenu} className="previous" color="#1B1A17"/></MenuHeader>
            <StyledLink to="/creator"><MenuLi><MdPeopleOutline className="icon" size="40" color="#1B1A17" />제작자</MenuLi></StyledLink>
            <MenuLi><GrPowerReset className="icon" size="35" color="#1B1A17"/>초기화하기</MenuLi>
            <MenuLi>< AiOutlineSetting className="icon" size="35" color="#1B1A17"/>설정</MenuLi>
            <MenuLi onClick={toggleImg}>< MdOutlinePets className="icon" size="35" color="#1B1A17"/>햄스터 보기</MenuLi>
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