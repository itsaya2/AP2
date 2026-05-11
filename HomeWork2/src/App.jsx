import { Header } from "./Header"
import Content from "./Content"
import Total from "./Total"

const App = () => {
  const course = 'تطوير تطبيقات Half Stack'
  const part1 = 'أساسيات React'
  const exercises1 = 10
  const part2 = 'استخدام props لتمرير البيانات'
  const exercises2 = 7
  const part3 = 'حالة المكوّن'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  )
}

export default App