import React, {useState} from "react";
import styled from "styled-components";

import Check from "../../assets/check.png"


const Button = styled.div`
  width: ${props => props.width};
  height: 47px;
  background-color: ${props => props.color ? "#425563" : "#98A4AE"};
  border-radius: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  ${props => props.loading ? "background-color: #98A4AE" : "background-color: #425563"};
`

const Img = styled.div`
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  display: inline-block;
  background-image: url(${Check});
  margin-left: 8px;
`

const ButtonComponent = (props) => {

  const handleClick = () => {
    props.onIncrement()
  }
  
  return (
    <Button
      width={props.width}
      color={props.color}
      onClick={handleClick}
      loading={props.loading}
    >
      {props.title}
      <Img/>
    </Button>
  )
}

export default ButtonComponent