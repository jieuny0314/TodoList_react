import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../util/useFetch";
import Hamster from '../계피그림.png';

const PageWrapper = styled.div`
  width: 390px;
  height: 844px;
  background-color: #F5EBE0;
  color: #1B1A17;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* z-index: -1; */
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
  position: relative;
  z-index: 10;
  margin-top: 30px;

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

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
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

const SignupButton = styled(LoginButton)`

`

const BtnBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
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
    top: 120px;
    width: 150px;
    z-index: 1;
    margin-top: 30px;
  }
`

const Ballon = styled.div`
    position: relative;
    width: 280px;
    height: 180px;
    top: -130px;
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

const Header = styled.div`
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: end;
  align-items: flex-end;
  padding: 15px;

  .creator {
    font-size: 1.3rem;
  }
`

function Login() {
  const navigate = useNavigate();
  const infos = useFetch('http://localhost:3001/information').datas;
  const ids = infos ? infos.map((info) => info.id) : null;
  const pwds = infos ? infos.map((info) => info.password) : null;
  const [idInput, setIdInput] = useState('');
  const [pwdInput, setPwdInput] = useState('');
  const [login, setLogin] = useState(false);

  const idChange = (e) => {
    setIdInput(e.target.value);
  }

  const pwdChange = (e) => {
    setPwdInput(e.target.value);
  }


  const onLogin = () => {
    if(infos){
      infos.map((info) => {
        if(info.id === idInput){
          if(info.password === pwdInput){    
            setLogin(true);
            navigate('./main');
          }
        }
      })
      if(!ids.includes(idInput)) alert('로그인 정보를 다시 확인해주세요.');
      else if(!pwds.includes(pwdInput)) alert('로그인 정보를 다시 확인해주세요.');
    }
  }
    
  return(
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >

    <PageWrapper>
      <TitleBox>
        <Ballon><span className="say">내 투두리스트에<br/> 온 걸 환영해!</span></Ballon>
        <img className="titleImg" alt="햄스터그림" src={Hamster} />
      </TitleBox>
      <LoginBox>
        <Title>로그인</Title>
        <div className="idBox"><span>아이디</span><IdInput onChange={idChange}/></div>
        <div className="passwordBox"><span>비밀번호</span><PasswordInput onChange={pwdChange}/></div>
          <BtnBox>
            <LoginButton onClick={onLogin}>로그인하기</LoginButton>
            <StyledLink to='/signup'><SignupButton>회원가입</SignupButton></StyledLink>
          </BtnBox>
      </LoginBox>
      <Header>
        <span className="creator">@jieuny</span>
      </Header>
    </PageWrapper>
    </motion.div>
  )
}

export default Login;