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

const ScoreInput = styled.input`
  display: flex;
  width: 70px;
  font-size: 15px;
  padding: 10px;
  height: 50px;
  border: 1px solid #E3E6E8;
  color: #425563;
  border-radius: 12px;
  font-family: 'SUIT';
  transition: all 0.2s ease;
  :active, :focus {
    outline: none;
  }
  ::placeholder {
    color: #98A4AE;
    font-family: 'SUIT';
  }
  :active, :focus {
    box-shadow: ${props => props.isError ? "inset 0 0 0 1px #FF7A7A" : "inset 0 0 0 1px #425563"};
    border: ${props => props.isError ? "1px solid #FF7A7A" : "1px solid #425563"};
    outline: none
  }
`

const Title = styled.div`
  color: #425563;
  font-weight: 600;
  font-size: 42px;
  margin-top: 200px;
  cursor: pointer;
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

const BackBtn = styled.div`
  margin-top: 160px;
  color: #98A4AE;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`

const BoardParent = styled.div`
  display: flex;
  margin-bottom: 100px;
  align-items: center;
  flex-direction: column;
`

const Infos = styled.div`
  color: #98A4AE;
  margin-bottom: 20px;
`

const BoardBorder = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background-color: #F7F8F9;
  color: #425563;
  border-radius: 18px;
  align-items: center;
  padding: 20px;
  margin-bottom: 12px;
  font-size: 16px;
  padding-right: 10px;
`

const BoardTitle = styled.div`
  color: #425563;
  font-size: 42px;
  margin-top: 50px;
  font-weight: 600;
`

const Gap = styled.div`
  display: flex;
  width: 160px;
  font-weight: 500;
`

const BorderScores = styled.div`
  margin-left: 4px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.gap ? "120px" : "70px"};
  font-weight: ${props => props.gap ? "600" : "400"};
  height: 46px;
  border-radius: 10px;
  background-color: #E8EBEE;
`

const Id = styled.div`
  color: #00A9CE;
  font-size: 17px;
  font-weight: 500;
  text-align: left;
  margin-right: 2px;
  text-align: right;
  width: 36px;
  margin-right: 8px;
`

const BoardContent = styled.div`
  margin-top: 60px;
  display: flex;
  width: 950px;
  height: auto;
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
  margin-left: 4px;
  margin-right: 4px;
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
  width: 650px;
  font-size: 18px;
  text-align: left;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
`

const HeWantsSpaceBetWeen = styled.div`
  display: flex;
  align-items: center;
`

const BoardCheck = styled.div`
  margin-top: 30px;
  width: 170px;
  height: 44px;
  border: 1px solid #425563;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? "white" : "425563"};
  background-color: ${props => props.active ? "#425563" : "white"};
  display: flex;
  border-radius: 24px;
  font-size: 15px;
  cursor: pointer;
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
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
const ScoreRadioParent = styled.div`
  width: 80px;
  align-items: center;
  display: flex;
  justify-content: flex-end;
`

