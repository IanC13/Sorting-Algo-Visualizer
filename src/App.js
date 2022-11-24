import './App.css';
import BarVisualizer from './BarVisualizer/BarVisualizer';

import logo from "./logos/GitHub-Mark-Light-120px-plus.png";


function App() {
  return (
    <div className="App">
      <div className="App-body">
        <h1>Sorting Algorithms Visualizer</h1>
        <BarVisualizer />
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
