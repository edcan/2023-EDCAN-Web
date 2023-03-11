import Header from "../components/Header";
import MainIntroduce from "../components/MainIntroduce";
import Footer from "../components/Footer"
import Member from "../components/Member"
import PortFolio from "../components/PortFolio"

import "../style/index.css";

import styled from "styled-components";
import BackgroundImage from "../assets/background.png"

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${BackgroundImage});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  color: white;
  line-height: 100px;
  opacity: 0.5;
`

const Body = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const OurVision = styled.div`
  width: 100%;
  height: 648px;
  background-color: #F7F8F9;
  font-size: 24px;
  line-height: 175%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const S = styled.span`
  font-weight: 600;
`

const Main = () => {
  return (<div className="RealParent">
    <Header />
    
    <Body>
      <Background>
        <div>
          We are Creators, <br/>
          <S>EDCAN</S>
        </div>
      </Background>
    </Body>

    <OurVision>
      <div>
        우리는 모바일 앱이나, 웹 페이지를 만들지만, <br/>
        개발자나, 디자이너와 같은 <S>무언가로 정의</S>되지 않습니다. <br/><br/>

        우리는 모두가 같은 것들을 만들어 낼 때, <br/>
        <S>우리만의 것을 만드는</S> 사람들입니다. <br/><br/>

        우리는 <S>창작자</S>입니다. <br/>
        우리는 <S>EDCAN</S>입니다.
      </div>
    </OurVision>

    <MainIntroduce />
    <Member />
    <PortFolio />

    <Footer />
  </div>
  );
}

export default Main;