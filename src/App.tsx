import React from 'react';
import './App.css';
import '../node_modules/codemirror/lib/codemirror.css';
import '../node_modules/codemirror/theme/mbo.css';
import '../node_modules/codemirror/mode/javascript/javascript.js';
import '../node_modules/codemirror/mode/vb/vb.js';
import Repl from './Repl';

function App() {
  return (
    <div className="App">
      <Repl
        optionsLeft={{ mode: 'text/x-vb' }}
        optionsRight={{ mode: 'javascript' }}
        compiler={(code: string) => code}
      />
    </div>
  );
}

export default App;
