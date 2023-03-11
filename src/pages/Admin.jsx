import React from "react"
import styled from "styled-components";

import edcanSymbol2 from ".././assets/blackSymbol.png"
import Body from "../components/Admin/Body"

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
  width: 1280px;
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

const Admin = () => {

  return (
    <div>
      <Header>
        <HeaderChild>
          <ImageBox />
        </HeaderChild>
      </Header>
      <Body/>
    </div>
  );
}

export default Admin;