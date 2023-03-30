import { motion } from "framer-motion";
import styled from "styled-components";
import { useState, useRef } from 'react';
import moment from 'moment';
import { GrPrevious, GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbCircleCheck } from 'react-icons/tb';
import useFetch from "../util/useFetch";
import { SyncLoader } from "react-spinners";

const CalendarContainer = styled.div`
  width: 390px;
  height: 844px;
  background-color: #FEFCF3;
  color: #1B1A17;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border-radius: 15px;

  .flexBox {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #F5EBE0;
    border-radius: 5%;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    padding: 10px;
    margin: 10px;
    height: 50%;
  }

  .calendar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    td {
      font-size: 1.2rem;
      text-align: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;

      :hover {
        border: 2px solid #DBA39A;
      }
    }
    .checked {
        border: 2px solid #DBA39A;
      }
  }
`

const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  padding: 20px;

  .previous {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #F5EBE0;
    padding: 10px;
    color: #1B1A17;
  }

  .calender {
    margin-left: 30px;
    margin-right: 10px;
  }
`

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 5%;
  position: relative;
`

const PrevButton = styled.button`
  background-color: #DBA39A;
  margin: 1rem;
  position: absolute;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  left: 30px;
  justify-content: center;
  align-items: center;
  transition: 1s;

  :hover {
    left: 15px;
    transition: 1s;
  }
`

const NextButton = styled.button`
  background-color: #DBA39A;
  margin: 1rem;
  position: absolute;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 30px;
  transition: 1s;

  :hover {
    right: 15px;
    transition: 1s;
  }
`

const CompletedTodos = styled.div`
  background-color: #F5EBE0;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 5%;
  height: 35%;
  margin: 10px;
  margin-top: 1rem;
  display: flex;
  justify-self: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;

  .date {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .completedTodo {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    overflow: scroll;
    width: 80%;

    .loadingBox {
      width: 100%;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &::-webkit-scrollbar {
    display: none;
    } 

    .flexBox {
      display: flex;
      flex-direction: row;
      box-shadow: none;
      border-bottom: 1px solid #DBA39A;
      height: 50px;
      position: relative;

      .circleIcon {
        margin-right: 10px;
        color: #DBA39A;
        position: absolute;
        left: 0;
     }

     li {
      position: absolute;
      left: 40px;
      top: 15px;
      display: block;
      height: 30px;
      overflow: scroll;
      
      &::-webkit-scrollbar {
        display: none;
      } 
     }
    }
  }
`

const Day = styled.td`
  position: relative;
  border: ${(props) => props.active === true ? '2px solid #DBA39A' : 'none'};

  .eventHere {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 7px;
    background-color: #CD0404;
  }
`

function Calender() {
  const todos = useSelector((state) => state.todoReducer.todos);
  const { datas, isPending, error } = useFetch('http://localhost:3001/todos');
  const createDateAll = datas? datas.map((data) => data.isCompleted ? data.createdDate : '') : [];
  // console.log(createDateAll)

  const [getMoment, setMoment] = useState(moment());
  // 현재 날짜 가져오기
  const today = getMoment;
  const [clickedDay, setClickedDay] = useState(today.format('M월 D일'));
  const firstWeek = today.clone().startOf('month').week();
  // 그 달의 시작하는 주
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
  // 그 달의 끝나는 주, 1년이 53주인 경우에 1이 반환되기 때문에 1이 나온다면 53으로 표시해주기
  const day = useRef();

  const movePrevMonth = () => {
    // 이전 달로 이동
    setMoment(getMoment.clone().subtract(1, 'month'));
    // clone은 기존의 moment가 아닌 새로운 객체를 반환헀다는 의미
  }

  const moveNextMonth = () => {
    // 다음 달로 이동
    setMoment(getMoment.clone().add(1, 'month'));
    // clone은 기존의 moment가 아닌 새로운 객체를 반환헀다는 의미
  }

  const clickDay = (e) => {
    if(e.target.className.includes('notM') && Number(e.target.textContent) > 20){
      setClickedDay(`${Number(today.format('M')) - 1}월 ${e.target.textContent}일`);
    }
    else if(e.target.className.includes('notM') && Number(e.target.textContent) < 5){
      setClickedDay(`${Number(today.format('M')) + 1}월 ${e.target.textContent}일`);
    }
    else {
      setClickedDay(`${Number(today.format('M'))}월 ${e.target.textContent}일`);
    }
  }

  const calendarArr = () => {
    let result = [];

    for (let week = firstWeek; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  // 오늘 날짜
                  return(
                      <Day key={index} onClick={clickDay} style={{backgroundColor: '#DBA39A'}} >
                        <span className="day">{days.format('D')}</span>
                        {createDateAll.includes(days.format('YYYY-MM-DD')) ? <span className="eventHere"></span> : null}
                      </Day>
                  );
                }else if(days.format('MM') !== today.format('MM')){
                  // 이번 달 날짜 아닐 때
                  return(
                      <Day key={index} className="day notM" onClick={clickDay} style={{color: 'rgba(0, 0, 0, 0.3)'}} >
                        <span className="day notM">{days.format('D')}</span>
                        {createDateAll.includes(days.format('YYYY-MM-DD')) ? <span className="eventHere"></span> : null}
                      </Day>
                  );
                }else if(days.format('dddd') === 'Sunday'){
                  // 일요일
                  return(
                      <Day key={index} onClick={clickDay} style={{color: '#CD3C3C'}} >
                        <span className="day">{days.format('D')}</span>
                        {createDateAll.includes(days.format('YYYY-MM-DD')) ? <span className="eventHere"></span> : null}
                      </Day>
                  );
                }
                else{
                  // 이번 달 날짜
                  return(
                      <Day key={index} ref={day} onClick={clickDay}>    
                        <span className="day">{days.format('D')}</span>
                        {createDateAll.includes(days.format('YYYY-MM-DD')) ? <span className="eventHere"></span> : null}
                      </Day>
                  );
                }
              })
            }
        </tr>);
    }
    return result;
  }


  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >

    <CalendarContainer>
      <Header>
        <Link to='/main'><GrPrevious className="previous" size="40"/></Link>
        <BiCalendar className="calender" size="35" />
        <h2>달력</h2>
      </Header>
      <div className="flexBox">
        <DateContainer>
          <PrevButton onClick={movePrevMonth}><GrFormPreviousLink size="20" /></PrevButton>
            <span>{today.format('YYYY년 MM월')}</span>
          <NextButton onClick={moveNextMonth}><GrFormNextLink size="20" /></NextButton>
        </DateContainer>
      <table className="calendar">
        <tbody>
          {calendarArr()}
        </tbody>
      </table>
      </div>
      <CompletedTodos>
        <span className="date">{clickedDay} 완료 목록</span>
        <ul className="completedTodo">
          {isPending ? datas ? datas.map((item) => {
            return item.isCompleted 
            && Number(item.createdDate.slice(5, 7)) === Number(clickedDay[0])  
            && (!isNaN(Number(clickedDay.slice(3, 5))) ? Number(clickedDay.slice(3, 5)) === Number(item.createdDate.slice(8, 10)) :
            Number(clickedDay.slice(2, 4)) === Number(item.createdDate.slice(8, 10)))
            ? <div key={item.id} className="flexBox"><TbCircleCheck className="circleIcon" size="30"/>
                <li >{item.text}</li>
              </div> 
            : null
          }) : null : 
          <div className="loadingBox"><SyncLoader color="#DBA39A" size={15}/></div>}
         
        </ul>
      </CompletedTodos>
    </CalendarContainer>

          
    </motion.div>
  )
}

export default Calender