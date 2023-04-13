import styled from "styled-components";
import { GrPrevious } from 'react-icons/gr';
import { MdPeopleOutline } from 'react-icons/md';
import profileImg from '../계피보고싶다.png';
import { BsGithub } from 'react-icons/bs';
import { Link } from "react-router-dom";
import instagram from '../insta.png';
import { motion } from "framer-motion";

const CreatorContainer = styled.div`
  width: 390px;
  height: 844px;
  background-color: #FEFCF3;
  color: #1B1A17;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  border-radius: 15px;
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

  .creator {
    margin-left: 30px;
    margin-right: 10px;
  }
`

const ProfileImgContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .profileImg {
    width: 300px;
    height: 300px;
    margin-bottom: 10px;
    border-radius: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .name {
    font-weight: 400;
  }
`

const Contact = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .contactIcon {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    border-radius: 5px;
  }

  .contact {
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 1.3rem;
    background-color: #F5EBE0;
    padding: 20px;
    border-radius: 50px;
    color: #1B1A17;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    
    &:hover{
      background-color: #DBA39A;
      color: white;
      transition: 0.5s;
    }
  }
`

function Creator() {
  return(
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >

      <CreatorContainer>
        <Header>
          <Link to='/main'><GrPrevious className="previous" size="40"/></Link>
          <MdPeopleOutline className="creator" size="40" />
          <h2>제작자</h2>
        </Header>
        <ProfileImgContainer>
          <img className="profileImg" src={profileImg} alt="쳐다보는 햄스터"></img>
          <h2 className="name">김지은</h2>
        </ProfileImgContainer>
        <Contact>
          <a className="contact" href="https://instagram.com/jieuny_0314?igshid=YmMyMTA2M2Y="><img className="contactIcon" src={instagram} alt="인스타그램 이미지"></img>jieuny_0314</a>
          <a className="contact" href="https://github.com/jieuny0314"><BsGithub className="contactIcon"/>jieuny0314</a>
        </Contact>
      </CreatorContainer>

    </motion.div>
  )
}

export default Creator;