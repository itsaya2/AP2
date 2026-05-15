import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  return (
    <div>
      <h1>أعطنا رأيك</h1>

      <button onClick={() => setGood(good + 1)}> جيد</button>
      <button onClick={() => setNeutral(neutral + 1)}> عادي</button>
      <button onClick={() => setBad(bad + 1)}> سيء</button>

      <h2>الإحصائيات</h2>

      {total === 0 ? (
        <p>لا يوجد تقييمات بعد</p>
      ) : (
        <>
          <p>جيد: {good}</p>
          <p>عادي: {neutral}</p>
          <p>سيء: {bad}</p>

          <hr />

          <p>المجموع: {total}</p>
        </>
      )}
    </div>
  );
};

export default App;