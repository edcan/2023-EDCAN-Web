import React from "react"
import { useState, useEffect } from "react";
import styled from "styled-components";

import { firestore, storage } from "../../index"

const Parent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Main = () => {

  return (
    <Parent>
    </Parent>
  );
}

export default Main;