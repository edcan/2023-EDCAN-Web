/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */

import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

const Parent = styled.div`
  width: 384px;
  height: 512px;
  border-radius: 12px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const Child = styled.div`
  text-align: left;
  color: white;
  padding: 32px;
`

const Title = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
`

const Desc = styled.div`
  font-size: 18px;
  line-height: 150%;
  font-weight: 500;
`

const IntroduceImage = ({ src, title, desc }) => {
  return (
    <Parent bgImage={src}>
      <Child>
        <Title>
          {title}
        </Title>
        <Desc dangerouslySetInnerHTML={{ __html: desc }} />
      </Child>
    </Parent>
  )
}

export default IntroduceImage