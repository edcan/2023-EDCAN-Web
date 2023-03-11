import React from "react"
// import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import edcanSymbol2 from ".././assets/edcan_navy.png"


import Body from "../components/Join/Body"

const ImageSet = `
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
`

const ImageBox = styled.div`
  width: 31px;
  height: 28px;
  background-image: url(${edcanSymbol2});
  ${ImageSet}
`

const HeaderChild = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #E3E6E8;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`
const move = () => {
  document.location.href = "https://edcan.kr"
}

const Join  = () => {

  return (
    <>
      <Header>
        <HeaderChild>
          <ImageBox onClick={() => move()}/>
        </HeaderChild>
      </Header>
      <Body />
      <Footer />
    </>
  );
}

export default Join;