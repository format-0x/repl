import React from 'react';
import './App.css';
import CodeMirror from './CodeMirror';
import '../node_modules/codemirror/lib/codemirror.css';

function App() {
  return (
    <div className="App">
      <CodeMirror
        options={{}}
        value={''}
        onChange={() => {}}
      />
    </div>
  );
}

export default App;
