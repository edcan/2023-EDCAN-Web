/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import img from "../assets/edcanGroup.png"
import place from "../assets/footer_place.png"


const Parent = styled.div`
  width: 100%;
  height: 230px;
  background-color: #F7F8F9;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Child = styled.div`
  width: 1216px;
  height: 143px;
  display: flex;
  justify-content: center;
  color: #768692;
  align-items: center;
`

const FirstMenu = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled.div`
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${img});
  width: 120px;
  height: 20px;
`

const Address = styled.div`
  font-size: 15px;
  line-height: 150%;
  margin-top: 24px;
`

const Place = styled.div`
  display: inline-block;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${place});
  width: 18px;
  height: 18px;
  border: none;
  position: relative;
  top: 3px;
`

const OtherMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 135px;
  height: 179px;
  font-size: 15px;
  align-items: flex-start;
`

const Title = styled.div`
  color: #98A4AE;
  margin-bottom: 16px;
`

const Border = styled.div`
  width: 24px;
  height: 1px;
  background-color: #D0D4D8;
  margin-bottom: 16px;
`

const Text = styled.div`
  margin-bottom: 12px;
  color: #768692;
  cursor: pointer;
`

const Align = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LinkData = [
  { id: 1, title: "블로그", link: "https://blog.edcan.kr/" },
  { id: 2, title: "깃허브", link: "https://github.com/edcan" },
  { id: 3, title: "아이덴티티 가이드라인", link: "/", aviliable: false },
  { id: 4, title: "EDUCAN", link: "https://edu.edcan.kr/" }
]

const SNSData = [
  { id: 1, title: "인스타그램", link: "https://naver.com" },
  { id: 2, title: "페이스북", link: "https://naver.com" },
  { id: 3, title: "유튜브", link: "https://naver.com" },
]

const ArchiveData = [
  { id: 1, title: "2019", link: "/", aviliable: false  },
  { id: 2, title: "2020", link: "/", aviliable: false  },
  { id: 3, title: "2021", link: "/", aviliable: false  },
  { id: 4, title: "2022", link: "/", aviliable: false  },
]

const TitleData = [
  { id: 1, title: "바로가기", variable: "LinkData" },
  { id: 2, title: "SNS", variable: "SNSData" },
  { id: 3, title: "웹사이트 아카이브 ", variable: "ArchiveData" }
]

const Footer = () => {

  return (
    <Parent>
      <Child>
        <FirstMenu>
          <Align>
            <Image />
          </Align>
          <Address>
            <a href="/scoreform">서</a>울 용산구 원효로97길 33-4 <br/> 선린인터넷고등학교 421실 <Place/>
          </Address>
        </FirstMenu>

        {/* {
          TitleData.map(j => (
            <OtherMenu>
              <Title>
                {j.title}
              </Title>
              <Border />
              {
                eval(j.variable).map(i => (
                  <Text item={i} key={i.id}>
                    {
                      i.aviliable ? (
                        <a href={i.link} target="_BLANK" rel="noreferrer">
                          {i.title}
                        </a>
                      ) : (
                        <div onClick={() => alert("준비중입니다.")}>
                          {i.title}
                        </div>
                      )
                    }
                  </Text>
                ))
              }
            </OtherMenu>
          ))
        } */}

      </Child>
    </Parent>
  )
}

export default Footer