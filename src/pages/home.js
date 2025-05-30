import { useState } from "react";
// 만약 axios를 쓴다면 아래 줄 추가
// import axios from "axios";

function Home() {
  const [tab, setTab] = useState("일상용");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ▶️ 1) fetch 사용 예
  const handleCheck = async () => {
    if (!input.trim()) return;             // 빈 문자열 검사
    setLoading(true);
    setResult("");                         // 이전 결과 초기화

    try {
      const response = await fetch(
        "https://korrect-back.onrender.com/api/correct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sentence: input }),
        }
      );
      const data = await response.json();
      setResult(data.corrected);           // 백엔드에서 온 교정 문장
    } catch (err) {
      setResult("❌ 오류 발생: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /* 
  // ▶️ 2) axios 사용 예
  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const { data } = await axios.post(
        "https://korrect-back.onrender.com/api/correct",
        { sentence: input },
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(data.corrected);
    } catch (err) {
      setResult("❌ 오류 발생: " + err.toString());
    } finally {
      setLoading(false);
    }
  };
  */

  const handleReset = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="p-4">
      {/* …생략… */}
      <div className="textbox-wrapper">
        <TextBox
          title="원문"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClear={() => setInput("")}
        />
        <TextBox title="교정 결과" value={result} readOnly>
          {loading && (
            <div className="loading-ui">
              <Spinner />
              <div className="loading-text">맞춤법 검사를 진행 중이에요.</div>
            </div>
          )}
        </TextBox>
      </div>
      <ButtonGroup onReset={handleReset} onSubmit={handleCheck} />
    </div>
  );
}

export default Home;
