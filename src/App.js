import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Pokelist from './components/Pokelist';
import Pokestat from './components/Pokestat';

function App() {
  return (
    <Router>
      <Routes>
            <Route exact path="/" element={<Pokelist/>}/>
            <Route exact path="/pokemon/:num" element={<Pokestat/>}/>
            
            <Route path="*" element={<Navigate to="/" /> } />
      </Routes>
    </Router>
  );
}

export default App;
