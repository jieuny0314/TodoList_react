import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import useFetch from "../util/useFetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GrPrevious } from 'react-icons/gr';
import Hamster from '../계피그림.png';

const PageWrapper = styled.div`
  width: 390px;
  height: 844px;
  background-color: #F5EBE0;
  color: #1B1A17;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`

const LoginBox = styled.div`
  width: 90%;
  height: 40%;
  background-color: #FEFCF3;
  border-radius: 15px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 10;
  margin-top: 20px;

  .idBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .passwordBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 3rem;
  }

  span {
    display: block;
    width: 30%;
    font-size: 1.2rem;
  }
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
`

const IdInput = styled.input`
  width: 70%;
  height: 50px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #DBA39A;
  font-size: 1.3rem;
  margin-bottom: 10px;
  
  :focus {
    outline: none;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  }
`

const PrevBox = styled.div`
  width: 95%;
  position: absolute;
  top: 40%;
  left: 5%;
  z-index: 5;

  .previous {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #DBA39A;
    padding: 10px;
    color: #1B1A17;
  }
`

const PasswordInput = styled(IdInput)`
`

const LoginButton = styled.button`
  border: none;
  background-color: #DBA39A;
  width: 100px;
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
  margin-top: -10px;
  cursor: pointer;

  :hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    transition: 0.3s;
    background-color: #EF9F9F;
  }
`

const TitleBox = styled.div`
  width: 100%;
  height: 30%;
  /* background-color: gray; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  position: relative;

  .titleImg {
    position: absolute;
    top: 110px;
    width: 150px;
    z-index: 1;
    margin-top: 30px;
  }
`

const Ballon = styled.div`
    position: relative;
    width: 280px;
    height: 180px;
    top: -135px;
    background: white;
    color: white;
    border-radius: 50%;
    padding: 12px 12.8px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-top: 60px;

    ::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 0;
      border: 22px solid transparent;
      border-top-color: white;
      border-bottom: 0;
      border-left: 0;
      margin-left: -11px;
      margin-bottom: -22px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    .say {
      color: black;
      display: block;
      text-align: center;
      font-size: 1.5rem;
    }
`

function Signup() {
  const navigate = useNavigate();
  const infos = useFetch('http://localhost:3001/information').datas;
  const ids = infos ? infos.map((info) => info.id) : null;
  const pwds = infos ? infos.map((info) => info.password) : null;
  const [idInput, setIdInput] = useState('');
  const [pwdInput, setPwdInput] = useState('');

  const idChange = (e) => {
    if(e.target.value.length === 0) alert('정보를 제대로 입력해주세요.');
    setIdInput(e.target.value);
  }

  const pwdChange = (e) => {
    if(e.target.value.length === 0) alert('정보를 제대로 입력해주세요.');
    setPwdInput(e.target.value);
  }

  const checkInfo = () => {
    if(idInput.length === 0 || pwdInput.length === 0) alert('정보를 제대로 입력해주세요.');
    else {
      if(ids.includes(idInput)){
        alert('이미 존재하는 아이디 입니다.\n다른 아이디로 시도하십시오.')
      }

      const putData = {
        "id": idInput,
        "password": pwdInput
      }

      fetch('http://localhost:3001/information',{
            method:"POST",
            body : JSON.stringify(putData),
            headers: {
              'Content-Type': 'application/json'
          },
          })
          .then( () => {
            navigate('/');
          })
          .catch( err => console.log(err) )
    }
  }
    
  return(
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
    
    <PageWrapper>
      <PrevBox>
        <Link to='/'><GrPrevious className="previous" size="40"/></Link>
      </PrevBox>
      <TitleBox>
        <Ballon><span className="say">주인만 내 투두리스트를 <br/>볼 수 있어! </span></Ballon>
        <img className="titleImg" alt="햄스터그림" src={Hamster} />
      </TitleBox>
      <LoginBox>
        <Title>회원가입</Title>
        <div className="idBox"><span>아이디</span><IdInput onChange={idChange} /></div>
        <div className="passwordBox"><span>비밀번호</span><PasswordInput onChange={pwdChange}/></div>
        <LoginButton onClick={checkInfo}>완료</LoginButton>
      </LoginBox>
    </PageWrapper>

    </motion.div>
  )
}

export default Signup;