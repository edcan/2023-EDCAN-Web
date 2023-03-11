import React from "react"
import { useState, useEffect } from "react";
import styled from "styled-components";

import { firestore, storage } from "../../index"
import { ref, getDownloadURL } from "firebase/storage";

const Parent = styled.div`
  width: 100%;
  height:calc(100vh + 100%);
  margin-bottom: 200px;
  background-color: white;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const Child = styled.div`
  margin-left: 20px;
  width: 430px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 650px) {
    width: 340px;
  }
  margin-bottom: 300px;
`

const Title = styled.div`
  color: #425563;
  font-weight: 600;
  font-size: 42px;
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
`

const Desc = styled.div`
  width: 340px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`

const InfoBox = styled.div`
  width: 340px;
  height: 80px;
  border-radius: 28px;
  background-color: ${props => props.color ? "#E8EBEE" : "#F7F8F9"};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 10px;
  transition: all 0.2s ease;
  padding-bottom: 10px;
  cursor: pointer;
`

const BoxLength = styled.div`
  width: 50px;
  font-weight: 600;
  color: #425563;
  font-size: 26px;
`

const BoxNum = styled.div`
  margin-right: 6px;
  line-height: 150%;
  font-size: 18px;
`

const BoxName = styled.div`
  font-size: 18px;
  font-weight: 500;
`

const BoxTop = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const BoxTop2 = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`


const BoxSmall = styled.div`
  font-size: 16px;
  line-height: 150%;
`

const BoxBig = styled.div`
  font-size: 16px;
  font-weight: 500;
`

const Right = styled.div`
  text-align: left;
  margin-left: 50px;
  margin-right: 20px;
  width: 650px;
  height: 650px;
  border-radius: 42px;
  display: flex;
  padding: 40px;
  margin-top: 200px;
  position: sticky;
  top: 200px;
  background-color: #F7F8F9;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 40px;
`

const Port = styled.div`
  color: #98A4AE;
  cursor: pointer;
`

const Main = () => {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [info, setInfo] = useState([]);

  const fileRef = ref(storage, `portFolio/${info[selected] && info[selected].data.num} ${info[selected] && info[selected].data.name} (ATELIER).pdf`);

  const getPDF = () => {
    getDownloadURL(fileRef)
      .then((url) => {
        // URL을 사용하여 파일 다운로드
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank"; // 새 탭에서 열리도록 추가
        link.download = `${info[selected] && info[selected].data.num} ${info[selected] && info[selected].data.name} (ATELIER).pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
      });
  } 

  useEffect(() => {
    const fetchData = async () => {
      const db = firestore;
      const snapshot = await db.collection("joiner").get();
      const newData = snapshot.docs.map((doc, index) => ({
        id: index,
        data: doc.data()
      }));
      setInfo(newData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (info.length > 0) {
      const firstDocData = info[0].data;
      setData(firstDocData);
    }
    console.log(info)
  }, [info]);

  return (
    <Parent>
      <Child>
        <Title>
          실시간 지원자 {info.length}명
        </Title>
        <TitleDesc>
          개발자: {info.length}명 / 디자이너: 0명
        </TitleDesc>
        <TitleDesc>
          올해 EDCAN에 지원한 학생 목록입니다. <br/>
          면접관들은 학생들의 지원서를 꼼꼼히 읽어주세요. <br/>
          각 탭을 누르면 상세 정보를 열람할 수 있습니다.
        </TitleDesc>
        <Desc>
          {
            info.map(i => (
              <InfoBox
                item={i}
                key={i.id}
                onClick={() => setSelected(i.id)}
                color={selected === i.id}
              >
                <BoxLength>
                  {i.id + 1}
                </BoxLength>
                <BoxNum>
                  {i.data.num}
                </BoxNum>
                <BoxName>
                  {i.data.name}
                </BoxName>
              </InfoBox>
            ))
          }
        </Desc>
      </Child>

      <Right>
        <BoxTop2>
          <span>
            <BoxNum>
              {info[selected] && info[selected].data.num}
            </BoxNum>
            <BoxName>
              {info[selected] && info[selected].data.name} {info[selected] && (info[selected].data.unit === "ATELIER" ? "(개발자)" : "(디자이너)")}
            </BoxName>
          </span>
          {
            (info[selected] && info[selected].data.isPortFolio) === "YES" &&
              <Port onClick={() => getPDF()}>
                포트폴리오
              </Port>
          }
        </BoxTop2>
        <BoxTop><BoxBig>자기소개</BoxBig></BoxTop>
        <BoxTop><BoxSmall>{info[selected] && info[selected].data.question1}</BoxSmall></BoxTop>
        <BoxTop><BoxBig>지원동기</BoxBig></BoxTop>
        <BoxTop><BoxSmall>{info[selected] && info[selected].data.question2}</BoxSmall></BoxTop>
      </Right>

    </Parent>
  );
}

export default Main;