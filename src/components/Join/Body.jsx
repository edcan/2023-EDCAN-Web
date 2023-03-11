/* eslint-disable no-eval */
import React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

import Box from "./Box"
import PortFolioBox from "./PortFolioBox"
import Button from "./Button"

import Modal from "./Modal"

import { firestore, storage } from "../../index.js";
import { ref, uploadBytes } from "firebase/storage";

const Parent = styled.div`
  width: 100%;
  
  height: 1973px;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Child = styled.div`
  width: 430px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 650px) {
    width: 340px;
  }
`

const Title = styled.div`
  color: #425563;
  font-weight: 600;
  font-size: 48px;
  margin-top: 200px;
  ${props => props.width ? "margin-top: 140px" : "margin-top: 200px"};
`

const TitleDesc = styled.div`
  width: 340px;
  color: #768692;
  font-size: 15px;
  text-align: center;
  margin-top: 26px;
  line-height: 150%;
  text-align: center;
  margin-bottom: 100px;
`

const ChooseUnit = styled.div`
  width: 340px;
  height: 67px;
  display: flex;
  margin-top: 64px;
  justify-content: space-between;
  margin-bottom: 64px;
`

const UnitBorder = styled.div`
  width: 165px;
  height: 47px;
  border: ${props => props.active ? "1px solid #425563" : "1px solid #E3E6E8" };
  border-radius: ${props => props.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: ${props => props.active ? "#425563" : "white"};
  color: ${props => props.active ? "white" : "#425563"};
  cursor: pointer;
`

const Submit = styled.div`
  width: 300px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 200px;
`

const Body = () => {
  const [unit, setUnit] = useState(Cookies.get("unit") ? Cookies.get("unit") : "ATELIER")
  const [num, setNum] = useState(Cookies.get("num") ? Cookies.get("num") : "")
  const [name, setName] = useState(Cookies.get("name") ? Cookies.get("name") : "")
  const [phone, setPhone] = useState(Cookies.get("phone") ? Cookies.get("phone") : "")
  const [question1, setQuestion1] = useState(Cookies.get("question1") ? Cookies.get("question1") : "")
  const [question2, setQuestion2] = useState(Cookies.get("question2") ? Cookies.get("question2") : "")
  const [selectedFile, setSelectedFile] = useState(null)
  const [nowUpload, setNowUpload] = useState(false)

  const [submitStatus, setSubmitStatus] = useState(false)
  const [modal, setModal] = useState(false)

  const handleFileUpload = (file) => {
    setSelectedFile(file);
  };

  const [question1Length, setQuestion1Length] = useState(0)
  const [question2Length, setQuestion2Length] = useState(0)

  useEffect(() => {
    Cookies.set("unit", unit)
    Cookies.set("num", num)
    Cookies.set("name", name)
    Cookies.set("phone", phone)
    Cookies.set("question1", question1)
    Cookies.set("question2", question2)
    Cookies.set("fileName", "제출하지 않음")
    Cookies.set("EDCAN", "EDCAN은 정말 짱이야")

    return () => {

    }
  }, [unit, num, name, question1, question2, phone])

  const sendData = () => {
    console.log(selectedFile)
    console.log("OK")

    const db = firestore;
    const Ref = db.collection("joiner")

    const handleUpload = async (dataSize, size) => {
      try {
        await upload(dataSize, size)
        await fileUpload()
        alert("제출이 완료되었습니다!\n지원해주셔서 감사합니다 :)")
        window.location.href = "https://edcan.kr"
      }
      catch (error) {
        console.log(error)
      }
    };

    const fileUpload = async () => {
      const file = selectedFile.data;
      const fileName = `${num} ${name} (${unit})`
      const fileRef = ref(storage, `portFolio/${fileName}.pdf`);
  
      await uploadBytes(fileRef, file).then((snapshot) => {
        console.log("PDF 업로드 완료!");
      });
    }

    const getDocumentSize = async () => {
      setNowUpload(true)
      const snapshot = await Ref.get()
      await handleUpload(`${snapshot.size + 1}: ${num} ${name} (${unit})`, snapshot.size + 1)
    }

    const upload = async (dataSize, size) => {
      await Ref.doc(String(dataSize)).set({
        id: size,
        unit: unit,
        num: num,
        phone: phone,
        name: name,
        question1: question1,
        question2: question2,
        isPortFolio: (selectedFile === 1 ? "NO" : "YES")
      })
    }

    (async () => {
      await getDocumentSize()
    })()
  }

  const submitOK = () => {
    if (submitStatus) {
      setModal(true)
    }
  }

  const [width, setWidth] = useState()
  const widthRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      widthRef.current = window.innerWidth;
      const handleResize = () => (widthRef.current = window.innerWidth);
      window.addEventListener("resize", handleResize);
      setWidth(widthRef.current)

      const strWithoutSpaces = question1.replace(/\s/g, "")
      const strLengthWithoutSpaces = strWithoutSpaces.length
      setQuestion1Length(strLengthWithoutSpaces)
      const strWithoutSpaces2 = question2.replace(/\s/g, "")
      const strLengthWithoutSpaces2 = strWithoutSpaces2.length
      setQuestion2Length(strLengthWithoutSpaces2)

      const fun = (files) => {
        let isValidJson = false;
        try {
          const parsedFile = JSON.parse(files);
          isValidJson = parsedFile && typeof parsedFile === "object"
          return isValidJson
        } 
        catch {
          return isValidJson
        }
      }

      if ((strLengthWithoutSpaces2 < 300 && strLengthWithoutSpaces < 300) && (num.length === 5 && name.length < 5)){
        if (selectedFile !== 1  && fun(selectedFile) !== null) {
          setSubmitStatus(true)
        }
        else if (selectedFile === null) {
          setSubmitStatus(false)
        }
        else if (selectedFile === 1) {
          setSubmitStatus(true)
        }
        else {
          setSubmitStatus(false)
        }
      }
      else {
        setSubmitStatus(false)
      }
    }, 10);

    return () =>
      clearInterval(interval);
  }, [name, num, question1, question2, selectedFile]);

  const check1 = (event) => {
    setQuestion1(event.target.value);
  }

  const check2 = (event) => {
    setQuestion2(event.target.value);
  }

  return (
    <div>
      <Modal
        isOpen={modal}
        num={num}
        name={name}
        status={nowUpload}
        fileName={Cookies.get("fileName")}
        onIncrement={sendData}
      />
      <Parent>
        <Child>
          <Title width={width < 650}>
            ATELIER 지원
          </Title>
          <TitleDesc>
            포트폴리오를 제외한 질문은 필수 답변이며, <br/>
            지망 지원서도 제출해야 지원이 확정됩니다. <br/>
            솔직하고 성의있게 작성해주시면 감사하겠습니다.
          </TitleDesc>

          {/* <ChooseUnit>

            <UnitBorder
              border="32px 8px 8px 32px"
              onClick={() => setUnit("ATELIER")}
              active={unit === "ATELIER"}>
                ATELIER (개발자)
            </UnitBorder>

            <UnitBorder
              border="8px 32px 32px 8px"
              onClick={() => setUnit("PIXEL")}
              active={unit === "PIXEL"}>
                PIXEL (디자이너)
            </UnitBorder>

          </ChooseUnit> */}

          <Box
            title="학번"
            desc="필수 입력사항입니다."
            placeholder="학번 5자리를 정확하게 입력해주세요"
            height="56px"
            value={num}
            onChange={(event) => setNum(event.target.value)} />

          <Box
            title="이름"
            desc="필수 입력사항입니다."
            placeholder="이름을 입력해주세요"
            height="56px"
            value={name}
            onChange={(event) => setName(event.target.value)} />

          <Box
            title="전화번호"
            desc="필수 입력사항입니다."
            placeholder="010 1234 5678"
            height="56px"
            value={phone}
            onChange={(event) => setPhone(event.target.value)} />

          <Box
            title="자기소개"
            desc="필수 입력사항입니다."
            placeholder="자신을 잘 드러낼 수 있는 자기소개를 작성해주세요 (공백 제외 300자 이내)"
            height="239px"
            value={question1}
            onChange={(event) => check1(event)}
            onPaste={(event) => check1(event)}
            length={question1Length} />

          <Box
            title="지원동기"
            desc="필수 입력사항입니다."
            placeholder="지원 동기를 솔직하게 작성해주세요 (공백 제외 300자 이내)"
            height="239px"
            value={question2}
            onChange={(event) => check2(event)}
            onPaste={(event) => check2(event)}
            length={question2Length} />

          <PortFolioBox
            title="포트폴리오"
            desc="선택 사항"
            height="56px"
            onFileSelect={setSelectedFile}
          />

          <Submit>
            <Button
              onIncrement={submitOK}
              color={submitStatus}
              width="103px" 
              title="제출"
            >
            </Button>
          </Submit>

        </Child>
      </Parent>
    </div>
  )
}

export default Body