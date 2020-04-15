import React from 'react';
import ReactDOM from 'react-dom';

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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return(
    <div>
      <Course course={course} />      
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);