const Border = styled.textarea`
  margin-top: 46px;
  border-radius: 12px;
  resize: none;
  font-size: 15px;
  width: 650px; 
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
  let sumScore = 0
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [info, setInfo] = useState([]);

  const [openBoard, setOpenBoard] = useState(false);
  const [alignRight, setAlignRight] = useState(false)

  const [Memo, setMemo] = useState("")
  const [name, setName] = useState("면접관")
  const [selectedUnit, setSelectedUnit] = useState(0)

  const [openScore, setOpenScore] = useState(false);
  const [reload, setReload] = useState(true);
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [rankData, setRankData] = useState([])
  const [resultData, setResultData] = useState([])

  const fileRef = ref(storage,
    `portFolio/${info[selected]?.data.num} ${info[selected]?.data.name} (ATELIER).pdf`);

  useEffect(() => {
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
    if (openBoard && reload) {
      const fetchData = async () => {
        const db = firestore;
        const snapshot = await db.collection("atelierScore").get();
        const newData = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          name: doc.data().name,
          data: doc.data()
        }));
  
        const rankData = newData.map(item => {
          const sumScoreArr = Object.values(item.data).filter(val => typeof val === "object" && "sumScore" in val).map(val => val.sumScore);
          return {
            name: item.name,
            sumScore: sumScoreArr
          };
        })
          .filter(item => item.sumScore.length > 0)
          .sort((a, b) => {
            const aSum = a.sumScore.reduce((acc, val) => acc + val, 0) / a.sumScore.length;
            const bSum = b.sumScore.reduce((acc, val) => acc + val, 0) / b.sumScore.length;;
            return bSum - aSum;
          });
        
        console.log(rankData)
        setRankData(rankData);
      };
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openBoard]);

  useEffect(() => {
    if (info.length > 0) {
      const firstDocData = info[0].data;
      setData(firstDocData);
    }
  }, [info]);

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

  const submitData = () => {
    const sum = scores.reduce((acc, cur) => acc + cur, 0);
    console.log(sum - selected - 1)

    const db = firestore;
    const Ref = db.collection("atelierScore")

    for (let i = 0; i < 8; i ++) {
      sumScore += scores[i]
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
      const docRef = Ref.doc(`${selected + 1}`);
      const doc = await docRef.get();

      scores.splice(8, 1)
      const nums = selected + 1
    
      if (doc.exists) {
        await docRef.update({
          name: `${info[selected]?.data.num} ${info[selected]?.data.name}`,
          [name]: { scores, sumScore, Memo, nums }
        }); 
      }
      else {
        await docRef.set({
          name: `${info[selected]?.data.num} ${info[selected]?.data.name}`,
          [name]: { scores, sumScore, Memo, nums }
        });
      }
    }

    handleUpload()
  }

  const moveScoreing = (keys) => {
    setScores([0, 0, 0, 0, 0, 0, 0, 0, selected + 1])
    setOpenScore(true)
    window.scrollTo(0, 0);
    console.log(scores)
  }

  const title = [
    { id: 1, title: "태도: 포트폴리오 제출 (20점)", score: 0, maxScore: 20 },
    { id: 2, title: "태도: 면접 태도 (20점)", score: 0, maxScore: 20 },
    { id: 3, title: "관심: 동아리 관심도 (10점)", score: 0, maxScore: 10 },
    { id: 4, title: "관심: 지금까지의 전공 경험 (10점)", score: 0, maxScore: 10 },
    { id: 5, title: "인성: 협업 과정 (10점)", score: 0, maxScore: 10 },
    { id: 6, title: "인성: 동아리 지원동기 (10점)", score: 0, maxScore: 10 },
    { id: 7, title: "실력: 분야 적합성 (10점)", score: 0, maxScore: 10 },
    { id: 8, title: "실력: 코딩 실력 (10점)", score: 0, maxScore: 10 },
  ]

  const desc = [
    { id: 1, desc: "포트폴리오를 제출하셨는데 몇가지 질문을 드리겠습니다." },
    { id: 2, desc: "본인을 잘 드러낼 수 있는 자기소개를 30초 이내로 해주세요.<br/>마지막으로 저희에게 어필하고 싶은 게 있으시면 최대한 많이 어필해주세요."  },
    { id: 3, desc: "‘We are Creators' 라는 문장에 어떤 의미가 담겨있다고 생각하시나요? " },
    { id: 4, desc: "본인이 전공 관련해서 지금까지 해왔던 활동들을 최대한 많이 자랑해주세요. <br/>본인이 관심있게 해왔던 전공에 대해 설명해주세요." },
    { id: 5, desc: "어떤 방식으로든 협업을 해본적이 있나요? 있다면 그 경험을 말해주세요.<br/>협업 과정에서 가장 중요하게 생각하는 것에 대해 설명해주세요." },
    { id: 6, desc: "우리 동아리를 지원한 이유가 무엇인가요? <br/>우리 동아리에서 배우고 싶은 것, 하고 싶은 것이 있나요?" },
    { id: 7, desc: "본인이 사용했던 모바일 서비스가 불편한 적이 있었나요? 그 이유를 말해주세요.<br/>그렇다면 그 불편한 점을 해결하기위한 개선 방안을 설명해주세요.<br/>본인이 만들고 싶었던 앱이 있다면 그 앱의 기능과, 필요성을 설명해주세요." },
    { id: 8, desc: "이제 문제를 드릴건데요, 화면을 보고 문제에 답해주세요."  },
  ]

  // const designerDesc = [
  //   { id: 1, desc: "없음, 제출한 경우 만점" },
  //   { id: 2, desc: "자신을 잘 드러낼 수 있는 자기소개 부탁드립니다." },
  //   { id: 3, desc: "제출한 포트폴리오에 관해 간략하게 설명 부탁드립니다." },
  //   { id: 4, desc: `해커톤은 잠을 자지 않고 24시간동안 기획, 디자인, 개발을 모두 진행하는 개발대회입니다.
  //                   결과물 제출 전까지 5시간이 남았는데 팀원들 사이 불화가 일어나고 개발 진척도도 매우 낮은 상황입니다.
  //                   이 위기를 어떻게 극복하실건가요?` },
  //   { id: 5, desc: `본인이 사용했던 모바일 서비스 중 불편한 점이 있다면 그 이유와 개선 방안을 설명해주세요.
  //                   또는 만들고 싶었던 앱이 있다면 그 앱의 기능과 필요성을 설명해주세요.` },
  //   { id: 6, desc: "여러 동아리 중 우리 동아리를 선택한 이유가 있나요?" },
  //   { id: 7, desc: "기존에 UI/UX에 대해 얼마나 관심을 가졌고, 이에 대해 얼마나 알고 있나요?" },
  //   { id: 8, desc: "본인이 전공 관련해서 지금까지 한 활동들을 최대한 자랑해주세요." },
  //   { id: 9, desc: `다음 화면은 인스타그램의 DM 화면입니다.
  //                   이 화면에서 사용자들이 우측 상단의 통화 버튼을 실수로 누르는 경우가 잦은데,
  //                   이를 어떻게 해결할 수 있을지 화이트보드를 사용해 설명 부탁드립니다.`},
  //   { id: 10, desc: "마지막으로 어필하고 싶은 거 있으시면 자유롭게 이야기해주세요." },
  // ]

  return (
    <Parent>
      {!openBoard &&
        <>
          {!openScore && <>
            <Child>
              <Title onClick={() => setOpenBoard(true)}>
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
                <Units active={selectedUnit === 0} onClick={() => {setSelectedUnit(0); setSelected(0)}}>
                  개발자 1실
                </Units>
                <Units active={selectedUnit === 1} onClick={() => {setSelectedUnit(1); setSelected(1)}}>
                  개발자 2실
                </Units>
                <Units active={selectedUnit === 2} onClick={() => {setSelectedUnit(2); setSelected(6)}}>
                  디자이너
                </Units>
              </SelectUnit>
              <Desc>
                {
                  info.filter(i => {
                    if (selectedUnit === 0){
                      return i.data.unit === "ATELIER" && i.data.type === "1";
                    }
                    else if (selectedUnit === 1){
                      return i.data.unit === "ATELIER" && i.data.type === "2";
                    }
                    else if (selectedUnit === 2){
                      return i.data.unit === "PIXEL";
                    }
                    else {
                      return false;
                    }
                  }).map(i => (
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
                <Goto len={true} color={true} onClick={() => moveScoreing()}>
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
                      <Wrap>
                        <ScoreBodyTitle>
                          {item.title}
                        </ScoreBodyTitle>
                        <ScoreBodyInfo>
                          <span dangerouslySetInnerHTML={{__html: desc[item.id - 1].desc}} />
                        </ScoreBodyInfo>
                      </Wrap>
                      <ScoreRadioParent>
                        <ScoreInput
                          type="text"
                          maxLength="2"
                          onChange={(event) => {
                            if (event.target.value > item.maxScore) {
                              event.target.value = item.maxScore
                            }
                            const newScores = [...scores];
                            newScores[item.id - 1] = parseInt(event.target.value) || 0;
                            setScores(newScores);
                          }}
                          placeholder={item.maxScore === 10 ? "10" : "20"}
                        />
                      </ScoreRadioParent>
                    </ScoreWrap>
                  ))
                }
              </ScoreBody>
              <Infos>
                총점은 {scores.reduce((acc, cur) => acc + cur, 0) - selected - 1}점 입니다.
              </Infos>
              <Btn onClick={() => submitData()}>
                채점 확정하기
                <Img/>
              </Btn>
            </ScoreParent>
          </>
          }
        </>
      }
      {openBoard &&
        <BoardParent>
          <BackBtn onClick={() => setOpenBoard(false)}>
            뒤로 가기
          </BackBtn>
          <BoardTitle>
            ATELIER 면접 대시보드
          </BoardTitle>
          <BoardCheck onClick={() => {
            if (alignRight) {
              setAlignRight(false)
            }
            else {
              setAlignRight(true)
            }
          }}
          active={alignRight}
          >
            {!alignRight ? "평균 점수 왼쪽으로" : "평균 점수 오른쪽으로"}
          </BoardCheck>
          <BoardContent>
            {
              rankData.map((item, i) => (
                <BoardBorder>
                  <HeWantsSpaceBetWeen>
                    <Gap>
                      <Id>
                        {i + 1}등
                      </Id>
                      {item.name}
                    </Gap>
                    {alignRight &&
                      <BorderScores gap={true}>
                        평균 {(item.sumScore.reduce((acc, cur) => acc + cur, 0) / item.sumScore.length).toFixed(2)}점
                      </BorderScores>
                    }
                    {
                      item.sumScore.map((item2, i) => (
                        <BorderScores>
                          {item2}점
                        </BorderScores>
                      ))
                    }
                  </HeWantsSpaceBetWeen>
                  {!alignRight &&
                      <BorderScores gap={true}>
                        평균 {(item.sumScore.reduce((acc, cur) => acc + cur, 0) / item.sumScore.length).toFixed(2)}점
                      </BorderScores>
                  }
                </BoardBorder>
              ))
            }
          </BoardContent>
        </BoardParent>
      }

    </Parent>
  );
}

export default Main;