import './App.css';
import Header from './components/Header';
import NotesListPages from './pages/NotesListPages';
import NotePage from './pages/NotePage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className='app'>
        <Header/>
        <Routes>
          <Route path='/' element={<NotesListPages/>} />
          <Route path='/note/:id' element={<NotePage />} />
        </Routes>
        </div>
      
      </div>
    </Router>
    
  );
}

export default App;
