import React from "react"
import { useState, useEffect } from "react";
import styled from "styled-components";

import { firestore, storage } from "../../index"
import { ref, getDownloadURL } from "firebase/storage";
import Cookies from "js-cookie";


import Check from "../../assets/check.png"

const Btn = styled.div`
  width: ${props => props.width};
  height: 47px;
  background-color: ${props => props.color ? "#425563" : "#98A4AE"};
  border-radius: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  padding-left: 22px;
  padding-right: 22px;
  margin-bottom: 200px;
  ${props => props.loading ? "background-color: #98A4AE" : "background-color: #425563"};
`

const Img = styled.div`
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  display: inline-block;
  background-image: url(${Check});
  margin-left: 8px;
`

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
  margin-top: 40px;
`

const InfoBox = styled.div`
  width: 340px;
  height: 72px;
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
  font-size: 15.5px;
  line-height: 150%;
`

const BoxBig = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #768692;
`

const RightParent = styled.div`
  text-align: left;
  margin-left: 50px;
  margin-right: 20px;
  width: 650px;
  height: 650px;
  display: flex;
  margin-top: 200px;
  position: sticky;
  top: 200px;
  flex-direction: column;
  padding-bottom: 40px;
`

const Right = styled.div`
  width: 100%;
  height: 550px;
  padding: 30px;
  margin-bottom: 20px;
  background-color: #F7F8F9;
  border-radius: 28px;
  overflow-y: auto;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`

const Goto = styled.div`
  width: 100%;
  height: 60px;
  padding: 20px;
  background-color: ${props => props.color ? "#E8EBEE" : "#F7F8F9"};
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color ? "#425563" : "#98A4AE"};
  font-weight: 500;
  cursor: pointer;
  margin-right: ${props => props.len ? "10px" : "0px"};
  margin-left: ${props => props.len ? "0px" : "10px"};
`

const GotoParent = styled.div`
  width: 650px;
  height: 80px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  color: #98A4AE;
  font-weight: 500;
  cursor: pointer;
`

const SelectUnit = styled.div`
  margin-top: 40px;
  width: 340px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Units = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
  border-radius: 32px;
  color: #425563;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.1s ease;
  border: 1px solid #425563;
  background-color: ${props => props.active ? "#425563" : "white"};
  color: ${props => props.active ? "white" : "#425563"};
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const ScoreParent = styled.div`
  width: 800px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OnBack = styled.div`
  margin-top: 130px;
  color: #98A4AE;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`

const ScoreTitle = styled.div`
  font-size: 40px;
  color: #425563;
  font-weight: 600;
  margin-top: 50px;
`

const ScoreTxt = styled.div`
  font-size: 18px;
  color: #98A4AE;
  margin-top: 20px;
  line-height: 150%;
`

const ScoreBody = styled.div`
  margin-bottom: 50px;
`

const ScoreWrap = styled.div`
  margin-top: 30px;
  width: 570px;
  font-size: 18px;
  text-align: left;
  margin-bottom: 60px;
`

const ScoreBodyInfo = styled.div`
  margin-top: 14px;
  color: #98A4AE;
  font-size: 16px;
  margin-bottom: 16px;
  line-height: 150%;
`

const ScoreBodyTitle = styled.div`
  font-weight: 500;
  color: #425563;
`

const ScoreDescs = styled.div`
  margin-top: 10px;
  padding-left: 2px;
  padding-right: 2px;
  display: flex;
  justify-content: space-between;
`

const Childs = styled.div`
  width: 60px;
  font-size: 15px;
  color: #98A4AE;
  text-align: ${props => props.ts ? "right" : "center"};
`

const ScoreRadio = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid ${({ active }) => active ? "#425563" : "#CED5D9"};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => active ? "#fff" : "#CED5D9"};
  font-weight: 500;
  transition: all 0.1s ease;

  cursor: pointer;
  background-color: ${({ active }) => active ? "#425563" : "transparent"};

  &:hover {
    background-color: ${({ active }) => active ? "#425563" : "#F3F4F5"};
  }
`

const ScoreRadioParent = styled.div`
  width: 570px;
  display: flex;
  justify-content: space-between;
