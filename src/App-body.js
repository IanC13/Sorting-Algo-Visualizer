import BarVisualizer from './BarVisualizer/BarVisualizer';

function AppBody(props) {

  if (props.viewState === 'cell') {
    return (
      <div>
        Here
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