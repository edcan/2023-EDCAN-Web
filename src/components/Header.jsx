/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import edcanSymbol from "../assets/edcanSymbol.png";
import edcanSymbol2 from "../assets/dark_edcanSymbol.png";

import arrowDown from "../assets/arrowDown.png";
import arrowDown2 from "../assets/dark_arrowDown.png";

import darkMode from "../assets/darkMode.png";
import darkMode2 from "../assets/dark_Darkmode.png";

const ImageSet = `
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
`

const ImageBox = styled.div`
  width: 31px;
  height: 28px;
  background-image: ${props => props.backgroundImg};
  ${ImageSet}
  margin-right: 32px;
`

const AlignCenter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 1280px;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
`

const HeaderItem = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: ${props => props.strong};;
`

const ShortButton = styled.div`
  border: ${props => props.border};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  width: 37px;
  height: 37px;
  margin: 2px;
  background-image: ${props => props.image};
  ${ImageSet}
  background-size: 45%;
  cursor: pointer;
  margin-left: 12px;
`

const SlideButton = styled.div`
  width: 12px;
  height: 8px;
  background-image: ${props => props.image};
  ${ImageSet}
  cursor: pointer;
  margin-left: 10px;
`

const Wrap = styled.div`
  display: flex;
`

const LongButton = styled.div`
  border: ${props => props.border};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
`

const Parent = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  padding-right: 32px;
  padding-left: 32px;
  position: fixed;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border-bottom: ${props => props.border};
`

const HeaderData = [
  { id: 1, title: "소개", aviliable: true, link: "/" },
  { id: 2, title: "부원", aviliable: true, link: "/" },
  { id: 3, title: "수상", aviliable: true, link: "/"  },
  { id: 4, title: "Q&A", aviliable: true, link: "/" },
  { id: 5, title: "포트폴리오", aviliable: true, link: "/"  },
  { id: 6, title: "지원하기", aviliable: true, link: "/join"  },
]

const Header = ({ pr }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const regex = /\/join$/;
  const [isHeaderWhite, setIsHeaderWhite] = useState(regex.test(window.location.href));

  useEffect(() => {
    setCurrentUrl(window.location.href);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (regex.test(window.location.href) || scrollPosition > window.innerHeight) {
        setIsHeaderWhite(true);
      } else {
        setIsHeaderWhite(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [regex]);

  const handleImageBoxClick = () => {
    window.location.href = "/"
  };

  return (
    <Parent
      backgroundColor={isHeaderWhite ? "white" : "transparent"}
      color={isHeaderWhite ? "#768692" : "white"}
      border={isHeaderWhite ? "1px solid #E3E6E8": "none"}
    >
      <AlignCenter>
        <Wrap>
          <ImageBox
            onClick={handleImageBoxClick}
            backgroundImg={isHeaderWhite ? `url(${edcanSymbol2})` : `url(${edcanSymbol})`}
          />
          {
            HeaderData.map(i => (
              i.aviliable === true &&
              <HeaderItem item={i} key={i.id}>
                <a href={i.link}>
                  {i.title}
                </a>
              </HeaderItem>
            ))
          }
        </Wrap>
        <Wrap>
          <LongButton
            border={isHeaderWhite ? "1px solid #D0D4D8" : "1px solid rgba(255, 255, 255, 0.25)"}
          >
            바로가기
            <SlideButton
              image={isHeaderWhite ? `url(${arrowDown2})` : `url(${arrowDown})`}
            />
          </LongButton>

          <ShortButton
            image={isHeaderWhite ? `url(${darkMode2})` : `url(${darkMode})`}
            border={isHeaderWhite ? "1px solid #D0D4D8" : "1px solid rgba(255, 255, 255, 0.25)"}
          />
        </Wrap>

      </AlignCenter>
    </Parent>
  )
}

export default Header