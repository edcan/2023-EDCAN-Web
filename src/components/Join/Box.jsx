import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

const InputTitle = styled.div`
  font-size: 15px;
  color: #425563;
`

const RedTitle = styled.div`
  font-size: 15px;
  color: #FF7A7A;
  visibility: hidden;
`

const PurpleTitle = styled.div`
  font-size: 15px;
  color: #FF7A7A;
`

const BlueTitle = styled.div`
  font-size: 15px;
  color: #98A4AE;
`

const BoxonTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Border = styled.textarea`
  margin-top: 16px;
  border-radius: 12px;
  resize: none;
  font-size: 15px;
  width: 576px; 
  padding-top: 18px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: ${props => props.isError ? "inset 0 0 0 1px #FF7A7A" : "none"};
  border: ${props => props.isError ? "1px solid #FF7A7A" : "1px solid #E3E6E8"};
  height: ${props => props.height};
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
  line-height: ${props => props.lineHeight};
  color: #425563;
  transition: all 0.1s ease;
`

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  width: 576px;
  align-items: flex-start;
  @media (max-width: 650px) {
    width: 340px;
  }
`

const Box = ({title, desc, placeholder, height, value, onChange, length, condition }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <Parent>
      <BoxonTop>
        <InputTitle>
          {title}
        </InputTitle>
        {
          length !== undefined
            ? length > 300
              ? <PurpleTitle>{length}/300</PurpleTitle>
              : <BlueTitle>{length}/300</BlueTitle>
            : <RedTitle>{desc}</RedTitle>
        }
      </BoxonTop>
      <Border
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        height={height}
        value={value}
        onChange={onChange}
        lineHeight={height === "239px" ? "150%" : "100%"}
        isError={length > 300} />
    </Parent>
  )
}

export default Box