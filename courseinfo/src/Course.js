import React from 'react'

const Course = ({course}) => {
  return(
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
  )
}

const Header = ({course}) => {
  return(
    <>
      <h1>{course}</h1>
    </>
  )
}

const Part = ({parts}) => {
  return(
    <p>{parts.name} {parts.exercises}</p>
  )
}

const Content = ({...parts}) => {
  return(
    <>
      {
        parts.parts.map((el) => {
          return <Part key={el.id} parts={el} />
        })
      }
    </>
  )
}

const Total = ({...parts}) => {
  const data = parts.parts;
  let total = data.reduce((sum, el) => {
    return sum + el.exercises
  }, 0);

  return(
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

export default Course;