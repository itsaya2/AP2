import React from "react";
import Course from "./Course";
import "./App.css";
import "./index.css";

const App = () => {
  const courses = [
    {
      name: "تطوير تطبيقات Half Stack",
      id: 1,
      parts: [
        { id: 1, name: "أساسيات React", exercises: 10 },
        { id: 2, name: "استخدام props لتمرير البيانات", exercises: 7 },
        { id: 3, name: "حالة المكوّن (State)", exercises: 14 },
        { id: 4, name: "تنقيح تطبيقات React", exercises: 11 },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        { id: 1, name: "Routing", exercises: 3 },
        { id: 2, name: "Middlewares", exercises: 7 },
      ],
    },
  ];

  return (
    <div className="app">
      <h1> منهاج الويب</h1>

      <div className="dashboard">
        {courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default App;