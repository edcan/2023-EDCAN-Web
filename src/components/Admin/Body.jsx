import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Data from "../../data/adminData"

const Parent = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Child = styled.div`
  width: 800px;
  height: 300px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const Title = styled.div`
  padding-top: 160px;
  font-size: 34px;
  font-weight: 600;
  color: #425563;
`

const Desc = styled.div`
  padding-top: 16px;
  font-size: 16px;
  color: #98A4AE;
`

const DataBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  height: 110px;
  box-sizing: border-box;
  background-color: #F7F8F9;
  color: white;
  padding: 26px;
  border-radius: 18px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const SecondChild = styled.div`
  width: 800px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
`

const BigTxt = styled.div`
  font-size: 22px;
  color: #425563;
  font-weight: 600;
`

const SmallTxt = styled.div`
  font-size: 16px;
  margin-top: 10px;
  color: gray;
`

const Body = () => {
  return (
    <Parent>
      <Child>
        <Title>
          EDCAN 관리자 페이지
        </Title>
        <Desc>
          포트폴리오, 동아리 부원 목록, EDUCAN 등을 수정할 수 있는 페이지입니다.
        </Desc>
      </Child>
      <SecondChild>
        {
          Data.map(i => (
            <DataBox item={i} key={i.id}>
              <BigTxt onClick={() => console.log(i)}>
                {i.name}
              </BigTxt>
              <SmallTxt>
                {i.desc}
              </SmallTxt>
            </DataBox>
          ))
        }
      </SecondChild>
    </Parent>
  )
}

export default Body