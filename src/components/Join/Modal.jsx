import React from "react";
import styled from "styled-components";

import Button from "./Button"

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background-color: #000000;
  align-items: center;
  justify-content: center;
  display: flex;
  ${props => props.isOpen ? "" : "display: none;"}

`

const ModalFront = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  width: 552px;
  background-color: white;
  padding: 44px;
  @media (max-width: 650px) {
    width: 340px;
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
`

const Title = styled.div`
  text-align: left;
  font-size: 24px;
  color: #425563;
  line-height: 150%;
`

const S = styled.div`
  font-weight: 600;
`

const Desc = styled.div`
  width: 431px;
  height: 58px;
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  justify-content: space-between;
  font-size: 15px;
`

const DescChild = styled.div`
  display: flex;
`

const Gray = styled.span`
  color: #768692;
  margin-right: 8px;
`

const Margin = styled.div`
  margin-right: 145px;
  @media (max-width: 650px) {
    margin-right: 45px;
  }
`

const Caution = styled.div`
  width: 100%;
  height: 81px;
  @media (max-width: 650px) {
    height: 141px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 32px;
  font-size: 15px;
`

const RedText = styled.span`
  color: #FF7A7A;
  white-space: nowrap;
`

const Line = styled.div`
  display: flex;
`

const Column = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  line-height: 150%;
`

const ButtonParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 47px;
  margin-top: 32px;
`

const Now = styled.span`
  width: 340px;
  display: flex;
  line-height: 150%;
  text-align: left;
`

const Modal = (props) => {

  const handleClick = () => {
    props.onIncrement()
  }

  return (
    <>
      <ModalBackground isOpen={props.isOpen} />
      {props.isOpen && (
        <ModalFront>
          <Body>
            <Title>
              제출하기 전, <br/><S>다시 한 번 확인해주세요</S>
            </Title>
            <Desc>
              <DescChild>
                <Gray>학번</Gray> {props.num} <Margin />
                <Gray>이름</Gray> {props.name} 
              </DescChild>
              <DescChild>
                <Gray>포트폴리오</Gray> {props.fileName ? props.fileName : "쿠키 비허용인 경우 파일명이 뜨지 않지만 제출은 가능합니다."} 
              </DescChild>
            </Desc>
            <Caution>
              <Line>
                <RedText>주의!&nbsp;</RedText> <Now>- 다음과 같은 행위 적발 시 불이익이 있을 수 있습니다.</Now>
              </Line>
              <Column>
                <li>
                  개발자 도구 등을 이용하여 정상적이지 않은 경로 또는 방법으로 제출한 경우
                </li>
                <li>
                  타인의 포트폴리오를 도용하거나 표절한 경우
                </li>
              </Column>
            </Caution>
            <ButtonParent>
              <Button
                onIncrement={handleClick}
                color={true}
                loading={props.status}
                width="155px"
                title={props.status ? "업로드 중..." : "확인했습니다"}
              >
              </Button>
            </ButtonParent>
          </Body>
        </ModalFront>
      )}
    </>
  )
}

export default Modal;