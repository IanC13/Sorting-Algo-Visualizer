import BarVisualizer from './BarVisualizer/BarVisualizer';
import CellVisualizer from './CellVisualizer/CellVisualizer';

function AppBody(props) {

  if (props.viewState === 'cell') {
    return (
      <div>
        <CellVisualizer />
      </div>
    )
  } else {
    return (
      <div>
        <BarVisualizer />
      </div>
    )
  }
}

export default AppBody;