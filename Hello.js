import React, { useState, memo, useMemo, useCallback } from 'react'
import './css/app.css'

function Child1(props) {
  console.log(props)
  const { num, handleClick } = props
  return (
    <div
      onClick={() => {
        handleClick(num + 1)
      }}
    >
      child
    </div>
  )
}

function Child2(props) {
  console.log(props)
  const { text, handleClick } = props

  return (
    <div>
      child2
      <Grandson text={text} handleClick={handleClick} />
    </div>
  )
}

function Grandson(props) {
  console.log(props)

  const { text, handleClick } = props
  return (
    <div
      onClick={() => {
        handleClick(text + 1)
      }}
    >
      Grandson
    </div>
  )
}

function Counter2() {
  const [number, setNumber] = useState(0)

  function alertNumber() {
    setTimeout(() => {
      setNumber((number) => {
        alert(number + 1)
      })
    }, 3000)
  }

  return (
    <>
      <p>{number}</p>
      <button
        onClick={() => {
          setNumber(number + 1)
        }}
      >
        +
      </button>
      <button onClick={alertNumber}>alertNumber</button>
    </>
  )
}

function Counter5(props) {
  console.log(`conter5 render`)

  function getinitstate() {
    return { number: (props.number * 10) / 4324 + 321 }
  }
  const [counter, setCounter] = useState(getinitstate)

  return (
    <div>
      <p>{counter.number}</p>

      <button
        onClick={() => {
          setCounter({ number: counter.number + 1 })
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCounter(counter)
        }}
      >
        setCounter
      </button>
    </div>
  )
}

function SubCounter6({ onClick, data }) {
  console.log(`subcounter6 render`)
  return <button onClick={onClick}>{data.number}</button>
}

SubCounter6 = memo(SubCounter6)
let oldData, oldAddClick
function Counter6() {
  console.log('counter6')

  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(0)
  const data = useMemo(() => ({ number }), number)
  console.log(`data===oldData`, data === oldData)
  const addClick = () => setNumber(number + 1)
  oldData = data
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SubCounter6 data={data} onClick={addClick} />
    </div>
  )
}

function Parent() {
  const [num, setNum] = useState(0)
  const [text, setText] = useState(1)

  return (
    <div>
      <Counter6 />
      {/* <Counter5 number={0} /> */}
      {/* <Counter2 /> */}
      <Child1 num={num} handleClick={setNum} />
      <Child2 text={text} handleClick={setText} />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Parent />
      </header>
    </div>
  )
}

export default App
