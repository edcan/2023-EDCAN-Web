import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

const Parent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Child = styled.div`
  width: 800px;
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: 600;
  color: #425563;
`

const Desc = styled.div`
  padding-top: 16px;
  font-size: 16px;
  color: #98A4AE;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 26px;
`

const BorderParent = styled.div`
  width: 340px;
  height: 56px;
`

const Border = styled.textarea`
  margin-top: 16px;
  border-radius: 12px;
  resize: none;
  font-size: 15px;
  width: 340px; 
  padding-top: 18px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: ${props => props.isError ? "inset 0 0 0 1px #FF7A7A" : "none"};
  border: ${props => props.isError ? "1px solid #FF7A7A" : "1px solid #E3E6E8"};
  height: 56px;
  ::placeholder {
    color: #98A4AE;
  }
  :active, :focus {
    box-shadow: ${props => props.isError ? "inset 0 0 0 1px #FF7A7A" : "inset 0 0 0 1px #00A9CE"};
    border: ${props => props.isError ? "1px solid #FF7A7A" : "1px solid #00A9CE"};
    outline: none
  }
  @media (max-width: 650px) {
    width: 340px;
  }
  font-family: "SUIT";
  margin-bottom: 36px;
  color: #425563;
  transition: all 0.1s ease;
`

const Body = ({ data, onChange, isTrue }) => {

  const [value, setValue] = useState()

  const handleReturnOKChange = (newValue) => {
    setValue(newValue)
    isTrue(true);
  };

  useEffect(() => {
    if (data) {
      if (data.includes(value)) {
        Cookies.set("auth", value);
        onChange(true);
      }
    }
    if (data.includes(Cookies.get("auth"))) {
      onChange(true);
    }
  });

  return (
    <Parent>
      <Child>
        <Title>
          EDCAN 관리자 인증
        </Title>
        <Desc>
          각자 인증키를 입력하여 관리자를 인증해주세요.
        </Desc>
        <BorderParent>
          <Border
            Placeholder="인증키 16자리를 입력해주세요"
            value={value}
            onChange={(event) => handleReturnOKChange(event.target.value)} 
          />
        </BorderParent>
      </Child>
    </Parent>
  )
}

export default Body