`

const Border = styled.textarea`
  margin-top: 46px;
  border-radius: 12px;
  resize: none;
  font-size: 15px;
  width: 600px; 
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: ${props => props.isError ? "inset 0 0 0 1px #FF7A7A" : "none"};
  border: ${props => props.isError ? "1px solid #FF7A7A" : "1px solid #E3E6E8"};
  height: 200px;
  ::placeholder {
    color: #98A4AE;
  }
  :active, :focus {
    box-shadow: ${props => props.isError ? "inset 0 0 0 1px #FF7A7A" : "inset 0 0 0 1px #425563"};
    border: ${props => props.isError ? "1px solid #FF7A7A" : "1px solid #425563"};
    outline: none
  }
  @media (max-width: 650px) {
    width: 340px;
  }
  font-family: "SUIT";
  margin-bottom: 36px;
  color: #425563;
  transition: all 0.2s ease;
`

const Main = () => {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [info, setInfo] = useState([]);

  const [openScore, setOpenScore] = useState(false);

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
    console.log(scores)
    setName(Cookies.get("adminName"))
    const fetchData = async () => {
      const db = firestore;
      const snapshot = await db.collection("joiner").orderBy("id", "asc").get();
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
  }, [info]);

  let sumScore = 0
  let scoreLog = []
  const [Memo, setMemo] = useState("")

  const submitData = () => {
    const db = firestore;
    const Ref = db.collection("score")
    console.log(scores)

    for (let i = 0; i < 10; i ++) {
      sumScore += (scores[i].score - 1)
      scoreLog[i] = {[title[i].title]: (scores[i].score - 1)}
    }

    const handleUpload = async () => {
      try {
        await upload()
        alert("채점이 완료되었습니다!")
        window.location.href = "/"
      }
      catch (error) {
        console.log(error)
      }
    };
    
    const upload = async () => {
      console.log(scoreLog, sumScore, Memo)
      await Ref.doc(info[selected].data.num + " " + info[selected].data.name).update({
        [name]: { scoreLog, sumScore, Memo }
      })
    }

    handleUpload()
  }

  const moveScoreing = (keys) => {
    setOpenScore(true)
    setScores(title.map(item => ({ id: item.id, score: 1, selected: 0 })))
  }

  const [selectedUnit, setSelectedUnit] = useState(true)
  const [name, setName] = useState("면접관")

  const title = [
    { id: 1, title: "채점기준 1. 포트폴리오 제출 여부 (10점)", score: 0 },
    { id: 2, title: "채점기준 2. 자기소개 및 입장 태도 (10점)", score: 0},
    { id: 3, title: "채점기준 3. 포트폴리오의 퀄리티 평가 (10점)", score: 0 },
    { id: 4, title: "채점기준 4. 협업시 트러블 해결 (10점)", score: 0 },
    { id: 5, title: "채점기준 5. 분야 관심도 (10점)", score: 0 },
    { id: 6, title: "채점기준 6. 동아리 관심도 및 지원동기 (10점)", score: 0 },
    { id: 7, title: "채점기준 7. 동아리 관심도 및 탐색 경험 (10점)", score: 0 },
    { id: 8, title: "채점기준 8. 전공 경험 (10점)", score: 0 },
    { id: 9, title: "채점기준 9. 문제 해결력 (10점)", score: 0 },
    { id: 10, title: "채점기준 10. 면접 태도 및 자세 (10점)", score: 0 }
  ]

  const desc = [
    { id: 1, desc: "없음, 제출한 경우 만점" },
    { id: 2, desc: "자신을 잘 드러낼 수 있는 자기소개 부탁드립니다." },
    { id: 3, desc: "제출한 포트폴리오에 관해 간략하게 설명 부탁드립니다." },
    { id: 4, desc: `해커톤은 잠을 자지 않고 24시간동안 기획, 디자인, 개발을 모두 진행하는 개발대회입니다.
                    결과물 제출 전까지 5시간이 남았는데 팀원들 사이 불화가 일어나고 개발 진척도도 매우 낮은 상황입니다.
                    이 위기를 어떻게 극복하실건가요?` },
    { id: 5, desc: `본인이 사용했던 모바일 서비스 중 불편한 점이 있다면 그 이유와 개선 방안을 설명해주세요.
                    또는 만들고 싶었던 앱이 있다면 그 앱의 기능과 필요성을 설명해주세요.` },
    { id: 6, desc: "여러 동아리 중 우리 동아리를 선택한 이유가 있나요?" },
    { id: 7, desc: `저희 동아리 캐치프라이즈는 'We are Creators' 입니다.
                    이 문장에 어떤 의미가 담겨있다고 생각하시나요?` },
    { id: 8, desc: "본인이 전공 관련해서 지금까지 한 활동들을 최대한 자랑해주세요." },
    { id: 9, desc: `지금부터 문제를 2개 보여드릴텐데요, 원하는 문제를 하나 고르시고
                    이 문제의 접근법이나 간단한 풀이법을 적어주세요. 필요시 화이트보드를 사용하셔도 되고,
                    문제를 해결할 필요는 없습니다. 어려운 문제에 어떻게 접근하는지 보여주시면 됩니다.`},
    { id: 10, desc: "마지막으로 어필하고 싶은 거 있으시면 자유롭게 이야기해주세요." },
  ]

  const designerDesc = [
    { id: 1, desc: "없음, 제출한 경우 만점" },
    { id: 2, desc: "자신을 잘 드러낼 수 있는 자기소개 부탁드립니다." },
    { id: 3, desc: "제출한 포트폴리오에 관해 간략하게 설명 부탁드립니다." },
    { id: 4, desc: `해커톤은 잠을 자지 않고 24시간동안 기획, 디자인, 개발을 모두 진행하는 개발대회입니다.
                    결과물 제출 전까지 5시간이 남았는데 팀원들 사이 불화가 일어나고 개발 진척도도 매우 낮은 상황입니다.
                    이 위기를 어떻게 극복하실건가요?` },
    { id: 5, desc: `본인이 사용했던 모바일 서비스 중 불편한 점이 있다면 그 이유와 개선 방안을 설명해주세요.
                    또는 만들고 싶었던 앱이 있다면 그 앱의 기능과 필요성을 설명해주세요.` },
    { id: 6, desc: "여러 동아리 중 우리 동아리를 선택한 이유가 있나요?" },
    { id: 7, desc: "기존에 UI/UX에 대해 얼마나 관심을 가졌고, 이에 대해 얼마나 알고 있나요?" },
    { id: 8, desc: "본인이 전공 관련해서 지금까지 한 활동들을 최대한 자랑해주세요." },
    { id: 9, desc: `다음 화면은 인스타그램의 DM 화면입니다.
                    이 화면에서 사용자들이 우측 상단의 통화 버튼을 실수로 누르는 경우가 잦은데,
                    이를 어떻게 해결할 수 있을지 화이트보드를 사용해 설명 부탁드립니다.`},
    { id: 10, desc: "마지막으로 어필하고 싶은 거 있으시면 자유롭게 이야기해주세요." },
  ]

  const [scores, setScores] = useState(title.map(item => ({ id: item.id, score: 1, selected: 0 })));

  return (
    <Parent>
      {!openScore && <>
        <Child>
          <Title>
            실시간 지원자 {info.length}명
          </Title>
          <TitleDesc>
            개발자: {info.length - 11}명 / 디자이너: 11명
          </TitleDesc>
          <TitleDesc>
            올해 EDCAN에 지원한 학생 목록입니다. <br/>
            면접관들은 학생들의 지원서를 꼼꼼히 읽어주세요. <br/>
            각 탭을 누르면 상세 정보를 열람할 수 있습니다.
          </TitleDesc>
          <SelectUnit>
            <Units active={selectedUnit} onClick={() => {setSelectedUnit(true); setSelected(0)}}>
              ATELIER
            </Units>
            <Units active={!selectedUnit} onClick={() => {setSelectedUnit(false); setSelected(6)}}>
              PIXEL
            </Units>
          </SelectUnit>
          <Desc>
            {
              info.map(i => (
                ((i.data.unit === "ATELIER" && selectedUnit) || (i.data.unit === "PIXEL" && !selectedUnit)) &&
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
                    {i.data.name} {i.data.unit === "ATELIER" ? "(개발자)" : "(디자이너)"}
                  </BoxName>
                </InfoBox>
              ))
            }
          </Desc>
        </Child>
        <RightParent>
          <Right>
            <BoxTop2>
              <Row>
                <BoxNum>
                  {info[selected] && info[selected].data.num}
                </BoxNum>
                <BoxName>
                  {info[selected] && info[selected].data.name} {info[selected] && (info[selected].data.unit === "ATELIER" ? "(개발자)" : "(디자이너)")}
                </BoxName>
              </Row>
            </BoxTop2>
            <BoxTop><BoxBig>자기소개</BoxBig></BoxTop>
            <BoxTop><BoxSmall>{info[selected] && info[selected].data.question1}</BoxSmall></BoxTop>
            <BoxTop><BoxBig>지원동기</BoxBig></BoxTop>
            <BoxTop><BoxSmall>{info[selected] && info[selected].data.question2}</BoxSmall></BoxTop>
            {
              info[selected] && info[selected].data.question3 &&
              <>
                <BoxTop><BoxBig>관심있던 디자인 분야</BoxBig></BoxTop>
                <BoxTop><BoxSmall>{info[selected] && info[selected].data.question3}</BoxSmall></BoxTop>
                <BoxTop><BoxBig>'We are Creators'</BoxBig></BoxTop>
                <BoxTop><BoxSmall>{info[selected] && info[selected].data.question4}</BoxSmall></BoxTop>
              </>
            }
          </Right>
          <GotoParent>
            <Goto len={true} onClick={() => moveScoreing()}>
                지원자 채점하러 가기
            </Goto>
            <Goto
              color={((info[selected] && info[selected].data.isPortFolio) === "YES") ? true : false}
              onClick={() => {
                if ((info[selected] && info[selected].data.isPortFolio) === "YES") {
                  getPDF()
                }
              }}
            >
              {((info[selected] && info[selected].data.isPortFolio) === "YES") ? "포트폴리오 다운받기" : "포트폴리오 미제출"}
            </Goto>
          </GotoParent>
        </RightParent>
      </>
      }
      {openScore && <>
        <ScoreParent>
          <OnBack onClick={() => setOpenScore(false)}>
            뒤로 가기
          </OnBack>
          <ScoreTitle>
            {info[selected] && info[selected].data.num} {info[selected] && info[selected].data.name}
            {info[selected] && (info[selected].data.unit === "ATELIER" ? "(개발자)" : "(디자이너)")}
          </ScoreTitle>
          <ScoreTxt>
            {name}님의 대시보드입니다. 공정하게 채점해주시길 바랍니다. 
          </ScoreTxt>
          <Border placeholder="지원자에 대한 메모를 남겨주세요" value={Memo} onChange={(e) => setMemo(e.target.value)}/>
          <ScoreBody>          
            {
              title.map(item => (
                <ScoreWrap key={item.id}>
                  <ScoreBodyTitle>
                    {item.title}
                  </ScoreBodyTitle>
                  <ScoreBodyInfo>
                    질문: {info[selected].data.unit === "ATELIER" ? desc[item.id - 1].desc : designerDesc[item.id - 1].desc}
                  </ScoreBodyInfo>
                  <ScoreRadioParent>
                    {
                      Array.from({ length: 11 }, (_, index) => (
                        <ScoreRadio
                          key={index}
                          active={scores.find(score => score.id === item.id)?.score === index + 1}
                          onClick={() => setScores(prevScores => {
                            const updatedScores = [...prevScores];
                            const targetIndex = updatedScores.findIndex(score => score.id === item.id);
                            updatedScores[targetIndex].score = index + 1;
                            return updatedScores;
                          })}
                        >
                          {index}
                        </ScoreRadio>
                      ))
                    }
                  </ScoreRadioParent>
                  <ScoreDescs>
                    <Childs>성의 없음</Childs>
                    <Childs>잘함</Childs>
                    <Childs ts={true}>완벽</Childs>
                  </ScoreDescs>
                </ScoreWrap>
              ))
            }
          </ScoreBody>
          <Btn onClick={() => submitData()}>
            채점 확정하기
            <Img/>
          </Btn>
        </ScoreParent>
      </>
      }

    </Parent>
  );
}

export default Main;