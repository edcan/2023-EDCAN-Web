import React from "react";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

import backgroundImg from "../../assets/fileLogo.png"

const InputTitle = styled.div`
  font-size: 15px;
  color: #425563;
`

const GreenTitle = styled.div`
  font-size: 15px;
  color: ${props => props.isError ? "#FF7A7A":  "#00A9CE"};
`

const BoxonTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const FileImg = styled.div`
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  background-image: url(${backgroundImg});
  margin-right: 8px;
  @media (max-width: 650px) {
    width: 70px;
    height: 70px;
  }
`

const Border = styled.div`
  margin-top: 16px;
  border-radius: 12px;
  resize: none;
  font-size: 15px;
  width: 413px; 
  padding-top: 18px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: ${props => props.isError ? "inset 0 0 0 1px #FF7A7A":  "none"};
  border: ${props => props.isError ? "1px solid #FF7A7A" : "1px solid #E3E6E8" };
  @media (max-width: 650px) {
    width: 256px;
  }
  height: 55px;
  font-family: "SUIT";
  margin-bottom: 36px;
  color: ${props => props.isError ? "#FF7A7A" : "#98A4AE" };
  text-align: left;
`

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  width: 576px;
  align-items: flex-start;
  @media (max-width: 650px) {
    width: 340px;
  }
`

const Row = styled.div`
  display: flex;
`

const Btn = styled.div`
  margin-top: 16px;
  border-radius: 12px;
  width: 151px; 
  margin-right: 12px;
  font-size: 15px;
  border: 1px solid #E3E6E8;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  color: #768692;
  cursor: pointer;
  @media (max-width: 650px) {
    padding-left: 24px;
    width: 70px;
  }
`

const Txt = styled.span`
  visibility: ${props => props.width ? "hidden" : "visible"};;
`

const StyledFileInput = styled.input`
  display: none;
`

const FileInput = ({ onChange, ...rest }) => (
  <StyledFileInput type="file" onChange={onChange} {...rest} />
)

const PortFolioBox = ({ title, placeholder, height, length, onFileSelect }) => {
  const [fileName, setFileName] = useState("PDF 형식으로 제출해주세요")
  const [fileNameError, setFileNameError] = useState(false)
  const [selectedFileinBox, setSelectedFileinBox] = useState(1)
  const fileInputRef = useRef(null)

  const [width, setWidth] = useState()

  const widthRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      widthRef.current = window.innerWidth;
      const handleResize = () => (widthRef.current = window.innerWidth);
      window.addEventListener("resize", handleResize);
      setWidth(widthRef.current)

      onFileSelect(selectedFileinBox)
      if (selectedFileinBox !== 1) {
        if (selectedFileinBox.type !== "application/pdf") {
          onFileSelect(null)
        }
        else {
        }
      }
    }, 10);

    return () =>
      clearInterval(interval);
  }, [onFileSelect, selectedFileinBox]);

  const handleBtnClick = () => {
    fileInputRef.current.click()
  };

  const handleFileSelect = (event) => {
    const fileNames = event.target.files[0].name
    const file = event.target.files[0];
    const reader = new FileReader()
    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      const fileData = new Blob([event.target.result], { type: file.type });
      console.log("dede")
      if (event.lengthComputable) {
        setSelectedFileinBox({
          name: file.name,
          type: file.type,
          size: file.size,
          data: fileData
        });
      }
    };

    const isPdf = fileNames.toLowerCase().endsWith(".pdf")
    console.log(isPdf)
    if (!isPdf) {
      setFileNameError(true)
      setSelectedFileinBox(null)
    }
    else {
      setFileNameError(false)
    }
    if (event.target.files.length > 0) {
      if (fileNames.length > 54) {
        const truncatedFileName = fileNames.slice(0, 54) + "..."
        setFileName(truncatedFileName)
        Cookies.set("fileName", truncatedFileName)
      }
      else {
        setFileName(fileNames)
        Cookies.set("fileName", fileNames)
      }
    }
  }

  return (
    <Parent>
      <BoxonTop>
        <InputTitle>
          {title}
        </InputTitle>
        <GreenTitle
          isError={fileNameError}>
          {fileNameError ? "PDF 형식으로 제출해주세요" : "선택 사항" }
        </GreenTitle>
      </BoxonTop>
      <Row>
        <StyledFileInput type="file" onChange={handleFileSelect} ref={fileInputRef} />
        <Btn onClick={handleBtnClick}>
          <FileImg width={width < 650}/> 
          <Txt width={width < 650}>
            파일 첨부하기
          </Txt>
        </Btn>
        <Border
          placeholder={placeholder}
          height={height}
          isError={fileNameError}
        >
          {fileName}
        </Border>
      </Row>
    </Parent>
  )
}

export default PortFolioBox