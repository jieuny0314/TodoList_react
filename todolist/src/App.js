import './App.css';
import TodoTemplate from './pages/TodoTemplate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import styled, { createGlobalStyle } from 'styled-components';
import Creator from './pages/Creator';
import MemoTemplate from './pages/MemoTemplate';
import MemoInsert from './components/MemoInsert';
import Calendar from './pages/Calendar';
import React, { useState } from 'react';
import useFetch from './util/useFetch';
import Login from './pages/Login';
import Signup from './pages/Signup';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: ${(props) => (props.font ? 'Jua' : 'Do Hyeon')}
  }
`;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  const [font, setFont] = useState(true);

  return (
    <Router>
     <AppContainer>
     <GlobalStyle font={font}/>    
      <Routes>   
      <Route path="/" element={<Login />} />
      <Route path="/main" element={
          <TodoTemplate setFont={setFont} font={font} >  
            <TodoInsert />
            <TodoList />   
            <MemoInsert />
          </TodoTemplate>} /> 
          <Route path="/memolist" element={<MemoTemplate />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/calender" element={<Calendar />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
     </AppContainer>
     </Router>
  );
}

export default App;
