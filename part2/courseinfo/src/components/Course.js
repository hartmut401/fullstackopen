const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
  )
}
  
const Header = ({ course }) => {
  return (
    <h2>
      {course}
    </h2>
  )
}
  
const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </>
  )
}
  
const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}
  
const Sum = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0 )
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}

export default Course