/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */

import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

const Parent = styled.div`
  width: 592px;
  height: 512px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #F7F8F9;
`

const Title = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
`

const Child = styled.div`
  text-align: left;
  color: 425563;
  padding: 32px;
`

const Desc = styled.div`
  font-size: 18px;
  line-height: 150%;
  color: #768692;
  font-weight: 500;
`

const Units = ({ title, desc }) => {
  return (
    <Parent>
      <Child>
        <Title>
          {title}
        </Title>
        <Desc dangerouslySetInnerHTML={{ __html: desc }} />
      </Child>
    </Parent>
  )
}

export default Units