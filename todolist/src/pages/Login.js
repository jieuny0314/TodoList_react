import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "../util/useFetch";

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
`

const PasswordInput = styled(IdInput)`
`

const LoginButton = styled.button`
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
      <LoginBox>
        <Title>로그인</Title>
        <div className="idBox"><span>아이디</span><IdInput onChange={idChange}/></div>
        <div className="passwordBox"><span>비밀번호</span><PasswordInput onChange={pwdChange}/></div>
        <LoginButton onClick={onLogin}>로그인하기</LoginButton>
        <StyledLink to='/signup'><LoginButton>회원가입</LoginButton></StyledLink>
      </LoginBox>
    </PageWrapper>

    </motion.div>
  )
}

export default Login;