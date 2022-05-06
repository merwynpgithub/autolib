import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Books from './components/pages/Books';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Footer />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/books" element={<Books />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
