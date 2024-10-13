import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='headerApp'>
        <Header />
      </div>
      <div className='contentApp'>
        <div className='mainContent'>
          <Outlet />
        </div>
        <div className='sideBar'>

        </div>
      </div>

    </div>
  );
}

export default App;
