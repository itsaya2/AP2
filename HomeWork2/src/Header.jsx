export const Header = (props) => {
  return <h1>{props.course}</h1>
}

export const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}