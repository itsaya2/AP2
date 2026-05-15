import { useState } from "react";
import "./App.css";

export default function App() {
  /* ========== Counter ========== */
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);

  /* ========== Feedback ========== */
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;

  /* ========== Anecdotes ========== */
  const anecdotes = [
    "البرمجة حل مشاكل بطريقة إبداعية.",
    "أفضل كود هو الكود البسيط.",
    "الأخطاء جزء من التعلم.",
    "اكتب كود يفهمه البشر.",
    "التبسيط هو الاحتراف.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  );

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const maxVotes = Math.max(...votes);
  const mostVoted = votes.indexOf(maxVotes);

  /* ========== Todo ========== */
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, done: false },
    ]);

    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const completed = todos.filter((t) => t.done).length;

  return (
    <div>

      {/* ===== Header ===== */}
      <div className="header">
        💖 My React App 💖
      </div>

      <div className="container">

        {/* ========== Counter ========== */}
        <div className="card">
          <h2>🔢 العداد</h2>

          <h3>{counter}</h3>

          <input
            type="number"
            value={step}
            onChange={(e) =>
              setStep(Number(e.target.value) || 1)
            }
          />

          <br />

          <button onClick={() => setCounter(counter + step)}>
            + {step}
          </button>

          <button onClick={() => setCounter(counter - step)}>
            - {step}
          </button>

          <button onClick={() => setCounter(0)}>
            تصفير
          </button>
        </div>

        {/* ========== Feedback ========== */}
        <div className="card">
          <h2>💬 رأيك يهمنا</h2>

          <button onClick={() => setGood(good + 1)}>جيد</button>
          <button onClick={() => setNeutral(neutral + 1)}>عادي</button>
          <button onClick={() => setBad(bad + 1)}>سيء</button>

          <p>المجموع: {totalFeedback}</p>
        </div>

        {/* ========== Anecdotes ========== */}
        <div className="card">
          <h2>📚 حكم</h2>

          <p>"{anecdotes[selected]}"</p>

          <p>الأصوات: {votes[selected]}</p>

          <button onClick={handleVote}>تصويت</button>
          <button onClick={nextAnecdote}>حكمة أخرى</button>

          <h3>الأكثر تصويتًا</h3>

          {maxVotes > 0 ? (
            <p>
              "{anecdotes[mostVoted]}" ({maxVotes})
            </p>
          ) : (
            <p>لا يوجد تصويت بعد</p>
          )}
        </div>

        {/* ========== Todo ========== */}
        <div className="card">
          <h2>📝 قائمة المهام</h2>

          <input
            value={newTodo}
            onChange={(e) =>
              setNewTodo(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && addTodo()
            }
            placeholder="أضف مهمة..."
          />
{}
          <button onClick={addTodo}>إضافة</button>

          <p>
            المكتملة: {completed} / {todos.length}
          </p>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <span
                  className={todo.done ? "done" : ""}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
    
  );
}