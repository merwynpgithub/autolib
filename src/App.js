import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Footer />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
