import logo from './logo.svg';
import './App.css';
import TodoTemplate from './pages/TodoTemplate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import styled, { createGlobalStyle } from 'styled-components';
import Creator from './pages/Creator';
import MemoTemplate from './pages/MemoTemplate';
import MemoInsert from './components/MemoInsert';


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Jua', sans-serif;
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
  return (
    <Router>
     <AppContainer>
     <GlobalStyle />    
      <Routes>   
      <Route path="/" element={
          <TodoTemplate>  
            <TodoInsert />
            <TodoList />   
            <MemoInsert />
          </TodoTemplate>} /> 
          <Route path="/memolist" element={<MemoTemplate />} />
          <Route path="/creator" element={<Creator />} />
        </Routes>
     </AppContainer>
     </Router>
  );
}

export default App;
