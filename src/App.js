import { Outlet } from 'react-router-dom';

import './/App.css'
import useApplicationData from './hooks/useApplicationData';

function App(props) {
  const appData = useApplicationData();

  return (
    <div className="App">
      <Outlet context={appData}/>
    </div>    
  );
}

export default App;
