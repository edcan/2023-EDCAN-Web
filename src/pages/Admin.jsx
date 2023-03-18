import React from "react"
import { useState, useEffect } from "react";
import styled from "styled-components";

import edcanSymbol2 from ".././assets/blackSymbol.png"
import Body from "../components/Admin/Body"
import Main from "../components/Admin/Main"

import { firestore, storage } from "../index"

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
  z-index: 99;
`

const Admin = () => {

  const [certify, setCertify] = useState(false)
  const [keys, setKeys] = useState([]);
  const [member, setMember] = useState([]);

  const db = firestore;
  const Ref = db.collection("keys").doc("value");

  useEffect(() => {
    Ref.get().then((doc) => {
      if (doc.exists) {
        const keyData = doc.data();
        const keyArray = Object.values(keyData).slice(0, 10);
        setKeys(keyArray);
      }
      else {
        console.log("데이터 읽기 오류");
      }
    })
  }, []);

  const handleReturnOKChange = (newValue) => {
    if (newValue === true) {
      setCertify(true);
    }
  };

  return (
    <div>
      <Header>
        <HeaderChild>
          <ImageBox />
        </HeaderChild>
      </Header>
      {certify ?
        (
          <Main data={keys} onChange={handleReturnOKChange} />
        ) : (
          <Body data={keys} onChange={handleReturnOKChange} />
        )
      }
    </div>
  );
}

export default Admin;