import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

import MemberData from "../data/data"

const Parent = styled.div`
  width: 100%;
  height: 960px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  align-items: center;
`

const Child = styled.div`
  width: 1216px;
  height: 436px;
  display: flex;
  margin-bottom: 80px;
`

const CenterBox = styled.div`
  height: 436px;
  margin-left: 64px;
  margin-right: 64px;
  width: 1px;
  background-color: #E3E6E8;
`

const LeftBox = styled.div`
  width: 544px;
  height: 311px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const RightBox = styled.div`
  width: 544px;
  height: 311px;
  text-align: left;
`

const LeftTitle = styled.div`
  font-weight: 600;
  color: #425563;
  font-size: 24px;
  margin-bottom: 32px;
`

const LeftDesc = styled.div`
  color: #425563;
  font-size: 15px;
  line-height: 150%;
  text-align: left;
`

const LeftBorder = styled.div`
  height: 125px;
  width: 100%;
  border: 1px solid #E3E6E8;
  border-radius: 12px;
  margin-top: 32px;
`

const Bottom = styled.div`
  width: 1280px;
  background-color: black;
  height: 44px;
`

const Generation = styled.div`
  color: #98A4AE;
  font-size: 24px;
  margin-bottom: 20px;
`

const Generation10th = styled.div`
  color: #98A4AE;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 48px;
`

const MemberStyleStrong = styled.div`
  display: inline-block;
  font-size: 48px;
  font-weight: 600;
  color: #425563;
  margin-right: 10px;
  margin-bottom: 8px;
  cursor: pointer;
`

const MemberStyleWeak = styled.div`
  display: inline-block;
  font-size: 48px;
  font-weight: 600;
  color: #768692;
  margin-right: 10px;
  margin-bottom: 8px;
  cursor: pointer;
`

const Member = () => {
  const [selected, setSelected] = useState(1);

  return (
    <Parent>
      <Child>

        <LeftBox>
          <LeftTitle>
            부원
          </LeftTitle>
          <LeftDesc>
            2023년 기준 10번째 기수를 맞이할 예정이며, 현재 총 12명의 부원들이 EDCAN을 함께 이끌어나가고 있습니다. <br/><br/>
            부원 이름을 클릭하면, 부원들의 소개를 확인할 수 있습니다.
          </LeftDesc>
          <LeftBorder>

          </LeftBorder>
        </LeftBox>

        <CenterBox />

        <RightBox>
          <Generation>
            8/9기
          </Generation>
          {
            MemberData.map(i => {
              return (
                selected === i.id ?
                  <MemberStyleStrong item={i} key={i.id}>
                    {i.name}
                  </MemberStyleStrong> :
                  <MemberStyleWeak item={i} key={i.id} onClick={() => setSelected(i.id)}>
                    {i.name}
                  </MemberStyleWeak>
              )
            })
          }
          <Generation10th>
            10기
          </Generation10th>
          <MemberStyleWeak>
            여러분을 기다리고 있습니다
          </MemberStyleWeak>
        </RightBox>

      </Child>
      <Bottom>

      </Bottom>
    </Parent>
  )
}

export default Member