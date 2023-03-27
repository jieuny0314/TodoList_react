import styled from "styled-components";
import MemoList from "../components/MemoList";
import { GrPrevious } from 'react-icons/gr';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Template = styled.div`
  width: 390px;
  height: 844px;
  background-color: #F5EBE0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 10%;
  width: 80%;
  padding-top: 10px;
  border-bottom: 1px solid #DBA39A;
  

  .title {
    font-size : 2rem;
    margin : 0;
    font-weight: 400;
  }

  .previous {
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #DBA39A;
    border-radius: 50%;
    padding: 10px;
    margin-right: 2.5rem;
    margin-left: 1rem;
  }
`;


function MemoTemplate(){
  return(
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >

      <Template>
        <Header>
        <Link to="/"><GrPrevious className="previous" color="#1B1A17" /></Link>
          <h2 className="title">메모 저장소</h2>
        </Header>
        <MemoList></MemoList>
      </Template>
      
    </motion.div>
  )
}

export default MemoTemplate;