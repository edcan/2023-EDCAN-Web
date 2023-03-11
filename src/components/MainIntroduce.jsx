/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */

import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

import IntroduceImage from "./IntroduceImage";
import Units from "./Units";

import ChildImg1 from "../assets/haram.png"

const Parent = styled.div`
  height: 1904px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 32px;
  padding-right: 32px;
`

const Child = styled.div`
  height: 1456px;
  width: 1216px;
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  flex-direction: column;
`

const IntroduceOurClub = styled.span`
  color: #425563;
  font-size: 15px;
  height: 200px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
`

const BoldText = styled.span`
  font-weight: 600;
  font-size: 24px;
  text-align: left;
`

const CommonText  = styled.span`
  text-align: left;
  line-height: 150%;
`

const IntroduceImageParent = styled.div`
  width: 1216px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

const MainIntroduce = () => {

  return (
    <Parent>
      <Child>
        <IntroduceOurClub>
          <BoldText>
            동아리 소개
          </BoldText>
          <CommonText>
            EDCAN은 2015년 처음 만들어진 소프트웨어과 소속 전공 동아리로, <br/>
            모바일 콘텐츠 개발 및 디자인을 주로 다루고 있습니다. <br/><br/>

            EDCAN의 부원 모두는 크리에이터로 불리며, 자유로운 분위기 속에서 <br/>
            각자의 분야와 장점을 살려 협업하고, 우리만의 것을 만들어가며 <br/>
            함께 발전하고 있습니다.
          </CommonText>
        </IntroduceOurClub>
        <IntroduceImageParent>
          <IntroduceImage
            src={ChildImg1}
            title="개척"
            desc="우리는 언제나 우리만의 것을 만들며, <br/>새로운 콘텐츠를 개척해나갑니다."
          />
          <IntroduceImage
            src={ChildImg1}
            title="개척"
            desc="우리는 언제나 우리만의 것을 만들며, <br/>새로운 콘텐츠를 개척해나갑니다."
          />
          <IntroduceImage
            src={ChildImg1}
            title="이해"
            desc="우리는 언제나 우리만의 것을 만들며, <br/>새로운 콘텐츠를 개척해나갑니다."
          />
        </IntroduceImageParent>
        <IntroduceImageParent>
          <Units
            title="ATELIER"
            desc="ATELIER는 EDCAN의 개발 유닛이며, <br/>Android Studio, Kotlin, Firebase, Git 등을 배웁니다."
          />
          <Units
            title="PIXEL"
            desc="PIXEL은 EDCAN의 디자인 유닛이며, <br/>웹 또는 앱 UI/UX, 디자인 시스템, Figma 등을 배웁니다."
          />
        </IntroduceImageParent>
      </Child>
    </Parent>
  )
}

export default MainIntroduce