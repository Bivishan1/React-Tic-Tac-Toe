import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null)

  function handleClick() {
    setValue('X');
  }

  return (
    <>
      <button onClick={handleClick} className='square'>{value}</button>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <div className="board-row">
        <Square /><Square /><Square />
      </div>
      <div className="board-row">
        <Square /><Square /><Square />
      </div>
      <div className="board-row">
        <Square /><Square /><Square />
      </div>
    </div>
  );
}

export default App;
