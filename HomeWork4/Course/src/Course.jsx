import React from "react";

const Course = ({ course }) => {
    const total = course.parts.reduce(
        (sum, part) => sum + part.exercises,
        0
    );

    return (
        <div className="course-card">
            <h2>{course.name}</h2>

            <div className="parts-list">
                {course.parts.map((part) => (
                    <p key={part.id}>
                        <span>{part.name}</span>
                        <span>{part.exercises} تمارين</span>
                    </p>
                ))}
            </div>

            <strong>
                إجمالي التمارين: {total}
            </strong>
        </div>
    );
};

export default Course;