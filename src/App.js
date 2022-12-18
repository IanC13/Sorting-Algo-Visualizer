import React, {useState} from 'react';
import './App.css';
import AppBody from './App-body';
import ToggleButton from './ReusableComponents/ToggleButton';

import logo from "./logos/GitHub-Mark-Light-120px-plus.png";


function App() {

  // View State
  const [viewState, setViewState] = useState('cell');

  function handleViewStateChange() {
    setViewState(viewState === 'cell' ? 'bar' : 'cell');
  }

  return (
    <div className="App">
      <div className="App-body">
        <div className='header'>
          <h1>Sorting Algorithms Visualizer</h1>
        </div>

        <div className='view-button'>
          <p id='view-state-display'>{viewState.toUpperCase()}</p>
          <ToggleButton 
            onViewStateChange={handleViewStateChange}
          />
        </div>

        <div>
          <div className='display-body'>
            <AppBody viewState={viewState} />
          </div>
        </div>
      </div>
        <footer>
          <a  className='github-link'
              href="https://github.com/IanC13/Sorting-Algo-Visualizer">
        
            <img src={logo} alt="icon" className='github-logo'/>
            <p className='footer-text'>Repository</p>
          </a>
      </footer>
    </div>
  );
}

export default App;