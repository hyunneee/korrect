import { useState } from "react";
import TabSelector from "../components/TabSelector";
import Header from "../components/Header";
import TextBox from "../components/Textbox";
import ButtonGroup from "../components/Buttongroup";
import Spinner from '../components/spinner'; 
import './home.css';


function Home() {
  const [tab, setTab] = useState("일상용");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);         // ⏳ 로딩 시작
    setResult(input);            // 결과 초기화

    setTimeout(() => {
      setResult(input);       // 💡 실제론 여기에 API 응답 넣기
      setLoading(false);      // ✅ 로딩 끝
    }, 2000); // 임시 2초 지연 (나중엔 axios 호출)
  };  


  const handleReset = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="p-4">
      <Header selectedTab={tab} onTabChange={setTab} />

      <div className='title-wrapper'>
        <h2 className="page-title">맞춤법 검사기</h2>
        <TabSelector selectedTab={tab} onTabChange={setTab} />
      </div>
      
      <div className="textbox-wrapper">
        <TextBox
          title="원문"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClear={() => setInput("")}
        />
        {/* <TextBox
          title="교정 결과"
          value={loading ? "" : result}
          readOnly={true}
        >
          {loading && <Spinner />}
        </TextBox> */}
        <TextBox
          title="교정 결과"
          value={result}
          readOnly={true}
        >
          {loading && (
            <div className="loading-ui">
              <Spinner />
              <div className="loading-text">맞춤법 검사를 진행 중입니다.</div>
            </div>
          )}
        </TextBox>
      </div>
      <ButtonGroup onReset={handleReset} onSubmit={handleCheck} />
    </div>
  );
}

export default Home;

