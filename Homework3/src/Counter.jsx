import { useState } from "react";

// كومبونينت العداد
const Counter = ({ value }) => {
  return <h2>العداد: {value}</h2>;
};

// كومبونينت الزر
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [counter, setCounter] = useState(0);

  // زيادة
  const increaseByOne = () => {
    setCounter(counter + 1);
  };

  // نقصان
  const decreaseByOne = () => {
    setCounter(counter - 1);
  };

  // تصفير
  const setToZero = () => {
    setCounter(0);
  };

  return (
    <div>
      <h1>تطبيق العداد</h1>

      <Counter value={counter} />

      <Button onClick={increaseByOne} text="زيادة +1" />

      <Button onClick={decreaseByOne} text="نقصان -1" />

      <Button onClick={setToZero} text="تصفير" />

      <p>
        {counter > 0
          ? "العداد موجب"
          : counter < 0
          ? "العداد سالب"
          : "العداد يساوي صفر"}
      </p>
    </div>
  );
};

export default App;